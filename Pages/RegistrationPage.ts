import{ Page, expect, Locator} from "@playwright/test";

export class RegistrationPage
{
    private readonly page:Page;
 //locators

 private readonly txtfirsName:Locator;
 private readonly txtlastName:Locator;
 private readonly txtEmail:Locator;
 private readonly txtTelephone:Locator;
 private readonly txtPassword:Locator;
 private readonly txtconfirmPassword:Locator;
 private readonly chkdPolicy:Locator;
 private readonly btnContinue:Locator;
 private readonly msgConfirmation:Locator;


 //constructor
 constructor(page:Page)
 {
    this.page=page;
    this.txtfirsName=page.getByRole('textbox', { name: 'First Name' });
    this.txtlastName=page.getByRole('textbox', { name: 'Last Name' });
    this.txtEmail=page.getByRole('textbox', { name: 'E-Mail' });
    this.txtTelephone=page.locator('#input-telephone');
    this.txtPassword=page.locator("#input-password");
    this.txtconfirmPassword=page.locator('#input-confirm');
    this.chkdPolicy=page.locator('[name="agree"]');
    this.btnContinue=page.locator('input[type="submit"]');
    this.msgConfirmation=page.locator('h1:has-text("Your Account Has Been Created!")');

 }

async enterFirstName(fName:string):Promise<void>
{
    await this.txtfirsName.fill(fName);   //enter first name
}

async enterLastName(lName:string):Promise<void>
{
    await this.txtlastName.fill(lName);   //enter last name
}

async enterEmail(email:string):Promise<void>
{
    await this.txtEmail.fill(email);   //enter email
}

async enterTelephone(phone:string):Promise<void>
{
    await this.txtTelephone.fill(phone);   //enter telephone
}

async enterPassword(pwd:string):Promise<void>
{
    await this.txtPassword.fill(pwd);   //enter password
}

async enterConfirmPassword(cPwd:string):Promise<void>
{
    await this.txtconfirmPassword.fill(cPwd);   //enter confirm password
}

async checkPrivacyPolicy():Promise<void>
{
    await this.chkdPolicy.click();   //check Pricy Policy
}

async clickContinue():Promise<void>
{
    await this.btnContinue.click();   //click continue button
}

async getConfirmation():Promise<string>
{
  return await this.msgConfirmation.textContent() ?? '';
}

async completRegistration(userData:{firstName:string,lastName:string,email:string,telephone:string,password:string}):Promise<void>
{
    await this.enterFirstName(userData.firstName);
    await this.enterLastName(userData.lastName);
    await this.enterEmail(userData.email);
    await this.enterTelephone(userData.telephone);
    await this.enterPassword(userData.password);
    await this.enterConfirmPassword(userData.password);
    await this.checkPrivacyPolicy();
    await this.clickContinue();
    await expect(this.msgConfirmation).toBeVisible();

}





}