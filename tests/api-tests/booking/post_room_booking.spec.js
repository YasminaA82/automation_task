import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');


test('POST BOOKING API Test', async ({ request }) => {
    // Resolve the absolute path of the JSON file
    const filePath = path.join(__dirname, 'room_request_body.json');
    console.log("file path:", filePath);
    const requestBody = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    //POST
    const response = await request.post('https://automationintesting.online/booking/', { data: requestBody })


    // Parse response body
    const responseBody = await response.text();
    console.log('Response:', responseBody);

    // Check status code
    expect(response.status()).toBe(201);

    // Validate response body
    expect(responseBody).toContain('bookingid');
    expect(responseBody).toContain('booking');
    expect(responseBody).toContain('bookingid');
    expect(responseBody).toContain('bookingid');
    expect(responseBody).toContain('roomid');
    expect(responseBody).toContain('firstname');
    expect(responseBody).toContain('lastname');
    expect(responseBody).toContain('depositpaid');
    expect(responseBody).toContain('bookingdates');
    expect(responseBody).toContain('checkin');
    expect(responseBody).toContain('checkout');

    console.log('Response:', responseBody);

});
