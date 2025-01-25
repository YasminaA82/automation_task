class HomePage {

    constructor(page) {
        this.page = page;

        //hotel logo
        this.hotel_logo = page.getByRole('img', { name: 'Hotel logoUrl' })

        //hotel description
        this.hotel_description_text = page.locator('div.row.hotel-description p')

        //room listing
        this.main_page_title = page.locator('div.row.room-header')

        //client book room button
        this.book_button = page.getByRole('button', { name: 'Book this room' })

        //room booking form
        this.first_name = page.getByPlaceholder('Firstname')
        this.last_name = page.getByPlaceholder('Lastname')
        this.email = page.locator('input[name="email"]')
        this.phone = page.locator('input[name="phone"]')
        this.form_book_button = page.getByRole('button', { name: 'Book', exact: true })
        this.cancel_button = page.getByRole('button', { name: 'Cancel' })

        //contact form on home Page
        this.nameInput = page.getByTestId('ContactName')
        this.emailInput = page.getByTestId('ContactEmail')
        this.phoneInput = page.getByTestId('ContactPhone')
        this.subjectInput =page.getByTestId('ContactSubject')
        this.messageInput = page.getByTestId('ContactDescription')

        this.submitButton = page.getByRole('button', { name: 'Submit' })

        // Error messages
        this.error_blank_name = page.locator('div.alert.alert-danger:has-text("Name may not be blank")');
        this.error_blank_email = page.locator('div.alert.alert-danger:has-text("Email may not be blank")');
        this.error_blank_phone = page.locator('div.alert.alert-danger:has-text("Phone may not be blank")');
        this.error_blank_subject = page.locator('div.alert.alert-danger:has-text("Subject may not be blank")');
        this.error_blank_message = page.locator('div.alert.alert-danger:has-text("Message may not be blank")');
        this.error_subject_format = page.locator('div.alert.alert-danger:has-text("Subject must be between 5 and 100 characters")');
        this.error_message_format = page.locator('div.alert.alert-danger:has-text("Message must be between 20 and 2000 characters")');
        this.error_phone_format = page.locator('div.alert.alert-danger:has-text("Phone must be between 11 and 21 characters.")');

        this.error_missing_dates = page.locator('div.alert.alert-danger:has-text("must not be null")');
    }

    async gotoHomePage() {
        await this.page.goto('https://automationintesting.online/');
    }

    // Book a room
    async bookRoom(roomIndex) {
        const roomButton = this.book_button.nth(roomIndex);
        await roomButton.click();
    }

    //fill booking form
    async fillBookingForm({first_name, last_name, email, phone}) {
        await this.first_name.click();
        await this.first_name.fill(first_name);

        await this.last_name.click();
        await this.last_name.fill(last_name);

        await this.email.click();
        await this.email.fill(email);

        await this.phone.click();
        await this.phone.fill(phone);

        await this.book_button.click();

    }

    // Fill and submit the contact form
    async fillContactForm({ name, email, phone, subject, message }) {
        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.emailInput.click();
        await this.emailInput.fill(email);

        await this.phoneInput.click();
        await this.phoneInput.fill(phone);

        await this.subjectInput.click();
        await this.subjectInput.fill(subject);

        await this.messageInput.click();
        await this.messageTextarea.fill(message);

        await this.submitButton.click();
    }

}

module.exports = { HomePage }