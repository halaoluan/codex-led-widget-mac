const { app, BrowserWindow, ipcMain, shell, Tray, Menu, nativeImage, screen } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const { getQuota } = require("./quota-service");

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
  process.exit(0);
}

let mainWindow;
let tray;
let trayMenu;
const isAlwaysOnTop = true;
let launchAtLogin = false;
let currentWidgetSize = "small";
let planDisplayOverride = "PLUS";
let lastTrayRestoreAt = 0;

const BASE_WIDTH = 438;
const BASE_HEIGHT = 268;
const WIDGET_SIZES = {
  small: { label: "小", scale: 0.78 },
  medium: { label: "中", scale: 1 },
  large: { label: "大", scale: 1.18 }
};
const PLAN_DISPLAY_OPTIONS = [
  { label: "Free", value: "FREE" },
  { label: "Go", value: "GO" },
  { label: "Plus", value: "PLUS" },
  { label: "Pro", value: "PRO" },
  { label: "Business", value: "BUSINESS" },
  { label: "Team", value: "TEAM" },
  { label: "Enterprise", value: "ENTERPRISE" }
];

function widgetBoundsFor(sizeName = currentWidgetSize) {
  const size = WIDGET_SIZES[sizeName] || WIDGET_SIZES.small;
  return {
    width: Math.round(BASE_WIDTH * size.scale),
    height: Math.round(BASE_HEIGHT * size.scale),
    scale: size.scale
  };
}

function createWindow() {
  const bounds = widgetBoundsFor();
  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    minWidth: bounds.width,
    minHeight: bounds.height,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: isAlwaysOnTop,
    skipTaskbar: true,
    show: false,
    backgroundColor: "#00000000",
    hasShadow: false,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: -100, y: -100 },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.setZoomFactor(bounds.scale);
    pinToDesktop();
    mainWindow.show();
    placeWindowTopRight();
  });

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    pinToDesktop();
    placeWindowTopRight();
  });

  mainWindow.on("hide", () => {
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.showInactive();
        pinToDesktop();
      }
    }, 50);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function placeWindowTopRight() {
  if (!mainWindow) return;
  const display = screen.getPrimaryDisplay();
  const { width, height } = mainWindow.getBounds();
  const { workArea } = display;
  mainWindow.setBounds({
    x: workArea.x + workArea.width - width - 20,
    y: workArea.y + 18,
    width,
    height
  });
  pinToDesktop();
}

function createTray() {
  if (tray) return;
  const icon = createTrayIcon();
  tray = new Tray(icon);
  tray.setToolTip("Codex LED Widget");
  rebuildTrayMenu();
  tray.on("mouse-down", restoreWindowFromTray);
  tray.on("mouse-up", restoreWindowFromTray);
  tray.on("click", restoreWindowFromTray);
  tray.on("right-click", showTrayMenu);
  tray.on("double-click", restoreWindowFromTray);
}

function createTrayIcon() {
  const image = nativeImage.createFromDataURL(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVR4AWP4//8/AyWYYdSoUaOArq6uCqBFJkyYwAiiG4BqQJqBqQZkGpgWoGxAmoGpBmQamBagbECagakGZBqYFqBsQJqBqQYAI1Qh5uDq2QUAAAAASUVORK5CYII="
  );
  image.setTemplateImage(true);
  return image;
}

function rebuildTrayMenu() {
  if (!tray) return;
  trayMenu = Menu.buildFromTemplate([
      { label: "显示窗口", click: restoreWindowFromTray },
      { label: "放回桌面", click: minimizeWindow },
      { label: "放到右上角", click: placeWindowTopRight },
      { label: "刷新额度", click: () => mainWindow?.webContents.send("quota:refresh") },
      {
        label: "组件大小",
        submenu: Object.entries(WIDGET_SIZES).map(([value, size]) => ({
          label: size.label,
          type: "radio",
          checked: currentWidgetSize === value,
          click: () => setWidgetSize(value)
        }))
      },
      {
        label: "套餐显示",
        submenu: PLAN_DISPLAY_OPTIONS.map((plan) => ({
          label: plan.label,
          type: "radio",
          checked: planDisplayOverride === plan.value,
          click: () => setPlanDisplayOverride(plan.value)
        }))
      },
      {
        label: "桌面常驻",
        enabled: false
      },
      {
        label: launchAtLogin ? "取消开机启动" : "开机启动",
        click: () => setLaunchAtLogin(!launchAtLogin)
      },
      { type: "separator" },
      { label: "退出", click: () => app.quit() }
    ]);

  tray.setContextMenu(trayMenu);
}

function setAlwaysOnTop(value) {
  pinToDesktop();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("window:alwaysOnTopChanged", true);
  }
  rebuildTrayMenu();
  return true;
}

function pinToDesktop() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.setSkipTaskbar(true);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, "screen-saver", 1);
  mainWindow.setOpacity(1);
  mainWindow.showInactive();
  mainWindow.moveTop();
}

function toggleWindow() {
  restoreWindowFromTray();
}

function minimizeWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  pinToDesktop();
  placeWindowTopRight();
}

function showTrayMenu() {
  tray?.popUpContextMenu(trayMenu);
}

function restoreWindowFromTray() {
  const now = Date.now();
  if (now - lastTrayRestoreAt < 120) return;
  lastTrayRestoreAt = now;

  if (!mainWindow || mainWindow.isDestroyed()) {
    createWindow();
    return;
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  app.focus({ steal: true });
  placeWindowTopRight();
  mainWindow.showInactive();
  mainWindow.show();
  pinToDesktop();
  mainWindow.moveTop();
  mainWindow.focus();
  mainWindow.webContents.focus();
  mainWindow.flashFrame(false);
}

app.on("second-instance", restoreWindowFromTray);

app.whenReady().then(() => {
  if (process.platform === "darwin") {
    app.setActivationPolicy?.("accessory");
    app.dock?.hide();
  }
  launchAtLogin = app.getLoginItemSettings().openAtLogin;
  const settings = readSettings();
  currentWidgetSize = settings.widgetSize || "small";
  planDisplayOverride = settings.planDisplayOverride || "PLUS";
  createWindow();
  createTray();

  ipcMain.handle("quota:get", async () => getQuota());
  ipcMain.handle("window:minimize", () => minimizeWindow());
  ipcMain.handle("window:close", () => app.quit());
  ipcMain.handle("window:alwaysOnTop:get", () => isAlwaysOnTop);
  ipcMain.handle("window:alwaysOnTop:set", (_event, value) => setAlwaysOnTop(value));
  ipcMain.handle("window:placeTopRight", () => placeWindowTopRight());
  ipcMain.handle("widget:size:get", () => currentWidgetSize);
  ipcMain.handle("widget:size:set", (_event, value) => setWidgetSize(value));
  ipcMain.handle("widget:size:cycle", () => cycleWidgetSize());
  ipcMain.handle("plan:display:get", () => planDisplayOverride);
  ipcMain.handle("plan:display:set", (_event, value) => setPlanDisplayOverride(value));
  ipcMain.handle("app:launchAtLogin:get", () => launchAtLogin);
  ipcMain.handle("app:launchAtLogin:set", (_event, value) => setLaunchAtLogin(value));
  ipcMain.handle("external:openCodex", () => {
    const candidates = [
      "/Applications/Codex.app",
      path.join(process.env.HOME || "", "Applications", "Codex.app")
    ];
    const appPath = candidates.find((candidate) => fs.existsSync(candidate)) || "/Applications/Codex.app";
    shell.openPath(appPath);
  });

  app.on("activate", () => {
    restoreWindowFromTray();
  });
});

app.on("window-all-closed", (event) => {
  event.preventDefault();
});

function setLaunchAtLogin(value) {
  launchAtLogin = Boolean(value);
  app.setLoginItemSettings({ openAtLogin: launchAtLogin });
  rebuildTrayMenu();
  return launchAtLogin;
}

function setWidgetSize(value) {
  if (!Object.prototype.hasOwnProperty.call(WIDGET_SIZES, value)) return currentWidgetSize;
  currentWidgetSize = value;
  writeSettings({ widgetSize: currentWidgetSize });
  if (mainWindow) {
    const bounds = widgetBoundsFor();
    mainWindow.setMinimumSize(bounds.width, bounds.height);
    mainWindow.setSize(bounds.width, bounds.height, true);
    mainWindow.webContents.setZoomFactor(bounds.scale);
    placeWindowTopRight();
    mainWindow.webContents.send("widget:sizeChanged", currentWidgetSize);
  }
  rebuildTrayMenu();
  return currentWidgetSize;
}

function setPlanDisplayOverride(value) {
  const allowed = new Set(PLAN_DISPLAY_OPTIONS.map((plan) => plan.value));
  planDisplayOverride = allowed.has(value) ? value : "PLUS";
  writeSettings({ planDisplayOverride });
  mainWindow?.webContents.send("plan:displayChanged", planDisplayOverride);
  rebuildTrayMenu();
  return planDisplayOverride;
}

function cycleWidgetSize() {
  const order = ["small", "medium", "large"];
  const next = order[(order.indexOf(currentWidgetSize) + 1) % order.length] || "small";
  return setWidgetSize(next);
}

function settingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath(), "utf8"));
  } catch {
    return {};
  }
}

function writeSettings(update) {
  const settings = { ...readSettings(), ...update };
  fs.mkdirSync(path.dirname(settingsPath()), { recursive: true });
  fs.writeFileSync(settingsPath(), JSON.stringify(settings, null, 2));
}
