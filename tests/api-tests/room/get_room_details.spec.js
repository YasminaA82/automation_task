import { test, expect } from '@playwright/test';

test('GET ROOM API Test', async ({ request }) => {
    const response = await request.get('https://automationintesting.online/room/1');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.text();

    // Validate response body
    expect(responseBody).toContain('roomid');
    expect(responseBody).toContain('roomName');
    expect(responseBody).toContain('type');
    expect(responseBody).toContain('accessible');
    expect(responseBody).toContain('image');
    expect(responseBody).toContain('description');
    expect(responseBody).toContain('features');
    expect(responseBody).toContain('roomPrice');

    console.log('Response:', responseBody);
});
