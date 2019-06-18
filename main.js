const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

process.env.NODE_ENV = "production";

let mainWindow;
let addWindow;

app.on("ready", function() {
  // create main window
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });
  //load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );
  //quit app when closed
  mainWindow.on("closed", function() {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);
});

//handle createaddwindow
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add shopping list item",
    webPreferences: { nodeIntegration: true }
  });
  //load html into window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );
  //garbage collection handle
  addWindow.on("close", function() {
    addWindow = null;
  });
}

//catch item:add
ipcMain.on("item:add", function(e, item) {
  mainWindow.webContents.send("item:add", item);
  addWindow.close();
});

//create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: process.platform == "darwin" ? "Command+w" : "ctrl+b",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Items",
        accelerator: process.platform == "darwin" ? "Command+c" : "ctrl+g",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+q" : "ctrl+q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//if mac add empty menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add dev tools items if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toogle Dev Tools",
        accelerator:
          process.platform == "darwin" ? "Command+i" : "ctrl+shift+i",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
