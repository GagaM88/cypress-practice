const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    viewportHeight: 800,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
    },
  },
});
