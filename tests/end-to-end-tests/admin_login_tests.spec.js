import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/admin_login';
const adminLoginData = require('../../tests-data/admin_login_data.json');

test.describe('Admin Login Tests', () => {
    test(`Login with valid credentials`, async ({ page }) => {
      const Login = new LoginPage(page)
      const validCrendentials = adminLoginData.validAdminLogin;

      await Login.gotoLoginPage()
      await Login.login(validCrendentials.username, validCrendentials.password)
      
      // Check admin panel is visible
      await expect(Login.rooms_tab).toBeVisible();
    });

    test(`Login with invalid credentials`, async ({ page }) => {
      const Login = new LoginPage(page)
      const invalidCrendentials = adminLoginData.invalidAdminLogin;

      await Login.gotoLoginPage()
      await Login.login(invalidCrendentials.username, invalidCrendentials.password)
      //check admin panel is not visible
      await expect(Login.rooms_tab).toBeHidden();
    })
  });