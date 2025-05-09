import {
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    calculateStreak,
  } from "../habitTracker";
  
  describe("Habit logic", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    // Add A Habit
    test("adds a habit correctly", () => {
      addHabit("Drink Water", "Stay hydrated", 7);
      const habits = JSON.parse(localStorage.getItem("habits"));
      expect(habits.length).toBe(1);
      expect(habits[0].name).toBe("Drink Water");


    });
    // Delete A Habit
    test("deletes a habit correctly", () => {
      addHabit("Drink Water", "Stay hydrated", 7);
      const habits = JSON.parse(localStorage.getItem("habits"))
      expect(habits.length).toBe(1);
  
      deleteHabit(habits[0].id);
      const habitsAfter = JSON.parse(localStorage.getItem("habits"));
      expect(habitsAfter.length).toEqual(0);
    });
  });

  describe('Streak Calculations', () => {
    test('calculates streaks correctly', () => {
      const habit = {
        completedDays: ['2025-05-06', '2025-05-07', '2025-05-08', '2025-05-09']
      };
      
      const result = calculateStreak(habit);
      expect(result.currentStreak).toBe(4); 
    });
  });  
  