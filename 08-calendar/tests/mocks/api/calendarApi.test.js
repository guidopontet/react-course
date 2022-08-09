import calendarApi from "../../../src/api/calendarApi";

describe('calendarApi', () => {
  test('should have default configuration', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  })

  test('should send x-token on every request', async () => {
    const token = 'ABC123';
    localStorage.setItem('token', token);

    const res = await calendarApi.get('/');

    expect(res.config.headers['x-token']).toBe(token);
  });
})
