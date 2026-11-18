import { getState } from "../services/state.js";

export function getMetrics() {
  const devices = getState().devices;
  return {
    total: devices.length,
    active: devices.filter(device => device.active).length,
    usage: devices.reduce((sum, device) => sum + Number(device.usage || 0), 0),
    events: getState().history.length
  };
}
