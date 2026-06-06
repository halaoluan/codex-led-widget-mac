const REFRESH_INTERVAL_MS = 60_000;

const els = {
  body: document.body,
  brandName: document.getElementById("brandName"),
  trafficLight: document.getElementById("trafficLight"),
  stateText: document.getElementById("stateText"),
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  collapsedRemaining: document.getElementById("collapsedRemaining"),
  remaining: document.getElementById("remaining"),
  liquidFill: document.getElementById("liquidFill"),
  primaryText: document.getElementById("primaryText"),
  secondaryText: document.getElementById("secondaryText"),
  planText: document.getElementById("planText"),
  refreshBtn: document.getElementById("refreshBtn"),
  minimizeBtn: document.getElementById("minimizeBtn"),
  closeBtn: document.getElementById("closeBtn"),
  pinBtn: document.getElementById("pinBtn"),
  langBtn: document.getElementById("langBtn"),
  sizeBtn: document.getElementById("sizeBtn")
};

let lastQuota = null;
let refreshTimer = null;
let countdownTimer = null;
let locale = localStorage.getItem("locale") || "zh";
let planDisplayOverride = "AUTO";
let lastError = null;

const copy = {
  zh: {
    loading: "读取中",
    available: "可用",
    low: "偏低",
    empty: "已用尽",
    error: "未连接",
    brand: "Codex 额度",
    left: "剩余",
    primary: "5小时窗口",
    secondary: "7天窗口",
    plan: "计划",
    refreshed: "已刷新",
    cached: "缓存",
    refreshing: "正在读取 Codex 额度...",
    failed: "无法读取额度，点此打开 Codex",
    pinned: "已固定到桌面",
    collapsed: "已折叠",
    expanded: "已展开",
    collapse: "折叠",
    expand: "展开",
    after: "后",
    now: "即将恢复",
    plus: "PLUS"
  },
  en: {
    loading: "Loading",
    available: "Green",
    low: "Low",
    empty: "Empty",
    error: "Offline",
    brand: "Codex Quota",
    left: "Left",
    primary: "5h window",
    secondary: "7d window",
    plan: "Plan",
    refreshed: "Updated",
    cached: "cache",
    refreshing: "Reading Codex quota...",
    failed: "Cannot read quota. Click to open Codex",
    pinned: "Pinned to desktop",
    collapsed: "Collapsed",
    expanded: "Expanded",
    collapse: "Collapse",
    expand: "Expand",
    after: "left",
    now: "reset soon",
    plus: "PLUS"
  }
};

function t(key) {
  return copy[locale][key] || copy.zh[key] || key;
}

function setLanguage(nextLocale) {
  locale = nextLocale;
  localStorage.setItem("locale", locale);
  els.langBtn.textContent = locale === "zh" ? "EN" : "中";
  els.brandName.textContent = t("brand");
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  render(lastQuota);
}

function renderWidgetSize(size) {
  const labels = { small: "小", medium: "中", large: "大" };
  els.sizeBtn.textContent = labels[size] || "小";
  els.sizeBtn.title = `组件大小：${labels[size] || "小"}`;
}

function renderPlanDisplay(value) {
  planDisplayOverride = value || "AUTO";
  render(lastQuota);
}

function renderCollapsed(value) {
  const collapsed = Boolean(value);
  els.body.dataset.collapsed = collapsed ? "true" : "false";
  els.minimizeBtn.title = collapsed ? t("expand") : t("collapse");
  els.minimizeBtn.setAttribute("aria-label", collapsed ? t("expand") : t("collapse"));
}

function quotaState(percent) {
  if (!Number.isFinite(percent)) return "loading";
  if (percent <= 0) return "empty";
  if (percent < 10) return "low";
  return "available";
}

function render(quota) {
  if (!quota) return;
  lastQuota = quota;
  lastError = null;

  const percent = Number(quota.remainingPercent);
  const state = quotaState(percent);
  const safePercent = Number.isFinite(percent) ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  els.body.dataset.state = state;
  els.trafficLight.className = `traffic-light ${state}`;
  els.statusDot.className = `status-dot ${state}`;
  els.stateText.textContent = state === "available" ? t("available") : state === "low" ? t("low") : state === "empty" ? t("empty") : t("loading");
  els.remaining.textContent = `${safePercent}%`;
  els.collapsedRemaining.textContent = `${safePercent}%`;
  document.getElementById("remainingLabel").textContent = t("left");
  document.getElementById("primaryLabel").textContent = t("primary");
  document.getElementById("secondaryLabel").textContent = t("secondary");
  document.getElementById("planLabel").textContent = t("plan");

  els.liquidFill.style.height = `${safePercent}%`;
  els.primaryText.textContent = formatWindow(quota.primary);
  els.secondaryText.textContent = formatWindow(quota.secondary);
  els.planText.textContent = formatPlan(quota.planType);
  const cacheLabel = quota.fromCache ? ` · ${t("cached")}` : "";
  els.statusText.textContent = `${t("refreshed")} ${formatClock(new Date(quota.fetchedAt || Date.now()))}${cacheLabel}`;
}

function renderError(error) {
  lastError = error;
  els.body.dataset.state = "error";
  els.trafficLight.className = "traffic-light error";
  els.statusDot.className = "status-dot error";
  els.stateText.textContent = t("error");
  els.statusText.textContent = localizedErrorMessage(error);
  els.statusText.title = error?.message || "";
  els.remaining.textContent = "--%";
  els.collapsedRemaining.textContent = "--%";
  els.primaryText.textContent = "--";
  els.secondaryText.textContent = "--";
  els.planText.textContent = "--";
}

function formatPlan(planType) {
  if (planDisplayOverride && planDisplayOverride !== "AUTO") return planDisplayOverride;

  const normalized = String(planType || "").trim();
  if (!normalized || normalized.toLowerCase() === "unknown") return "--";

  const label = normalized
    .replace(/^chatgpt[_-]?/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
  return label ? label.toUpperCase() : "--";
}

function localizedErrorMessage(error) {
  const message = error?.userMessage?.[locale] || error?.userMessage?.zh;
  return message || t("failed");
}

function formatWindow(window) {
  if (!window) return "--";
  const percent = Number.isFinite(window.remainingPercent) ? `${window.remainingPercent}%` : "--%";
  const reset = formatRemaining(window.resetsAt);
  return `${percent} · ${reset}`;
}

function formatRemaining(isoString) {
  if (!isoString) return "--";
  const diffMs = new Date(isoString).getTime() - Date.now();
  if (!Number.isFinite(diffMs) || diffMs <= 0) return t("now");

  const totalMinutes = Math.ceil(diffMs / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (locale === "en") {
    if (days > 0) return `${days}d ${hours}h ${t("after")}`;
    if (hours > 0) return `${hours}h ${minutes}m ${t("after")}`;
    return `${minutes}m ${t("after")}`;
  }

  if (days > 0) return `${days}天${hours}小时后`;
  if (hours > 0) return `${hours}小时${minutes}分钟后`;
  return `${minutes}分钟后`;
}

function formatClock(date) {
  return date.toLocaleTimeString(locale === "zh" ? "zh-CN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function refreshQuota(options = {}) {
  els.refreshBtn.classList.add("spinning");
  els.statusText.textContent = t("refreshing");
  try {
    const quota = await window.codexQuota.getQuota(options);
    render(quota);
  } catch (error) {
    renderError(error);
  } finally {
    els.refreshBtn.classList.remove("spinning");
  }
}

async function syncAlwaysOnTop() {
  await window.codexQuota.getAlwaysOnTop();
  els.pinBtn.classList.add("active");
  els.pinBtn.title = "桌面常驻";
}

els.refreshBtn.addEventListener("click", () => refreshQuota({ force: true }));
els.minimizeBtn.addEventListener("click", async () => {
  const collapsed = await window.codexQuota.toggleCollapsed();
  renderCollapsed(collapsed);
  els.statusText.textContent = collapsed ? t("collapsed") : t("expanded");
});
els.closeBtn.addEventListener("click", () => window.codexQuota.close());
els.pinBtn.addEventListener("click", async () => {
  els.pinBtn.classList.add("active");
  els.pinBtn.classList.remove("pulse");
  void els.pinBtn.offsetWidth;
  els.pinBtn.classList.add("pulse");
  els.pinBtn.title = "桌面常驻";
  els.statusText.textContent = t("pinned");
  try {
    await window.codexQuota.setAlwaysOnTop(true);
    await window.codexQuota.placeTopRight();
  } finally {
    syncAlwaysOnTop();
  }
});
els.langBtn.addEventListener("click", () => setLanguage(locale === "zh" ? "en" : "zh"));
els.sizeBtn.addEventListener("click", async () => {
  renderWidgetSize(await window.codexQuota.cycleWidgetSize());
});
els.statusText.addEventListener("click", () => {
  if (els.body.dataset.state === "error" && lastError?.canOpenCodex) window.codexQuota.openCodex();
});

window.codexQuota.onRefresh((_options) => refreshQuota(_options || { force: true }));
window.codexQuota.onAlwaysOnTopChanged(syncAlwaysOnTop);
window.codexQuota.onWidgetSizeChanged(renderWidgetSize);
window.codexQuota.onCollapsedChanged(renderCollapsed);
window.codexQuota.onPlanDisplayChanged(renderPlanDisplay);

setLanguage(locale);
syncAlwaysOnTop();
window.codexQuota.getWidgetSize().then(renderWidgetSize);
window.codexQuota.getCollapsed().then(renderCollapsed);
window.codexQuota.getPlanDisplay().then(renderPlanDisplay);
refreshQuota({ force: true });
refreshTimer = setInterval(() => refreshQuota({ force: false }), REFRESH_INTERVAL_MS);
countdownTimer = setInterval(() => render(lastQuota), 30_000);

window.addEventListener("beforeunload", () => {
  clearInterval(refreshTimer);
  clearInterval(countdownTimer);
});
