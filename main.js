import {
  addHabit,
  editHabit,
  deleteHabit,
  toggleHabitCompletion,
  toggleHabitDayCompletion,
  updateStats,
  checkForNewDay,
} from "./habitTracker.js";
import { getHabits } from './storage.js';
import { renderHabits } from "./ui.js";

// DOM Elements
const habitInput = document.getElementById("habit");
const descriptionInput = document.getElementById("description");
const durationInput = document.getElementById("duration");
const addButton = document.getElementById("add-habit-btn");
const editButton = document.getElementById("edit-habit-btn");
let editId = null;

// Initialize
function initApp() {
  checkForNewDay();
  renderHabits();
  updateStats();

  // Set up event listeners
  addButton.addEventListener("click", () => {
    const name = habitInput.value.trim();
    const description = descriptionInput.value.trim();
    const duration = durationInput.value.trim();

    if (name && duration) {
      addHabit(name, description, duration);
      habitInput.value = "";
      descriptionInput.value = "";
      durationInput.value = "";
      renderHabits();
      updateStats();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      deleteHabit(e.target.dataset.id);
      renderHabits();
      updateStats();
    } 
    else if (e.target.classList.contains("complete-btn")) {
      toggleHabitCompletion(e.target.dataset.id);
      renderHabits();
      updateStats();
    }
    else if (e.target.classList.contains("heart-day") && !e.target.disabled) {
      toggleHabitDayCompletion(e.target.dataset.id, e.target.dataset.date);
      renderHabits();
      updateStats();
    }
    else if (e.target.classList.contains("edit-btn")) {
      const habit = getHabits().find(h => h.id === e.target.dataset.id);
      if (habit) {
        habitInput.value = habit.name;
        descriptionInput.value = habit.description;
        durationInput.value = habit.goal;
        editId = e.target.dataset.id;
        editButton.style.display = "block";
        addButton.style.display = "none";
      }
    }
  });

  editButton.addEventListener("click", () => {
    const name = habitInput.value.trim();
    const description = descriptionInput.value.trim();
    const duration = durationInput.value.trim();

    if (editId && name && duration) {
      editHabit(editId, name, description, duration);
      habitInput.value = "";
      descriptionInput.value = "";
      durationInput.value = "";
      editId = null;
      editButton.style.display = "none";
      addButton.style.display = "block";
      renderHabits();
      updateStats();
    }
  });

  // Stats filters
  document.getElementById("total-habits-card").addEventListener("click", () => renderHabits("all"));
  document.getElementById("completed-habits-card").addEventListener("click", () => renderHabits("completed"));
  document.getElementById("active-streaks-card").addEventListener("click", () => renderHabits("active"));
}

document.addEventListener("DOMContentLoaded", initApp);