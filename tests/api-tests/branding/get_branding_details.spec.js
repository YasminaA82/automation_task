import { test, expect } from '@playwright/test';
import exp from 'constants';

test('GET BRANDING API Test', async ({ request }) => {
    const response = await request.get('https://automationintesting.online/branding/');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.text();

    // Validate response body
    expect(responseBody).toContain('name');
    expect(responseBody).toContain('map');
    expect(responseBody).toContain('latitude');
    expect(responseBody).toContain('longitude');
    expect(responseBody).toContain('logoUrl');
    expect(responseBody).toContain('description');
    expect(responseBody).toContain('contact');
    expect(responseBody).toContain('name');
    expect(responseBody).toContain('address');
    expect(responseBody).toContain('phone');
    expect(responseBody).toContain('email');

    console.log('Response:', responseBody);
});

