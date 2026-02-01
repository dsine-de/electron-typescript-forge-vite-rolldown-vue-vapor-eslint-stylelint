<template>
	<main>
		<div>Welcome {{text}}</div>
		<button @click="sendMessageToMain">
			Change message through IPC
		</button>
	</main>
</template>

<script lang="ts">
declare const api: API;
</script>

<script setup vapor lang="ts">
import {ref} from 'vue';
import type {API} from '../ts/node/preload.ts';

const text = ref('from Electron.js');

api.onMessageFromMain(message => {
	console.log(`onMessageFromMain received from main in renderer ("${message}")`);
	text.value = message;
});

function sendMessageToMain() {
	api.sendMessageToMain('from renderer');
}
</script>

<style>
@import url("../css/variables.css");

:root {
	font-family: sans-serif;
	color: var(--primary);
	background-color: var(--background);
	cursor: default;
	user-select: none;
}

body {
	margin: 0;
}

div#app {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		button {
			padding: 5px;
		}
	}
}
</style>
