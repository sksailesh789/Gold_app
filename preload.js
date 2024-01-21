const {ipcRenderer,contextBridge,globalShortcut} = require ('electron')

contextBridge.exposeInMainWorld('electron' , {
    notificationApi: {
        sendNotification(message) {
            ipcRenderer.send('notify' , message)
        }
    },
    printApi: {
        sendPrint(message) {
            // window.postMessage(message, "*");
            const qr = new BroadcastChannel("test");
            qr.postMessage( message );

            console.log(message,'oom')
            ipcRenderer.send('printPdf' )
            return message

        }
    },
    registerShortcut: (shortcut, callback) => {
        console.log('globalshort')
        globalShortcut.register(shortcut, callback);
      },
    //   send: (channel, data) => {
    //     ipcRenderer.send(channel, data);
    //   },
    //   receive: (channel, func) => {
    //     ipcRenderer.on(channel, (event, ...args) => func(...args));
    //   }
    //   unregisterShortcut: (shortcut) => {
    //     globalShortcut.unregister(shortcut);
    //   },

   
})

console.log('hello from preload')
