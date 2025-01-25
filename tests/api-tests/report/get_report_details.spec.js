import { test, expect } from '@playwright/test';

test('GET REPORT API Test', async ({ request }) => {
    const response = await request.get('https://automationintesting.online/report/');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.text();

    // Check that 'report' exists and is an array
    expect(responseBody).toContain('report');
    expect(Array.isArray(responseBody.report)).toBeTruthy();

    if ((responseBody.report.length) > 0) {
        // Validate each object in the report
        responseBody.report.forEach((item) => {
            expect(item).toContain('start');
            expect(item).toContain('end');
            expect(item).toContain('title');
        });
    } else {
        console.log('No bookings have been made');
    }

    console.log('Response:', responseBody);
});
