class BrandingPage {

    constructor(page) {

        this.page = page
        this.hotel_name = page.getByPlaceholder("Enter B&B name")
        this.hotel_logo = page.getByPlaceholder('Enter image url')
        this.hotel_description = page.locator('textarea.form-control#description')
        this.latitude = page.getByPlaceholder('Enter Latitude')
        this.longitude = page.getByPlaceholder('Enter Longitude')
        this.contact_name = page.getByPlaceholder('Enter Contact Name')
        this.address = page.getByPlaceholder('Enter Address')
        this.phone = page.getByPlaceholder('Enter Phone Number')
        this.email = page.getByPlaceholder('Enter Email Address')
        this.submit_button = page.locator('button:has-text("Submit")')
        this.success_popup = page.getByText('Branding updated!')
        this.close_success_popup = page.getByRole('button', { name: 'Close' })
        // Error messages
        this.error_blank_name = page.locator('div.alert.alert-danger:has-text("Name should not be blank")');
        this.error_size_name = page.locator('div.alert.alert-danger:has-text("Size must be between 3 and 100")');
        this.error_size_phone = page.locator('div.alert.alert-danger:has-text("must be greater than or equal to 11")');
        this.error_size_description = page.locator('div.alert.alert-danger:has-text("size must be between 3 and 500")');
        this.error_size_address = page.locator('div.alert.alert-danger:has-text("size must be between 10 and 200")');
        this.error_size_contact_name = page.locator('div.alert.alert-danger:has-text("size must be between 3 and 100")');
        this.error_blank_logo = page.locator('div.alert.alert-danger:has-text("Url should not be blank")');
        this.error_blank_email = page.locator('div.alert.alert-danger:has-text("Email should not be blank")');
        this.error_email_format = page.locator('div.alert.alert-danger:has-text("Email should be a valid email format")');
        this.error_blank_phone = page.locator('div.alert.alert-danger:has-text("Phone should not be blank")');
        this.error_blank_address = page.locator('div.alert.alert-danger:has-text("Address should not be blank")');
        this.error_blank_contact_name = page.locator('div.alert.alert-danger:has-text("Contact Name should not be blank")');
        this.error_blank_description = page.locator('div.alert.alert-danger:has-text("Description should not be blank")');
    }


    async gotoBrandingPage() {
        await this.page.goto('https://automationintesting.online/#/admin/branding');
    }

    async fillBrandingForm(hotelName, hotelLogo, hotelDescription, latitude, longitude, contactName, address, phone, email) {
        await this.hotel_name.click();
        await this.hotel_name.clear();
        await this.hotel_name.fill(hotelName)

        await this.hotel_logo.click();
        await this.hotel_logo.clear();
        await this.hotel_logo.fill(hotelLogo)

        await this.hotel_description.click();
        await this.hotel_description.clear();
        await this.hotel_description.fill(hotelDescription)

        await this.latitude.click();
        await this.latitude.clear();
        await this.latitude.fill(latitude)

        await this.longitude.click();
        await this.longitude.clear();
        await this.longitude.fill(longitude)

        await this.contact_name.click();
        await this.contact_name.clear();
        await this.contact_name.fill(contactName)

        await this.address.click();
        await this.address.clear();
        await this.address.fill(address)

        await this.phone.click();
        await this.phone.clear();
        await this.phone.fill(phone)

        await this.email.click();
        await this.email.clear();
        await this.email.fill(email)

        await this.submit_button.click()
    }

    async closeSuccessPopup() {
        await this.close_success_popup.click()
    }


}

module.exports = { BrandingPage }