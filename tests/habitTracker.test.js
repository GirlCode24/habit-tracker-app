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
  // Streak Calcuations
  describe('Streak Calculations', () => {
    test('calculates streaks correctly', () => {
      const habit = {
        completedDays: ['2025-05-07', '2025-05-08', '2025-05-09', '2025-05-10']
      };
      
      const result = calculateStreak(habit.completedDays);
      expect(result).toBe(4); 
    });
  });  

  // Days/Habit Completion
  describe('Habit Completion', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    test('toggles habit completion correctly', () => {
      const habit = addHabit("Exercise", "Daily workout", 30);
      const habitId = habit.id;
  
      toggleHabitCompletion(habitId, "2025-05-10", true);
      const updatedHabit = JSON.parse(localStorage.getItem("habits")).find(h => h.id === habitId);
  
      expect(updatedHabit.completedDays).toContain("2025-05-10");
  
      toggleHabitCompletion(habitId, "2025-05-10", false);
      const updatedHabitAfterToggle = JSON.parse(localStorage.getItem("habits")).find(h => h.id === habitId);
  
      expect(updatedHabitAfterToggle.completedDays).not.toContain("2025-05-10");
    });
  });

  describe('LocalStorage read/write operations', () => {
    let setItemSpy;
    let getItemSpy;
  
    beforeEach(() => {
      localStorage.clear();
  
      // spy on setItem/getItem
      setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
      getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('addHabit writes a new habits array to localStorage', () => {
      addHabit('Drink Water', 'Stay hydrated', 7);
  
      //  fetch existing list
      expect(getItemSpy).toHaveBeenCalledWith('habits');
  
      // after adding, setItem should be called with the updated array
      const stored = JSON.parse(localStorage.getItem('habits'));
      expect(Array.isArray(stored)).toBe(true);
      expect(stored).toHaveLength(1);
      expect(stored[0]).toMatchObject({
        name: 'Drink Water',
        description: 'Stay hydrated',
        goal: 7,
        completedDays: []
      });
      expect(setItemSpy).toHaveBeenCalledWith('habits', JSON.stringify(stored));
    });

    test('deleteHabit removes a habit from localStorage', () => {
      addHabit('Drink Water', 'Stay hydrated', 7);
      const habits = JSON.parse(localStorage.getItem('habits'));
      const habitId = habits[0].id;
  
      deleteHabit(habitId);
  
      // after deleting, setItem should be called with the updated array
      const stored = JSON.parse(localStorage.getItem('habits'));
      expect(stored).toHaveLength(0);
      expect(setItemSpy).toHaveBeenCalledWith('habits', JSON.stringify(stored));
    });
  });
  