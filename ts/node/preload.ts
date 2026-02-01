import {contextBridge, ipcRenderer} from 'electron/renderer';

const api = {
	sendMessageToMain(message: string) {
		console.log(`sendMessageToMain received in preload from renderer ("${message}")`);
		ipcRenderer.send('message', message);
	},
	onMessageFromMain(callback: (message: string) => void) {
		ipcRenderer.on('message', (_, message: string) => {
			callback(message);
		});
	}
};

export type API = typeof api;

contextBridge.exposeInMainWorld('api', api);
