const STORAGE_KEY = "homenet_data_v1";

const initialData = {
  devices: [
    { id: 1, name: "Celular principal", type: "Celular", active: true, priority: "Alta", usage: 3.2 },
    { id: 2, name: "Portátil", type: "Computador", active: true, priority: "Alta", usage: 5.1 },
    { id: 3, name: "Smart TV", type: "Televisor", active: false, priority: "Media", usage: 8.4 }
  ],
  history: ["HomeNet se inició en modo demostrativo."]
};

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(initialData);
  } catch {
    return structuredClone(initialData);
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
