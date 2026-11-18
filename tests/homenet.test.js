import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Simula localStorage para ejecutar los servicios sin navegador.
const memory = new Map();
globalThis.localStorage = {
  getItem: key => memory.has(key) ? memory.get(key) : null,
  setItem: (key, value) => memory.set(key, String(value))
};

const { validateLogin } = await import("../js/modules/auth.js");
const { addDevice, toggleDevice, removeDevice } = await import("../js/modules/devices.js");
const { setPriority } = await import("../js/modules/network.js");
const { getMetrics } = await import("../js/modules/monitoring.js");
const { getState, updateState } = await import("../js/services/state.js");

beforeEach(() => {
  getState().devices.splice(0);
  getState().history.splice(0);
  updateState();
});

test("valida las credenciales demostrativas correctas", () => {
  assert.equal(validateLogin("admin", "homenet123"), true);
});

test("rechaza una contraseña incorrecta", () => {
  assert.equal(validateLogin("admin", "incorrecta"), false);
});

test("agrega un dispositivo al estado compartido", () => {
  addDevice("Celular de prueba", "Celular");
  assert.equal(getState().devices.length, 1);
  assert.equal(getState().devices[0].name, "Celular de prueba");
});

test("no permite agregar un dispositivo sin nombre", () => {
  assert.throws(() => addDevice("   ", "Otro"), /nombre/);
});

test("actualiza la prioridad de un dispositivo", () => {
  addDevice("Portátil", "Computador");
  const id = getState().devices[0].id;
  setPriority(id, "Alta");
  assert.equal(getState().devices[0].priority, "Alta");
});

test("activa y desactiva un dispositivo", () => {
  addDevice("Televisor", "Televisor");
  const id = getState().devices[0].id;
  toggleDevice(id);
  assert.equal(getState().devices[0].active, false);
  toggleDevice(id);
  assert.equal(getState().devices[0].active, true);
});

test("elimina un dispositivo", () => {
  addDevice("Consola", "Consola");
  const id = getState().devices[0].id;
  removeDevice(id);
  assert.equal(getState().devices.length, 0);
});

test("calcula correctamente las métricas", () => {
  addDevice("Equipo A", "Computador");
  addDevice("Equipo B", "Celular");
  toggleDevice(getState().devices[1].id);
  const metrics = getMetrics();
  assert.equal(metrics.total, 2);
  assert.equal(metrics.active, 1);
  assert.ok(metrics.usage > 0);
});
