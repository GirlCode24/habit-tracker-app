// habitTracker.js
import { 
    loadHabits, 
    saveHabits, 
    getCurrentDate, 
    getHabits, 
    setHabits, 
    updateCurrentDateIfNeeded 
} from './storage.js';

let habits = getHabits();

// Helper Functions
function calculateEndDate(startDate, duration) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + parseInt(duration) - 1);
    return start.toISOString().split('T')[0];
}

function getDaysArray(startDate, endDate) {
    const arr = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(dt.toISOString().split('T')[0]);
    }
    return arr;
}

function groupDaysByWeek(daysArray) {
    const weeks = [];
    let currentWeek = [];
    
    daysArray.forEach((day, index) => {
        currentWeek.push(day);
        if ((index + 1) % 7 === 0 || index === daysArray.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });
    
    return weeks;
}

function calculateStreak(completedDays) {
    const sorted = [...completedDays].sort().reverse();
    let streak = 0;
    let current = new Date();

    for (let dateStr of sorted) {
        const date = new Date(dateStr);
        const diff = Math.floor((current - date) / (1000 * 60 * 60 * 24));

        if (diff === 0 || diff === 1) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

// Core Functions
export function addHabit(name, description, duration) {
    const startDate = getCurrentDate();
    const endDate = calculateEndDate(startDate, duration);

    const newHabit = {
        id: Date.now(),
        name,
        description,
        goal: parseInt(duration),
        startDate,
        endDate,
        completedDays: [], 
        missedDays: [],
        streak: 0,
        longestStreak: 0,
        lastUpdated: getCurrentDate(),
        status: "Not started"
    };

    habits.push(newHabit);
    setHabits(habits);
    return newHabit;
}

export function toggleHabitDayCompletion(id, date) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const dateObj = new Date(date);
    const startDate = new Date(habit.startDate);
    const endDate = new Date(habit.endDate);
    
    if (dateObj < startDate || dateObj > endDate) return;

    const dateStr = dateObj.toISOString().split('T')[0];
    const completedIndex = habit.completedDays.indexOf(dateStr);
    const missedIndex = habit.missedDays.indexOf(dateStr);

    if (completedIndex === -1) {
        habit.completedDays.push(dateStr);
        habit.missedDays = habit.missedDays.filter(d => d !== dateStr);
    } else {
        habit.completedDays.splice(completedIndex, 1);
    }

    habit.lastUpdated = getCurrentDate();
    setHabits(habits);
}

export function editHabit(id, name, description, duration) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.name = name;
        habit.description = description;
        habit.goal = parseInt(duration);
        habit.endDate = calculateEndDate(habit.startDate, duration);
        setHabits(habits);
    }
}

export function deleteHabit(id) {
    habits = habits.filter(habit => habit.id !== id);
    setHabits(habits);
}

export function toggleHabitCompletion(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const today = getCurrentDate();
    const completedIndex = habit.completedDays.indexOf(today);

    if (completedIndex === -1) {
        habit.completedDays.push(today);
        habit.missedDays = habit.missedDays.filter(d => d !== today);
    } else {
        habit.completedDays.splice(completedIndex, 1);
    }

    habit.lastUpdated = today;
    setHabits(habits);
}

export function calculateHabitStats(habit) {
    const today = new Date(getCurrentDate());
    const start = new Date(habit.startDate);
    const end = new Date(habit.endDate);
    const completedSet = new Set(habit.completedDays);
    const missedDays = [];
    let streak = 0;
    let longestStreak = 0;
    let currentStreak = 0;

    const checkEnd = end < today ? end : today;

    for (let d = new Date(start); d <= checkEnd; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (completedSet.has(dateStr)) {
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
        } else {
            if (dateStr < getCurrentDate()) missedDays.push(dateStr); 
            currentStreak = 0;
        }
    }

    streak = currentStreak;
    habit.streak = streak;
    habit.longestStreak = longestStreak;
    habit.missedDays = missedDays;

    const totalDays = Math.floor((new Date(habit.endDate) - start) / (1000 * 60 * 60 * 24)) + 1;
    const daysDone = habit.completedDays.length;
    const daysMissed = missedDays.length;
    const completionRate = totalDays > 0 ? Math.round((daysDone / totalDays) * 100) : 0;

    let status = "Not started";
    if (daysDone > 0) {
        status = completionRate >= 100 ? "Completed" :
                 completionRate >= 80 ? "Excellent" :
                 completionRate >= 50 ? "Good" :
                 completionRate > 0 ? "In Progress" : "Needs Work";
    }

    return {
        totalDays,
        daysDone,
        daysMissed,
        completionRate,
        streak,
        longestStreak,
        status
    };
}

export function updateStats() {
    const total = habits.length;
    const completed = habits.filter(h => calculateHabitStats(h).status === "Completed").length;
    const activeStreaks = habits.filter(h => calculateHabitStats(h).streak > 0).length;
  
    document.getElementById('total-habits').textContent = total;
    document.getElementById('completed-habits').textContent = completed;
    document.getElementById('active-streaks').textContent = activeStreaks;
}

export function checkForNewDay() {
    if (updateCurrentDateIfNeeded()) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDateStr = yesterday.toISOString().split('T')[0];

        habits.forEach(habit => {
            if (
                new Date(yDateStr) >= new Date(habit.startDate) &&
                new Date(yDateStr) <= new Date(habit.endDate) &&
                !habit.completedDays.includes(yDateStr) &&
                !habit.missedDays.includes(yDateStr)
            ) {
                habit.missedDays.push(yDateStr);
            }
        });
        setHabits(habits);
    }
}
export { getDaysArray, groupDaysByWeek };
