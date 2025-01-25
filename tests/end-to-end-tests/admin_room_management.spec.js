import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/admin_login';
import { AdminRooms } from '../../pages/admin_rooms';
const roomOptions = require('../../tests-data/add_room_options_data.json');
const editRoomOptions = require('../../tests-data/edit_room_options_data.json');
const cancelEditRoomOptions = require('../../tests-data/cancel_room_data.json');
const adminLoginData = require('../../tests-data/admin_login_data.json');

test.describe('Admin Room Management Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Log in as admin before each test
        const Login = new LoginPage(page);
        const validCrendentials = adminLoginData.validAdminLogin;
        await Login.gotoLoginPage()
        await Login.login(validCrendentials.username, validCrendentials.password)
    });

    roomOptions.forEach(({ roomName, type, price, accessible, features }) => {
        test(`Add a new room: ${roomName}`, async ({ page }) => {
            const Rooms = new AdminRooms(page);

            await Rooms.room_name.click();
            await page.waitForTimeout(1000);
            await Rooms.addRoom(roomName, type, price, accessible, features);
            await page.waitForTimeout(1000);

            //assert room is added
            await expect(Rooms.room_name).toBeVisible();

            // Assert options selected are added
            if (features.includes('WiFi')) await expect(Rooms.room_wifi).toBeChecked();
            if (features.includes('Refreshments')) await expect(Rooms.room_refreshments).toBeChecked();
            if (features.includes('TV')) await expect(Rooms.room_tv).toBeChecked();
            if (features.includes('Safe')) await expect(Rooms.room_safe).toBeChecked();
            if (features.includes('Radio')) await expect(Rooms.room_radio).toBeChecked();
            if (features.includes('Views')) await expect(Rooms.room_views).toBeChecked();
        });
    });

    editRoomOptions.forEach(({ originalRoomName, updatedRoomName, type, updatedType, price, updatedPrice, accessible, updatedAccessible, features, updatedFeatures, description, image }) => {
        test(`Edit a room: ${originalRoomName}`, async ({ page }) => {
            const Rooms = new AdminRooms(page);
            await Rooms.addRoom(originalRoomName, type, price, accessible, features);
            await page.waitForTimeout(1000);
            await Rooms.editRoom(originalRoomName, updatedRoomName, updatedType, updatedPrice, updatedAccessible, updatedFeatures, description, image);
            await page.waitForTimeout(1000);
            //Assert the updated price
            await expect(Rooms.room_price).toHaveValue(updatedPrice);

            // Assert the updated description
            await expect(Rooms.room_description).toHaveValue(description);

            // Assert the updated image URL
            await expect(Rooms.room_image_url).toHaveValue(image);

            await Rooms.updateRoom();

        });
    });

    test('Cancel edit a room', async ({ page }) => {
        const Rooms = new AdminRooms(page);
        await Rooms.addRoom(cancelEditRoomOptions[0].originalRoomName, cancelEditRoomOptions[0].type, cancelEditRoomOptions[0].price, cancelEditRoomOptions[0].accessible, cancelEditRoomOptions[0].features);
        await page.waitForTimeout(1000);
        await Rooms.editRoom(cancelEditRoomOptions[0].originalRoomName, cancelEditRoomOptions[0].updatedRoomName, cancelEditRoomOptions[0].updatedType, cancelEditRoomOptions[0].updatedPrice, cancelEditRoomOptions[0].updatedAccessible, cancelEditRoomOptions[0].updatedFeatures, cancelEditRoomOptions[0].description, cancelEditRoomOptions[0].image);
        await Rooms.cancelEdit();

        //Assert the room is not updated
        await expect(Rooms.room_edit).toBeVisible();
    });

    test('Delete a room', async ({ page }) => {
        const Rooms = new AdminRooms(page);
        const roomToDelete = cancelEditRoomOptions[1];
        await page.waitForTimeout(1000);
        await Rooms.addRoom(roomToDelete.originalRoomName, roomToDelete.type, roomToDelete.price, roomToDelete.accessible, roomToDelete.features);
        await page.waitForTimeout(1000);
        await Rooms.deleteRoom(roomToDelete.originalRoomName);

        // Assert the room is deleted
        await expect(page.locator(`text=${roomToDelete.originalRoomName}`)).not.toBeVisible();
    });
});