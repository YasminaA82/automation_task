import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');


test('PUT BRANDING API Test', async ({ request }) => {
    // Resolve the absolute path of the JSON file
    const filePath = path.join(__dirname, 'branding_request_body.json');
    console.log("file path:", filePath);
    const requestBody = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    //PUT
    const response = await request.put('https://automationintesting.online/branding/', {
        headers: {
            'x-auth-token': "add_token_here", //token is not explosed
            'Content-Type': 'application/json'
        },
        data: requestBody
    });

    // Parse response body
    const responseBody = await response.text();
    console.log('Response:', responseBody);

    // Check status code
    expect(response.status()).toBe(202);

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