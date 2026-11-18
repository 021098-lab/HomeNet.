import { getState, updateState, addEvent } from "../services/state.js";

export function setPriority(id, priority) {
  const device = getState().devices.find(item => item.id === Number(id));
  if (!device || !["Alta", "Media", "Baja"].includes(priority)) return;
  device.priority = priority;
  updateState();
  addEvent(`Prioridad de ${device.name} actualizada a ${priority}.`);
}
