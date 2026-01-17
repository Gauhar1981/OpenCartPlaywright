import{ Page, expect, Locator} from "@playwright/test";

export class LoginPage
{

 private readonly page:Page;
 private readonly txtemail:Locator;
 private readonly txtpassword:Locator;
 private readonly loginbtn:Locator;
 private readonly errorMessage:Locator;

 constructor(page:Page)
 {
    this.page=page;
    this.txtemail=page.locator('#input-email');
    this.txtpassword=page.getByRole('textbox', { name: 'Password' });
    this.loginbtn=page.locator('input[type="submit"]');
    this.errorMessage=page.locator('div.alert.alert-danger.alert-dismissible');
 }

 async setEmailAddress(email:string)
 {
    await this.txtemail.fill(email);
 }

  async setPassword(pwd:string)
 {
    await this.txtpassword.fill(pwd);
    
 }

 async clickLoginButton()
 {
   await this.loginbtn.click();
 }

 async login(email:string,pwd:string)
 {
    await this.setEmailAddress(email);
    await this.setPassword(pwd);
    await this.clickLoginButton();
 }

async loginerrorMeesage():Promise<null | string>
{
  return (this.errorMessage.textContent());
}




}