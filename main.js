// main.js
import { 
    addHabit, 
    editHabit, 
    deleteHabit, 
    toggleHabitCompletion, 
    toggleHabitDayCompletion,
    updateStats,
    checkForNewDay
} from './habitTracker.js';
import { renderHabits } from './ui.js';

// DOM Elements
const habitInput = document.getElementById('habit');
const descriptionInput = document.getElementById('description');
const durationInput = document.getElementById('duration');
const addButton = document.getElementById('add-habit-btn');
const editButton = document.getElementById('edit-habit-btn');
let editId = null;

// Initialize
function initApp() {
    checkForNewDay();
    renderHabits();
    updateStats();
    
    // Set up event listeners
    addButton.addEventListener('click', () => {
        const name = habitInput.value.trim();
        const description = descriptionInput.value.trim();
        const duration = durationInput.value.trim();

        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Duration:", duration);

        if (name && duration) {
            const newHabit = addHabit(name, description, duration);
            console.log("Habit added:", newHabit);

            habitInput.value = '';
            descriptionInput.value = '';
            durationInput.value = '';
            renderHabits();
            updateStats();
        } else {
            alert('Please enter both habit name and duration');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = Number(e.target.dataset.id);
            deleteHabit(id);
            renderHabits();
            updateStats();
        } else if (e.target.classList.contains('complete-btn')) {
            const id = Number(e.target.dataset.id);
            toggleHabitCompletion(id);
            renderHabits();
            updateStats();
        } else if (e.target.classList.contains('heart-day') && !e.target.disabled) {
            const id = Number(e.target.dataset.id);
            const date = e.target.dataset.date;
            toggleHabitDayCompletion(id, date);
            renderHabits();
            updateStats();
        }
    });

    // Stats header event listeners
    document.getElementById('total-habits-card').addEventListener('click', () => renderHabits('all'));
    document.getElementById('completed-habits-card').addEventListener('click', () => renderHabits('completed'));
    document.getElementById('active-streaks-card').addEventListener('click', () => renderHabits('active'));
}

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
