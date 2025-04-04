const numbersService = require("../services/numbersService");

class NumbersController {
  /**
   * Handle requests for /numbers/{numberid}
   */
  async getNumbers(req, res) {
    try {
      const { numberid } = req.params;
      const result = await numbersService.getNumbers(numberid);
      res.json(result);
    } catch (error) {
      console.error("Error processing numbers request:", error);

      if (error.message.includes("Invalid number type")) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new NumbersController();
