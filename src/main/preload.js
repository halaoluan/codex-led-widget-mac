const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("codexQuota", {
  getQuota: () => ipcRenderer.invoke("quota:get"),
  minimize: () => ipcRenderer.invoke("window:minimize"),
  close: () => ipcRenderer.invoke("window:close"),
  getAlwaysOnTop: () => ipcRenderer.invoke("window:alwaysOnTop:get"),
  setAlwaysOnTop: (value) => ipcRenderer.invoke("window:alwaysOnTop:set", value),
  placeTopRight: () => ipcRenderer.invoke("window:placeTopRight"),
  getWidgetSize: () => ipcRenderer.invoke("widget:size:get"),
  setWidgetSize: (value) => ipcRenderer.invoke("widget:size:set", value),
  cycleWidgetSize: () => ipcRenderer.invoke("widget:size:cycle"),
  getCollapsed: () => ipcRenderer.invoke("widget:collapsed:get"),
  setCollapsed: (value) => ipcRenderer.invoke("widget:collapsed:set", value),
  toggleCollapsed: () => ipcRenderer.invoke("widget:collapsed:toggle"),
  getPlanDisplay: () => ipcRenderer.invoke("plan:display:get"),
  setPlanDisplay: (value) => ipcRenderer.invoke("plan:display:set", value),
  getLaunchAtLogin: () => ipcRenderer.invoke("app:launchAtLogin:get"),
  setLaunchAtLogin: (value) => ipcRenderer.invoke("app:launchAtLogin:set", value),
  openCodex: () => ipcRenderer.invoke("external:openCodex"),
  onRefresh: (callback) => {
    ipcRenderer.on("quota:refresh", callback);
  },
  onAlwaysOnTopChanged: (callback) => {
    ipcRenderer.on("window:alwaysOnTopChanged", (_event, value) => callback(value));
  },
  onWidgetSizeChanged: (callback) => {
    ipcRenderer.on("widget:sizeChanged", (_event, value) => callback(value));
  },
  onCollapsedChanged: (callback) => {
    ipcRenderer.on("widget:collapsedChanged", (_event, value) => callback(value));
  },
  onPlanDisplayChanged: (callback) => {
    ipcRenderer.on("plan:displayChanged", (_event, value) => callback(value));
  }
});
