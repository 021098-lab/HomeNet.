import { getState, updateState, addEvent } from "../services/state.js";

export function addDevice(name, type) {
  const cleanName = name.trim();
  if (!cleanName) throw new Error("Escribe un nombre para el dispositivo.");
  const state = getState();
  state.devices.push({
    id: Date.now(), name: cleanName, type, active: true, priority: "Media",
    usage: Number((Math.random() * 2 + 0.2).toFixed(1))
  });
  updateState();
  addEvent(`Se agregó el dispositivo ${cleanName}.`);
}

export function toggleDevice(id) {
  const device = getState().devices.find(item => item.id === Number(id));
  if (!device) return;
  device.active = !device.active;
  updateState();
  addEvent(`${device.name}: estado cambiado a ${device.active ? "activo" : "inactivo"}.`);
}

export function removeDevice(id) {
  const state = getState();
  const index = state.devices.findIndex(item => item.id === Number(id));
  if (index < 0) return;
  const [removed] = state.devices.splice(index, 1);
  updateState();
  addEvent(`Se eliminó el dispositivo ${removed.name}.`);
}
