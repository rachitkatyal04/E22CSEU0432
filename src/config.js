module.exports = {
  PORT: process.env.PORT || 9876,
  WINDOW_SIZE: 10,
  REQUEST_TIMEOUT: 500, // milliseconds
  NUMBER_APIS: {
    p: "http://20.244.56.144/evaluation-service/primes",
    f: "http://20.244.56.144/evaluation-service/fibo",
    e: "http://20.244.56.144/evaluation-service/even",
    r: "http://20.244.56.144/evaluation-service/rand",
  },
};
