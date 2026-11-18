import { validateLogin, showApplication, showLogin } from "./modules/auth.js";
import { addDevice, toggleDevice, removeDevice } from "./modules/devices.js";
import { setPriority } from "./modules/network.js";
import { getMetrics } from "./modules/monitoring.js";
import { getState } from "./services/state.js";

const $ = selector => document.querySelector(selector);

$("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const valid = validateLogin($("#username").value, $("#password").value);
  if (!valid) {
    $("#loginMessage").textContent = "Usuario o contraseña incorrectos.";
    return;
  }
  $("#loginMessage").textContent = "";
  showApplication();
  render();
});

$("#logoutBtn").addEventListener("click", showLogin);

$("#deviceForm").addEventListener("submit", event => {
  event.preventDefault();
  try {
    addDevice($("#deviceName").value, $("#deviceType").value);
    $("#deviceName").value = "";
    render();
  } catch (error) {
    alert(error.message);
  }
});

$("#deviceList").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = button.dataset.id;
  if (button.dataset.action === "toggle") toggleDevice(id);
  if (button.dataset.action === "remove") removeDevice(id);
  render();
});

$("#networkList").addEventListener("change", event => {
  if (event.target.matches("select[data-priority]")) {
    setPriority(event.target.dataset.priority, event.target.value);
    render();
  }
});

function render() {
  const state = getState();
  const metrics = getMetrics();
  $("#totalDevices").textContent = metrics.total;
  $("#activeDevices").textContent = metrics.active;
  $("#totalUsage").textContent = `${metrics.usage.toFixed(1)} GB`;
  $("#monitorUsage").textContent = `${metrics.usage.toFixed(1)} GB`;
  $("#eventCount").textContent = metrics.events;

  $("#deviceList").innerHTML = state.devices.map(device => `
    <article class="device-card">
      <h3>${escapeHTML(device.name)}</h3>
      <p>${escapeHTML(device.type)} · ${device.active ? "Activo" : "Inactivo"} · ${device.usage} GB</p>
      <div class="device-actions">
        <button class="small-btn" data-action="toggle" data-id="${device.id}">${device.active ? "Desactivar" : "Activar"}</button>
        <button class="small-btn danger" data-action="remove" data-id="${device.id}">Eliminar</button>
      </div>
    </article>`).join("") || "<p class='muted'>No hay dispositivos registrados.</p>";

  $("#networkList").innerHTML = state.devices.length ? `
    <table><thead><tr><th>Dispositivo</th><th>Estado</th><th>Prioridad</th></tr></thead><tbody>
    ${state.devices.map(device => `<tr>
      <td>${escapeHTML(device.name)}</td><td>${device.active ? "Activo" : "Inactivo"}</td>
      <td><select data-priority="${device.id}" aria-label="Prioridad de ${escapeHTML(device.name)}">
        ${["Alta","Media","Baja"].map(value => `<option ${device.priority === value ? "selected" : ""}>${value}</option>`).join("")}
      </select></td></tr>`).join("")}
    </tbody></table>` : "<p class='muted'>Agrega un dispositivo para administrar su prioridad.</p>";

  $("#historyList").innerHTML = state.history.map(item => `<li>${escapeHTML(item)}</li>`).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}
