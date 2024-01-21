
const { app, BrowserWindow,Notification,ipcMain,Menu,globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs')
const os = require('os')
const isDev = !app.isPackaged ;
let win;
let workerWindow;

function createWindow() {
  // Browser Window <- Renderer Process
   win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    frame: true,  //set frame to false
    webPreferences: {
      nodeIntegration: false,
      icon: path.join(__dirname, 'icon.ico'),
    //   enableRemoteModule: true,
      // will sanitize JS code
      // TODO: explain when React application is initialize
      worldSafeExecuteJavaScript: true,
      // is a feature that ensures that both, your preload scripts and Electron
      // internal logic run in sparate context
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    
    }
  })
  win.setMenuBarVisibility(false); //hide menu bar
  isDev && win.webContents.openDevTools();
  win.loadFile('index.html')

  workerWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      // nodeIntegration: false,
    //   enableRemoteModule: true,
      // will sanitize JS code
      // TODO: explain when React application is initialize
      // worldSafeExecuteJavaScript: true,
      // is a feature that ensures that both, your preload scripts and Electron
      // internal logic run in sparate context
      // contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    
    }
  });
    workerWindow.loadFile('worker1.html');
    // workerWindow.hide();
    workerWindow.webContents.openDevTools();
    workerWindow.on("closed", () => {
        workerWindow = undefined;
    });

}
if(isDev) {
  require('electron-reload') (__dirname , {
      electron : path.join(__dirname , 'node_modules' , '.bin' , 'electron')
  })
}
let button;
app.whenReady().then(() => {
  globalShortcut.register('Ctrl+Shift+D', () => {
    // Do something here
    console.log('global shortcut')
    win.webContents.executeJavaScript(`
    button = document.querySelector('.sp_button');
    if (button) {
      button.click();
    }
  `);
  });
  createWindow();
}).catch(err => console.log(err,'err5'));

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'Notification', body: message}).show();
})

// retransmit it to workerWindow
ipcMain.on("printPdf", (event, content) => {
  console.log(content,'mainpage');
   // Get the desired printer by name
   const printerName = 'My Printer';
   const printer = workerWindow.webContents.getPrinters().find((p) => p.name === printerName);

if (!printer) {
 console.error(`Printer '${printerName}' not found`);
 return;
}
  var options = {
    silent: false,
    printBackground: true,
    deviceName: printerName,
    color: true,
    margin: {
        marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page',

  }
 
  // workerWindow.webContents.send("data", content);
  workerWindow.webContents.print(options, (success, failureReason) => {
    if (!success) console.log(failureReason,'failurereason');

    console.log('Print Initiated');
});

});


ipcMain.on('app-quit', () => {
  app.quit();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
      globalShortcut.unregister('Ctrl+Shift+D');
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })



// Chromium -> web eingine for rendering the UI, full Chrome-like web browser
// V8 -> engine that provides capabilities to execute, run, JS code in the browser
// Node JS(V8) -> we are able to run JS code + provides more features
// Webpack -> is a module builder , main purpose is to bundle JS files for usage in the  browser
// Babel -> is a JS compiler 