const DEMO_USER = "admin";
const DEMO_PASSWORD = "homenet123";

export function validateLogin(username, password) {
  return username.trim() === DEMO_USER && password === DEMO_PASSWORD;
}

export function showApplication() {
  document.querySelector("#loginView").classList.add("hidden");
  document.querySelector("#appView").classList.remove("hidden");
  document.querySelector("#logoutBtn").classList.remove("hidden");
}

export function showLogin() {
  document.querySelector("#appView").classList.add("hidden");
  document.querySelector("#loginView").classList.remove("hidden");
  document.querySelector("#logoutBtn").classList.add("hidden");
}
