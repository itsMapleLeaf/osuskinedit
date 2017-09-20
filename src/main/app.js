"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
let win;
electron_1.app.on('ready', () => {
    win = new electron_1.BrowserWindow();
    win.loadURL(path_1.resolve(__dirname, '../renderer/index.html'));
});
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
