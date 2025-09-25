// src/setupTests.js
import '@testing-library/jest-dom'; // Imports useful matchers like toBeInTheDocument()
import { server } from './mocks/server.js'; // Imports the MSW server instance

// Setup API mocking
beforeAll(() => server.listen()); // Start the mock server before all tests run
afterEach(() => server.resetHandlers()); // Reset handlers after each test for isolation
afterAll(() => server.close()); // Stop the mock server after all tests are done