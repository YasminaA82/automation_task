import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
const homePageData = require('../../tests-data/home_page_data.json');

test.describe('HomePage client Room Booking Tests', () => {

    test.beforeEach(async ({ page }) => {
        const HomeLanding = new HomePage(page);
        await HomeLanding.gotoHomePage();
        await page.waitForTimeout(1000);

    });

    test('Test Access to booking room works without filling the form', async ({ page }) => {
        const HomeLanding = new HomePage(page);

        //getting the number of available rooms to book
        const buttons = await HomeLanding.book_button
        const count = await buttons.count();

        if (count > 0) {
            // Choose randomly an index within the count range
            const indexToClick = Math.floor(Math.random() * count);
            console.log(`Clicking button at index ${indexToClick}`);

            // Click the selected button, do not fill the form
            await HomeLanding.bookRoom(indexToClick);

            //Cancel the booking without filling the form
            HomeLanding.cancel_button.click();


            // Click the selected button
            await HomeLanding.bookRoom(indexToClick);
        } else {
            console.log('No rooms found.');
        }
    });

    test('Test Access to booking room works with filling the form', async ({ page }) => {
        const HomeLanding = new HomePage(page);

        //getting the number of available rooms to book
        const buttons = await HomeLanding.book_button
        const count = await buttons.count();

        if (count > 0) {
            // Choose randomly an index within the count range
            const indexToClick = Math.floor(Math.random() * count);
            console.log(`Clicking button at index ${indexToClick}`);

            // Click the selected button
            await HomeLanding.bookRoom(indexToClick);
            //fill the form with valid booking details
            const bookingData = homePageData.ValidBookingDetails;
            await HomeLanding.fillBookingForm(bookingData.firstname, bookingData.lastname, bookingData.email, bookingData.phone);

            //Cancel the booking
            HomeLanding.cancel_button.click();

        } else {
            console.log('No rooms found.');
        }
    });

    test('Test booking room with Valid Submitted booking details', async ({ page }) => {
        const HomeLanding = new HomePage(page);

        //getting the number of available rooms to book
        const buttons = await HomeLanding.book_button
        const count = await buttons.count();

        if (count > 0) {
            // Choose randomly an index within the count range
            const indexToClick = Math.floor(Math.random() * count);
            console.log(`Clicking button at index ${indexToClick}`);

            // Click the selected button
            await HomeLanding.bookRoom(indexToClick);
            const bookingData = homePageData.ValidBookingDetails;
            await HomeLanding.fillBookingForm(bookingData.firstname, bookingData.lastname, bookingData.email, bookingData.phone);

            //there is a bug, where we cannot select desired dates
            //which leads to a bad request 
            //error message
            await expect(HomeLanding.error_missing_dates).toBeVisible();


        } else {
            console.log('No rooms found.');
        }

    });

    test('Test Submit Valid Contact Form', async ({ page }) => {
        const HomeLanding = new HomePage(page);
        const contactData = homePageData.validContactDetails;
        await HomeLanding.fillContactForm(contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message);
        await page.waitForTimeout(1000);

    });

    test('Test Submit Empty Name', async ({ page }) => {
        const HomeLanding = new HomePage(page);
        const contactData = homePageData.EmptyName;
        await HomeLanding.fillContactForm(contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message);
        await page.waitForTimeout(1000);
        //assert error message
        await expect(HomeLanding.error_blank_name).toBeVisible();

    });
    test('Test Submit Empty Subject', async ({ page }) => {
        const HomeLanding = new HomePage(page);
        const contactData = homePageData.EmptySubject;
        await HomeLanding.fillContactForm(contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message);
        await page.waitForTimeout(1000);
        //assert error message
        await expect(HomeLanding.error_blank_subject).toBeVisible();

    });
    test('Test Submit Empty Message', async ({ page }) => {
        const HomeLanding = new HomePage(page);
        const contactData = homePageData.EmptyMessage;
        await HomeLanding.fillContactForm(contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message);
        await page.waitForTimeout(1000);
        //assert error message
        await expect(HomeLanding.error_blank_message).toBeVisible();

    });
    test('Test Submit Incorrect Phone Number', async ({ page }) => {
        const HomeLanding = new HomePage(page);
        const contactData = homePageData.IncorrectPhoneNumber;
        await HomeLanding.fillContactForm(contactData.name, contactData.email, contactData.phone, contactData.subject, contactData.message);
        await page.waitForTimeout(1000);
        //assert error message
        await expect(HomeLanding.error_phone_format).toBeVisible();
    });
});