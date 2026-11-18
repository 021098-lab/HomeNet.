import { loadData, saveData } from "./storage.js";

const state = loadData();

export function getState() {
  return state;
}

export function updateState() {
  saveData(state);
}

export function addEvent(message) {
  const stamp = new Date().toLocaleString("es-CO");
  state.history.unshift(`${stamp}: ${message}`);
  state.history = state.history.slice(0, 12);
  updateState();
}
