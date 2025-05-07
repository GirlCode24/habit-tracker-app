// function renderHabits(filter = 'all') {
//     // updateDashboardStats();
//     habitList.innerHTML = '';
//     habitContainer.innerHTML = '';

//     let filteredHabits = habits;

//     if (filter === 'completed') {
//         filteredHabits = habits.filter(h => calculateHabitStats(h).status === 'Completed');
//     } else if (filter === 'active') {
//         filteredHabits = habits.filter(h => h.streak > 0);
//     }

//     filteredHabits.forEach(habit => {
//         const stats = calculateHabitStats(habit);
//         const habitDays = getDaysArray(habit.startDate, habit.endDate);
//         const weeks = groupDaysByWeek(habitDays);

//         const heartRows = weeks.map(week => {
//             return `
//                 <div class="calendar-row">
//                     ${week.map(date => {
//                         const dateObj = new Date(date);
//                         const isCompleted = habit.completedDays.includes(date);
//                         const isMissed = habit.missedDays.includes(date);
//                         const isToday = date === currentDate;
//                         const isPast = dateObj < new Date(currentDate) && !isToday;
//                         const isFuture = dateObj > new Date(currentDate);

//                         let heartClass = 'heart-day';
//                         let emoji = '🤍'; 
//                         let title = date;

//                         if (isCompleted) {
//                             heartClass += ' completed';
//                             emoji = '❤️';
//                             title += ' - Completed';
//                         } else if (isMissed) {
//                             heartClass += ' missed';
//                             emoji = '❌';
//                             title += ' - Missed';
//                         } else if (isToday) {
//                             heartClass += ' today';
//                             title += ' - Today';
//                         } else if (isPast) {
//                             heartClass += ' past';
//                             title += ' - Past day';
//                         } else if (isFuture) {
//                             heartClass += ' future';
//                             title += ' - Future day';
//                         }

//                         return `
//                             <button 
//                                 class="${heartClass}" 
//                                 data-id="${habit.id}" 
//                                 data-date="${date}"
//                                 title="${title}"
//                             >
//                                 ${emoji}
//                             </button>
//                         `;
//                     }).join('')}
//                 </div>
//             `;
//         }).join('');

//         const li = document.createElement('li');
//         li.className = 'habit-item';
//         li.dataset.id = habit.id;
//         li.innerHTML = `
//             <div class="habit-main">
//                 <h3>${habit.name}</h3>
//                 <p>${habit.description}</p>
//                 <p>Duration: ${habit.goal} days (${habit.startDate} to ${habit.endDate})</p>
//             </div>

//             <div class="calendar-container">
//                 ${heartRows}
//             </div>

//             <div class="habit-stats">
//                 <div class="progress-container">
//                     <div class="progress-bar" style="width: ${stats.completionRate}%"></div>
//                 </div>
//                 <span class="status">${stats.status} (${stats.completionRate}%)</span>
//             </div>

//             <div class="habit-details">
//                 <span>✅ ${stats.daysDone} days</span>
//                 <span>❌ ${stats.daysMissed} days missed</span>
//                 <span>🔥 ${habit.streak} day streak</span>
//                 <span>🏆 ${habit.longestStreak} record</span>
//             </div>

//             <div class="habit-actions">
//                 <button class="complete-btn" data-id="${habit.id}">
//                     ${habit.completedDays.includes(currentDate) ? 'Undo' : 'Complete'}
//                 </button>
//                 <button class="edit-btn" data-id="${habit.id}">Edit</button>
//                 <button class="delete-btn" data-id="${habit.id}">Delete</button>
//             </div>
//         `;
//         habitList.appendChild(li);
//     });
// }
