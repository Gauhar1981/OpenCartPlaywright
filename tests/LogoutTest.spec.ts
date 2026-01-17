import{test,expect} from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { LogoutPage } from "../Pages/LogoutPage"
import { TestConfig } from "../test.config"
import { LoginPage } from "../Pages/LoginPage"
import { MyAccountPage } from "../Pages/MyAccountPage"

//Declare shared variables

let config : TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let myaccountpage:MyAccountPage;
let logoutpage:LogoutPage;



//setup before each test

test.beforeEach(async({page})=>
{
    config=new TestConfig();
    await page.goto(config.appUrl);

    //Initialize page objects

    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    myaccountpage=new MyAccountPage(page);
    logoutpage=new LogoutPage(page);
});

//optiona cleanup after each test
test.afterEach(async({page})=>
{
 await page.close();
});

test("User Loout test @master @regression",async()=>
{
    //my account and login link click
  await homepage.clickMyAccount();
  await homepage.clickLogin();

  //login with valid credentials
  await loginpage.login(config.email,config.password);

// verify successfull login
 expect(await myaccountpage.isMyAccoutnPageExists()).toBeTruthy();

//click logout, which rerturn logout page instace and verify logout message displayed

logoutpage=await myaccountpage.clickLogoutLink();
expect(await logoutpage.verifylogoutMessage()).toBeTruthy();

//click continue and verify Home Page exist

await logoutpage.clickContinue();
expect(await homepage.isPageExist()).toBe(true);

});


