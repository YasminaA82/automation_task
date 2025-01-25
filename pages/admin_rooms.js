class AdminRooms {

    constructor(page) {

        this.page = page
        this.rooms_tab = page.getByRole('link', { name: 'Rooms' })
        this.room_name = page.getByTestId('roomName')
        this.room_new_name = page.locator('#roomName')
        this.room_type = page.locator('#type')
        this.room_new_type = page.getByLabel('Type:')
        this.room_price = page.locator('#roomPrice')
        this.room_new_price = page.getByLabel('Room price:')
        this.room_accessible = page.locator('#accessible')
        this.room_new_accessible = page.locator('#accessible')
        this.room_wifi = page.getByLabel('WiFi')
        this.room_refreshments = page.getByLabel('Refreshments')
        this.room_tv = page.getByLabel('TV')
        this.room_safe = page.getByLabel('Safe')
        this.room_radio = page.getByLabel('Radio')
        this.room_views = page.getByLabel('Views')
        this.create_button = page.getByRole('button', { name: 'Create' })
        this.update_button = page.getByRole('button', { name: 'Update' })
        this.room_edit = page.getByRole('button', { name: 'Edit' })
        this.room_cancel_edit = page.getByRole('button', { name: 'Cancel' })
        this.room_delete = page.locator('span.fa.fa-remove.roomDelete')
        this.room_description = page.getByLabel('Description')
        this.room_image_url = page.getByLabel('image');
    }
    async addRoom(roomName, roomType, roomPrice, isAccessible, options = []) {
        await this.room_name.fill(roomName)
        await this.room_type.selectOption(roomType)
        await this.room_price.fill(roomPrice)
        await this.room_accessible.selectOption(isAccessible)

        if (options.includes('WiFi')) await this.room_wifi.check()
        if (options.includes('Refreshments')) await this.room_refreshments.check()
        if (options.includes('TV')) await this.room_tv.check()
        if (options.includes('Safe')) await this.room_safe.check()
        if (options.includes('Radio')) await this.room_radio.check()
        if (options.includes('Views')) await this.room_views.check()


        await this.create_button.click()
    }

    async editRoom(roomName, newRoomName, newRoomType, newRoomPrice, newAccessible, options = [], description = '', imageUrl = '') {
        await this.page.click(`text=${roomName}`);
        await this.page.waitForTimeout(1000);
        await this.room_edit.click();
        await this.room_new_name.clear();
        await this.room_new_name.fill(newRoomName);
        await this.room_new_type.selectOption(newRoomType);
        await this.room_new_price.fill(newRoomPrice);
        await this.room_new_accessible.selectOption(newAccessible);

        if (options.includes('WiFi')) await this.room_wifi.check()
        if (options.includes('Refreshments')) await this.room_refreshments.check()
        if (options.includes('TV')) await this.room_tv.check()
        if (options.includes('Safe')) await this.room_safe.check()
        if (options.includes('Radio')) await this.room_radio.check()
        if (options.includes('Views')) await this.room_views.check()

        await this.room_description.clear()
        await this.room_description.fill(description)
        await this.room_image_url.clear()
        await this.room_image_url.fill(imageUrl);
    }

    async updateRoom() {
        await this.update_button.click()
    }

    async cancelEdit(roomName) {
        await this.page.waitForTimeout(1000);
        await this.room_cancel_edit.click()
    }

    async deleteRoom(roomName) {
        await this.page.waitForTimeout(1000);
        const roomSelector = await this.page.locator(`div[data-testid="roomlisting"]:has(p:has-text("${roomName}"))`);
        //change to use room_delete locator
        await roomSelector.locator('span.fa.fa-remove.roomDelete').click();
        await this.page.waitForTimeout(1000);
    } 
}

module.exports = { AdminRooms }