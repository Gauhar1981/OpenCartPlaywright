import{test,expect} from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { RegistrationPage } from "../Pages/RegistrationPage"
import { RandomDataUtil } from "../Utils/randomDataGenerator"
import { TestConfig } from "../test.config"
import { LoginPage } from "../Pages/LoginPage"
import { MyAccountPage } from "../Pages/MyAccountPage"

let config : TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let myaccountpage:MyAccountPage;

test.beforeEach(async({page})=>
{
   config=new TestConfig();     //create object of TestConfig class to get app urlk
   await page.goto(config.appUrl);     //navigate to application

   //Initialize Page objects
  
   homepage=new HomePage(page);
   loginpage=new LoginPage(page);
   myaccountpage=new MyAccountPage(page);
});

//optional cleanup after each test
test.afterEach(async({page})=>
{
    await page.waitForTimeout(3000);
  await page.close();
});

test("User Login Test  @master @sanity @regression", async()=>
{
  await homepage.clickMyAccount();
  await homepage.clickLogin();

  //Enter credentials

  await loginpage.setEmailAddress(config.email);
  await loginpage.setPassword(config.password);
  await loginpage.clickLoginButton();

  //alternatively

  //await loginpage.login(config.email,config.password);

  const isLoggedIn=await myaccountpage.isMyAccoutnPageExists();
  expect(isLoggedIn).toBeTruthy();

})
