import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/admin_login';
import { BrandingPage } from '../../pages/admin_branding';
const brandingData = require('../../tests-data/admin_branding_test_data.json');
const adminLoginData = require('../../tests-data/admin_login_data.json');

test.describe('Admin Brand Management Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Log in as admin before each test
        const Login = new LoginPage(page);
        const validCrendentials = adminLoginData.validAdminLogin;
        await Login.gotoLoginPage()
        await Login.login(validCrendentials.username, validCrendentials.password)
        //go to branding page
        const Branding = new BrandingPage(page);
        await Branding.gotoBrandingPage();
        await page.waitForTimeout(1000);
    });


    test('Submit branding form with valid data', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const validData = brandingData.validData;

        // Fill in the form using data from JSON
        await Branding.fillBrandingForm(validData.hotelName, validData.hotelLogo, validData.hotelDescription, validData.latitude, validData.longitude, validData.contactName, validData.address, validData.phone, validData.email);
        await page.waitForTimeout(1000);

        // Wait for the success message to appear
        await expect(Branding.success_popup).toBeVisible();

        // Assert the success message content
        const successMessage = await Branding.success_popup.textContent();
        expect(successMessage).toContain('Branding updated!');

        // Close success popup
        await Branding.closeSuccessPopup();
    });

    test('Validate missing hotel name', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const invalidData = brandingData.incorrectData.missingHotelName;

        // Fill in the form with missing hotel name

        await Branding.fillBrandingForm(invalidData.hotelName, invalidData.hotelLogo, invalidData.hotelDescription, invalidData.latitude, invalidData.longitude, invalidData.contactName, invalidData.address, invalidData.phone, invalidData.email);
    
        // Verify error message for missing hotel name
        await expect(Branding.error_blank_name).toBeVisible();
        await expect(Branding.error_size_name).toBeVisible();

    });

    test('Validate invalid phone number', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const invalidData = brandingData.incorrectData.invalidPhone;

        // Fill in the form with invalid phone data
        await Branding.fillBrandingForm(invalidData.hotelName, invalidData.hotelLogo, invalidData.hotelDescription, invalidData.latitude, invalidData.longitude, invalidData.contactName, invalidData.address, invalidData.phone, invalidData.email);

        // Verify error message for invalid phone number
        await expect(Branding.error_size_phone).toBeVisible();
    });

    test('Validate invalid email address', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const invalidData = brandingData.incorrectData.invalidEmail;

        // Fill in the form with invalid email data
        await Branding.fillBrandingForm(invalidData.hotelName, invalidData.hotelLogo, invalidData.hotelDescription, invalidData.latitude, invalidData.longitude, invalidData.contactName, invalidData.address, invalidData.phone, invalidData.email);

        // Verify error message for invalid email address
        await expect(Branding.error_email_format).toBeVisible();
    });

    test('Edge case: long strings in branding form', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const edgeCaseData = brandingData.edgeCases.longStrings;

        // Fill in the form with long string data
        await Branding.fillBrandingForm(edgeCaseData.hotelName, edgeCaseData.hotelLogo, edgeCaseData.hotelDescription, edgeCaseData.latitude, edgeCaseData.longitude, edgeCaseData.contactName, edgeCaseData.address, edgeCaseData.phone, edgeCaseData.email);
        
        // Verify error message for long strings
        //phone size must be equak or greater than 11
        await expect(Branding.error_size_phone).toBeVisible();

        //name size must be between 3 and 100
        await expect(Branding.error_size_name).toBeVisible();

        //description size must be between 3 and 500
        await expect(Branding.error_size_description).toBeVisible();

        //address size must be between 3 and 40
        await expect(Branding.error_size_address).toBeVisible();

        //contact name size must be between 3 and 100
        await expect(Branding.error_size_contact_name).toBeVisible();

    });

    test('Edge case: minimalData in branding form', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const edgeCaseData = brandingData.edgeCases.minimalData;

        // Fill in the form with special characters
        await Branding.fillBrandingForm(edgeCaseData.hotelName, edgeCaseData.hotelLogo, edgeCaseData.hotelDescription, edgeCaseData.latitude, edgeCaseData.longitude, edgeCaseData.contactName, edgeCaseData.address, edgeCaseData.phone, edgeCaseData.email);
        
        // Verify error message for short strings
        //phone size must be equak or greater than 11
        await expect(Branding.error_size_phone).toBeVisible();

        //name size must be between 3 and 100
        await expect(Branding.error_size_name).toBeVisible();

        //description size must be between 3 and 500
        await expect(Branding.error_size_description).toBeVisible();

        //address size must be between 3 and 40
        await expect(Branding.error_size_address).toBeVisible();

        //contact name size must be between 3 and 100
        await expect(Branding.error_size_contact_name).toBeVisible();

    });

    test('Edge case:Submit all fields Empty', async ({ page }) => {
        const Branding = new BrandingPage(page);
        const edgeCaseData = brandingData.edgeCases.allEmpty;

        // Fill in the form with special characters
        await Branding.fillBrandingForm(edgeCaseData.hotelName, edgeCaseData.hotelLogo, edgeCaseData.hotelDescription, edgeCaseData.latitude, edgeCaseData.longitude, edgeCaseData.contactName, edgeCaseData.address, edgeCaseData.phone, edgeCaseData.email);
        
        // Verify error message for empty fields
        //phone size must be equak or greater than 11
        await expect(Branding.error_size_phone).toBeVisible();

        //name size must be between 3 and 100
        await expect(Branding.error_size_name).toBeVisible();

        //description size must be between 3 and 500
        await expect(Branding.error_size_description).toBeVisible();

        //address size must be between 3 and 40
        await expect(Branding.error_size_address).toBeVisible();

        //contact name size must be between 3 and 100
        await expect(Branding.error_size_contact_name).toBeVisible();

        //Name should not be blank
        await expect(Branding.error_blank_name).toBeVisible();

        //logo url should not be blank
        await expect(Branding.error_blank_logo).toBeVisible();

        //Email should not be blank
        await expect(Branding.error_blank_email).toBeVisible();

        //Phone should not be blank
        await expect(Branding.error_blank_phone).toBeVisible();

        //Address should not be blank
        await expect(Branding.error_blank_address).toBeVisible();

        //Contact Name should not be blank
        await expect(Branding.error_blank_contact_name).toBeVisible();

        //Description should not be blank
        await expect(Branding.error_blank_description).toBeVisible();

    });
});

