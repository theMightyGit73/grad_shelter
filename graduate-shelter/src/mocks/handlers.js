// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

// Define the mock data for residents
const mockResidents = [
  { id: 1, name: 'Test David', age: 25, type: 'Masters', mood: 'Ready', available: true },
  { id: 2, name: 'Test Sean', age: 22, type: 'PhD', mood: 'Defended', available: false },
];

export const handlers = [
  // Mock GET request to fetch ALL residents
  http.get('http://localhost:8080/api/residents', () => {
    return HttpResponse.json(mockResidents);
  }),

  // Mock GET request for a specific resident (used by ResidentDetails)
  http.get('http://localhost:8080/api/residents/:id', ({ params }) => {
    const { id } = params;
    const resident = mockResidents.find(r => r.id === Number(id));
    
    // Return the resident or a 404 error if not found
    return resident ? HttpResponse.json(resident) : new HttpResponse(null, { status: 404 });
  }),
];