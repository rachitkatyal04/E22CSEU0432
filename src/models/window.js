const config = require("../config");

class NumberWindow {
  constructor(size = config.WINDOW_SIZE) {
    this.size = size;
    this.numbers = [];
  }

  /**
   * Add unique numbers to the window, maintaining the size constraint
   * @param {Array<number>} newNumbers - Array of numbers to add
   * @returns {Object} Previous and current window state
   */
  addNumbers(newNumbers) {
    const prevState = [...this.numbers];

    // Filter out duplicates
    const uniqueNewNumbers = newNumbers.filter(
      (num) => !this.numbers.includes(num)
    );

    // Update the window
    if (this.numbers.length + uniqueNewNumbers.length <= this.size) {
      // Window isn't full yet, add all unique numbers
      this.numbers = [...this.numbers, ...uniqueNewNumbers];
    } else {
      // Window will overflow, replace oldest numbers with newest ones
      const keepCount = Math.max(0, this.size - uniqueNewNumbers.length);
      this.numbers = [
        ...this.numbers.slice(this.numbers.length - keepCount),
        ...uniqueNewNumbers.slice(0, this.size - keepCount),
      ];
    }

    return {
      windowPrevState: prevState,
      windowCurrState: [...this.numbers],
    };
  }

  /**
   * Calculate the average of numbers in the window
   * @returns {number} The calculated average, or 0 if window is empty
   */
  calculateAverage() {
    if (this.numbers.length === 0) return 0;

    const sum = this.numbers.reduce((acc, num) => acc + num, 0);
    return sum / this.numbers.length;
  }
}

module.exports = NumberWindow;
