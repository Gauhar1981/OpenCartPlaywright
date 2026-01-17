import{test,expect} from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { RegistrationPage } from "../Pages/RegistrationPage"
import { RandomDataUtil } from "../Utils/randomDataGenerator"
import { TestConfig } from "../test.config"

let homepage:HomePage;
let registrationpage:RegistrationPage;


test.beforeEach(async({page})=>
{
 const config=new TestConfig();     //create object of TestConfig class to get app urlk
 await page.goto(config.appUrl);     //navigate to application

 homepage=new HomePage(page);
 
 registrationpage=new RegistrationPage(page);
})

test.afterEach(async({page})=>
{
    await page.waitForTimeout(3000);
  await page.close();
})


test("account registraion test @master @sanity @regression",async({})=>
{
    //verify if page exist
  const exist=await homepage.isPageExist();

 expect(exist).toBe(true)

//goto to home page and click my account and then registeration link
  await homepage.clickMyAccount();
  await homepage.clickRegisterLink();

//fill registration details with random data
await registrationpage.enterFirstName(RandomDataUtil.getFirstName());
await registrationpage.enterLastName(RandomDataUtil.getLastName());
await registrationpage.enterEmail(RandomDataUtil.getEmail());
await registrationpage.enterTelephone(RandomDataUtil.getPhoneNumber());
const paswd=RandomDataUtil.getRandomPassword();
await registrationpage.enterPassword(paswd);
await registrationpage.enterConfirmPassword(paswd);
await registrationpage.checkPrivacyPolicy();
await registrationpage.clickContinue();

//validate confirmation message

const confirmationmsg=await registrationpage.getConfirmation();
expect(confirmationmsg).toContain("Your Account Has Been Created!");

})

