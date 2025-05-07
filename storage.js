let habits = JSON.parse(localStorage.getItem('habits')) || [];
let currentDate = new Date().toISOString().split('T')[0];
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}