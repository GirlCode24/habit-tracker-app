// // DOM Elements
// const habitInput = document.getElementById('habit');
// const descriptionInput = document.getElementById('description');
// const durationInput = document.getElementById('duration');
// const addButton = document.getElementById('add-habit-btn');
// const editButton = document.getElementById('edit-habit-btn');
// const habitList = document.getElementById('habit-list');
// const habitContainer = document.getElementById('habit-container');
// let editId = null;

// // Add New Habit
// function addHabit(name, description, duration) {
//     const startDate = currentDate;
//     const endDate = calculateEndDate(startDate, duration);

//     const newHabit = {
//         id: Date.now(),
//         name,
//         description,
//         goal: parseInt(duration),
//         startDate,
//         endDate,
//         completedDays: [], 
//         missedDays: [],
//         streak: 0,
//         longestStreak: 0,
//         lastUpdated: currentDate,
//         status: "Not started"
//     };

//     habits.push(newHabit);
//     descriptionInput.value = '';
//     saveAndRender();
//     return newHabit;
// }

// // Enhanced day marking function
// function toggleHabitDayCompletion(id, date) {
//     const habit = habits.find(h => h.id === id);
//     if (!habit) return;

//     const dateObj = new Date(date);
//     const startDate = new Date(habit.startDate);
//     const endDate = new Date(habit.endDate);
    
//     // Only allow dates within habit duration
//     if (dateObj < startDate || dateObj > endDate) return;

//     const dateStr = dateObj.toISOString().split('T')[0];
//     const completedIndex = habit.completedDays.indexOf(dateStr);
//     const missedIndex = habit.missedDays.indexOf(dateStr);

//     if (completedIndex === -1) {
//         // Mark as completed
//         habit.completedDays.push(dateStr);
//         habit.missedDays = habit.missedDays.filter(d => d !== dateStr);
//     } else {
//         // Unmark completion
//         habit.completedDays.splice(completedIndex, 1);
//     }

//     habit.lastUpdated = currentDate;
//     saveAndRender();
// }

// // Edit Habit
// function editHabit(id, name, description, duration) {
//     const habit = habits.find(h => h.id === id);
//     if (habit) {
//         habit.name = name;
//         habit.description = description;
//         habit.goal = parseInt(duration);
//         habit.endDate = calculateEndDate(habit.startDate, duration);
//         saveAndRender();
//     }
//     editButton.style.display = 'none';
//     addButton.style.display = 'block';
// }

// // Delete Habit
// function deleteHabit(id) {
//     habits = habits.filter(habit => habit.id !== id);
//     saveAndRender();
// }

// // Toggle Habit Completion
// function toggleHabitCompletion(id) {
//     const habit = habits.find(h => h.id === id);
//     if (!habit) return;

//     const today = currentDate;
//     const completedIndex = habit.completedDays.indexOf(today);

//     if (completedIndex === -1) {
//         habit.completedDays.push(today);
//         habit.missedDays = habit.missedDays.filter(d => d !== today);
//     } else {
//         habit.completedDays.splice(completedIndex, 1);
//     }

//     habit.lastUpdated = today;
//     saveAndRender();
// }

// // Calculate Streak
// function calculateStreak(completedDays) {
//     const sorted = [...completedDays].sort().reverse();
//     let streak = 0;
//     let current = new Date();

//     for (let dateStr of sorted) {
//         const date = new Date(dateStr);
//         const diff = Math.floor((current - date) / (1000 * 60 * 60 * 24));

//         if (diff === 0 || diff === 1) {
//             streak++;
//             current.setDate(current.getDate() - 1);
//         } else {
//             break;
//         }
//     }

//     return streak;
// }

// // Update Streaks and Status
// function updateStreaksAndStatus() {
//     habits.forEach(habit => {
//         const stats = calculateHabitStats(habit);
//         habit.streak = stats.streak;
//         habit.longestStreak = stats.longestStreak;
//         habit.status = stats.status;
//         habit.missedDays = habit.missedDays || stats.daysMissed;
//     });
// }


// // Calculate Habit Stats
// function calculateHabitStats(habit) {
//     const today = new Date(currentDate);
//     const start = new Date(habit.startDate);
//     const end = new Date(habit.endDate);
//     const completedSet = new Set(habit.completedDays);
//     const missedDays = [];
//     let streak = 0;
//     let longestStreak = 0;
//     let currentStreak = 0;

//     const checkEnd = end < today ? end : today;

//     for (let d = new Date(start); d <= checkEnd; d.setDate(d.getDate() + 1)) {
//         const dateStr = d.toISOString().split('T')[0];
//         if (completedSet.has(dateStr)) {
//             currentStreak++;
//             if (currentStreak > longestStreak) longestStreak = currentStreak;
//         } else {
//             if (dateStr < currentDate) missedDays.push(dateStr); 
//             currentStreak = 0;
//         }
//     }

//     streak = currentStreak;
//     habit.streak = streak;
//     habit.longestStreak = longestStreak;
//     habit.missedDays = missedDays;

//     const totalDays = Math.floor((new Date(habit.endDate) - start) / (1000 * 60 * 60 * 24)) + 1;
//     const daysDone = habit.completedDays.length;
//     const daysMissed = missedDays.length;
//     const completionRate = totalDays > 0 ? Math.round((daysDone / totalDays) * 100) : 0;

//     let status = "Not started";
//     if (daysDone > 0) {
//         status = completionRate >= 100 ? "Completed" :
//                  completionRate >= 80 ? "Excellent" :
//                  completionRate >= 50 ? "Good" :
//                  completionRate > 0 ? "In Progress" : "Needs Work";
//     }

//     return {
//         totalDays,
//         daysDone,
//         daysMissed,
//         completionRate,
//         streak,
//         longestStreak,
//         status
//     };
// }


// // Calculate End Date
// function calculateEndDate(startDate, duration) {
//     const start = new Date(startDate);
//     start.setDate(start.getDate() + parseInt(duration) - 1);
//     return start.toISOString().split('T')[0];
// }

// // Get All Days in Habit Duration
// function getDaysArray(startDate, endDate) {
//     const arr = [];
//     const start = new Date(startDate);
//     const end = new Date(endDate);
    
//     for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
//         arr.push(dt.toISOString().split('T')[0]);
//     }
//     return arr;
// }

// function groupDaysByWeek(daysArray) {
//     const weeks = [];
//     let currentWeek = [];
    
//     daysArray.forEach((day, index) => {
//         currentWeek.push(day);
//         if ((index + 1) % 7 === 0 || index === daysArray.length - 1) {
//             weeks.push(currentWeek);
//             currentWeek = [];
//         }
//     });
    
//     return weeks;
// }

// // Update stats function
// function updateStats() {
//     const total = habits.length;
//     const completed = habits.filter(h => h.status === "Completed").length;
//     const activeStreaks = habits.filter(h => h.streak > 0).length;
  
//     document.getElementById('total-habits').textContent = total;
//     document.getElementById('completed-habits').textContent = completed;
//     document.getElementById('active-streaks').textContent = activeStreaks;
//   }
  
// //Habits filter
// function renderHabits(filter = "all") {
//     habitList.innerHTML = '';

//     let filteredHabits = habits;

//     if (filter === "completed") {
//         filteredHabits = habits.filter(h => h.status === "Completed");
//     } else if (filter === "active") {
//         filteredHabits = habits.filter(h => h.streak > 0);
//     }

//     filteredHabits.forEach(habit => {
//         const habitCard = createHabitCard(habit); 
//         habitList.appendChild(habitCard);
//     });
// }


  

// // Save and Render
// function saveAndRender() {
//     updateStreaksAndStatus();
//     saveHabits();
//     renderHabits();
//     updateStats();
// }
// function updateStreaksAndStatus() {
//     habits.forEach(habit => {
//         const stats = calculateHabitStats(habit);
//         habit.streak = stats.streak;
//         habit.longestStreak = stats.longestStreak;
//         habit.status = stats.status;
//     });
// }

// // Clear Form
// function clearForm() {
//     habitInput.value = '';
//     descriptionInput.value = '';
//     durationInput.value = '';
//     editId = null;
//     editButton.style.display = 'none';
//     addButton.style.display = 'block';
// }

// // Check for New Day
// function checkForNewDay() {
//     const today = new Date().toISOString().split('T')[0];
//     if (today !== currentDate) {
//         currentDate = today;

//         // Automatically mark yesterday as missed if not completed
//         habits.forEach(habit => {
//             const yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             const yDateStr = yesterday.toISOString().split('T')[0];

//             if (
//                 new Date(yDateStr) >= new Date(habit.startDate) &&
//                 new Date(yDateStr) <= new Date(habit.endDate) &&
//                 !habit.completedDays.includes(yDateStr) &&
//                 !habit.missedDays.includes(yDateStr)
//             ) {
//                 habit.missedDays.push(yDateStr);
//             }
//         });

//         saveAndRender();
//     }
// }


// // Mark Day as Missed
// function markDayAsMissed(id) {
//     const habit = habits.find(h => h.id === id);
//     if (!habit) return;

//     const today = currentDate;
//     if (!habit.completedDays.includes(today) && !habit.missedDays.includes(today)) {
//         habit.missedDays.push(today);
//         habit.lastUpdated = today;
//         saveAndRender();
//     }
// }

// // Event Listeners
// addButton.addEventListener('click', () => {
//     const name = habitInput.value.trim();
//     const description = descriptionInput.value.trim();
//     const duration = durationInput.value.trim();

//     if (name && duration) {
//         addHabit(name, description, duration);
//         clearForm();
//     } else {
//         alert('Please enter both habit and duration');
//     }
// });

// editButton.addEventListener('click', () => {
//     const name = habitInput.value.trim();
//     const description = descriptionInput.value.trim();
//     const duration = durationInput.value.trim();

//     if (name && duration && editId) {
//         editHabit(editId, name, description, duration);
//         clearForm();
//     }
// });

// habitList.addEventListener('click', (e) => {
//     const id = Number(e.target.closest('[data-id]')?.dataset.id);
//     if (!id) return;

//     if (e.target.classList.contains('delete-btn')) {
//         deleteHabit(id);
//     } else if (e.target.classList.contains('edit-btn')) {
//         const habit = habits.find(h => h.id === id);
//         if (habit) {
//             habitInput.value = habit.name;
//             descriptionInput.value = habit.description;
//             durationInput.value = habit.goal;
//             editId = id;
//             addButton.style.display = 'none';
//             editButton.style.display = 'block';
//             habitInput.focus();
//         }
//     } else if (e.target.classList.contains('complete-btn')) {
//         toggleHabitCompletion(id);
//     } else if (e.target.classList.contains('miss-btn')) {
//         markDayAsMissed(id);
//     } else if (e.target.classList.contains('heart-day') && !e.target.disabled) {
//         const date = e.target.dataset.date;
//         toggleHabitDayCompletion(id, date);
//     }
// });

// document.getElementById('total-habits-card').addEventListener('click', () => renderHabits('all'));
// document.getElementById('completed-habits-card').addEventListener('click', () => renderHabits('completed'));
// document.getElementById('active-streaks-card').addEventListener('click', () => renderHabits('active'));



// // Initialize
// checkForNewDay();
// renderHabits();
// updateStats();