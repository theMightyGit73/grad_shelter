// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup a request mocking server using the handlers defined above
export const server = setupServer(...handlers);