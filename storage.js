let habits = JSON.parse(localStorage.getItem("habits")) || [];
let currentDate = localStorage.getItem("currentDate") || new Date().toISOString().split("T")[0];

export function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

export function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  return storedHabits;
}

export function getCurrentDate() {
  return currentDate;
}

export function updateCurrentDateIfNeeded() {
  const today = new Date().toISOString().split("T")[0];
  if (today !== currentDate) {
    currentDate = today;
    localStorage.setItem("currentDate", currentDate);
    return true;
  }
  return false;
}

export function getHabits() {
  return JSON.parse(localStorage.getItem("habits")) || [];
}

export function setHabits(newHabits) {
  habits = newHabits;
  saveHabits();
}