const axios = require("axios");

class NumbersService {
  constructor() {
    // Using the provided credentials
    this.clientID = "3a6def47-1d61-4e73-8dbd-4d435b4bb828";
    this.clientSecret = "kFKDCaNBrGPNkrbH";
    this.accessCode = "rtCHZJ";
    this.email = "e22cseu0432@bennett.edu.in";
    this.name = "rachit katyal";
    this.rollNo = "e22cseu0432";
    this.baseUrl = "http://20.244.56.144";
    this.authToken = null;
  }

  async getNumbers(numbers) {
    try {
      // Try to authenticate first
      await this.authenticate();

      if (!this.authToken) {
        throw new Error("Failed to obtain authentication token");
      }

      // Use token for API call
      const response = await axios.get(
        `${this.baseUrl}/evaluation-service/even`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
          timeout: 5000,
        }
      );

      console.log("External API response:", response.data);

      return {
        externalData: response.data,
        numbers,
        average: this.calculateAverage(numbers),
        max: this.findMax(numbers),
        min: this.findMin(numbers),
        source: "api",
      };
    } catch (error) {
      console.error(`Error calling API: ${error.message}`);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      // Fall back to local calculation
      return {
        numbers,
        average: this.calculateAverage(numbers),
        max: this.findMax(numbers),
        min: this.findMin(numbers),
        source: "local",
        error: `API Error: ${error.message}`,
      };
    }
  }

  async authenticate() {
    try {
      console.log("Attempting authentication with complete information...");

      const authData = {
        clientID: this.clientID,
        clientSecret: this.clientSecret,
        email: this.email,
        name: this.name,
        rollNo: this.rollNo,
        accessCode: this.accessCode,
      };

      console.log("Auth data:", authData);

      const response = await axios.post(
        `${this.baseUrl}/evaluation-service/auth`,
        authData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Authentication response:", response.data);

      // Check for access_token instead of token
      if (response.data && response.data.access_token) {
        this.authToken = response.data.access_token;
        console.log("Successfully obtained access token!");
        return;
      } else {
        throw new Error("No access token in authentication response");
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      throw error;
    }
  }

  // Calculation methods remain the same
  calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return 0;
    }

    const sum = numbers.reduce((total, num) => total + parseFloat(num), 0);
    return sum / numbers.length;
  }

  findMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return null;
    }

    return Math.max(...numbers.map((num) => parseFloat(num)));
  }

  findMin(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return null;
    }

    return Math.min(...numbers.map((num) => parseFloat(num)));
  }
}

module.exports = new NumbersService();
