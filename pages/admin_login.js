class LoginPage {

    constructor(page) {

        this.page = page
        this.username_textbox = page.getByTestId('username')
        this.password_textbox = page.getByTestId('password')
        this.login_button = page.getByTestId('submit')
        this.rooms_tab = page.getByRole('link', { name: 'Rooms' })
        this.logout_button = page.getByRole('link', { name: 'Logout' })
    }

    async gotoLoginPage(){
        await this.page.goto('https://automationintesting.online/#/admin');
    }

    async login(username, password){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }

    async logout(){
        await this.logout_button.click()
    }

}
module.exports = { LoginPage }