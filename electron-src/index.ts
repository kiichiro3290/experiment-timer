// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, dialog } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
const fs = require("fs");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  // ウィンドウを新たに開く
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  // 開発環境時は，ローカルサーバーに起動したHTMLファイルを開いている
  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);
  mainWindow.webContents.openDevTools();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

/**
 * [IPC] 指定ファイルを保存する
 *
 */
ipcMain.handle("save-file", async (event, data) => {
  console.log(event);
  // 場所とファイル名を選択
  const filePath = dialog.showSaveDialogSync({
    // ダイアログの初期表示フォルダ: "ドキュメント" or "書類"
    defaultPath: app.getPath("documents"),
    buttonLabel: "保存", // ボタンのラベル\
    filters: [
      {
        extensions: [".webm"],
        name: "動画 ファイル",
      },
      {
        extensions: [".txt"],
        name: "テキスト ファイル",
      },
    ],
    properties: [
      "createDirectory", // ディレクトリの作成を許可 (macOS)
    ],
  });

  // キャンセルで閉じた場合
  if (filePath === undefined) {
    return { status: undefined };
  }

  // ファイルの内容を返却
  try {
    fs.writeFileSync(filePath, data);

    return {
      status: true,
      path: filePath,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
});
