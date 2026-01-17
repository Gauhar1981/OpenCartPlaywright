import{ Page, expect, Locator} from "@playwright/test";

import{ HomePage } from "./HomePage"

export class LogoutPage
{
  private readonly page:Page;
  private readonly btnContinue:Locator;
  private readonly logoutMsg:Locator;

constructor(page:Page)
{
    this.page=page;
    this.btnContinue=page.locator(".btn.btn-primary");
    this.logoutMsg=page.locator('h1:has-text("Account Logout")');
}

async clickContinue():Promise<HomePage>
{
    await this.btnContinue.click();
    return new HomePage(this.page);
}

async verifylogoutMessage():Promise<boolean>
{
    return await this.logoutMsg.isVisible();
}





  

}
