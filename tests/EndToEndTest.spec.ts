import{test,expect,Page} from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { RegistrationPage } from "../Pages/RegistrationPage"
import { RandomDataUtil } from "../Utils/randomDataGenerator"
import { TestConfig } from "../test.config"
import { ProductPage } from "../Pages/ProductPage"
import { LoginPage } from "../Pages/LoginPage"
import { MyAccountPage } from "../Pages/MyAccountPage"
import { SearchResultPage } from "../Pages/SearchResultPage"
import { LogoutPage } from "../Pages/LogoutPage"
import {ShoppingCartPage } from "../Pages/ShoppingCartPage"
import { CheckoutPage } from "../Pages/CheckoutPage"

//this is main test block which runs entire flow

test("execute end to end test flow @end-to-end",async({page})=>
{
    const config=new TestConfig();

    //navigate to aaplication home page
    await page.goto(config.appUrl);
    console.log("✅ Navigate to Home Page")

    //New account registration and capture email generated
     let registeredEmail= await performRegsitration(page);
     console.log("✅ Resistration is completed")

     //Logout after successfull registration
     await performLogout(page);
     console.log("✅ Logout is completed")

     //Login with registered email
     await performLogin(page,registeredEmail);
     console.log("✅ Login is completed")

     //Search product and add to cart
     await SearchAndAddProduct(page);
     console.log("✅ Product added to cart")

     //Verify contents of shopping cart
     await VerifyShoppingCart(page);
     console.log("✅ Shoping Cart contents verified")

     // Step 6: Perform checkout (skipped for demo site)
    // await performCheckout(page);


})

//function to register new user

async function performRegsitration(page:Page):Promise<string>
{
    //navigate to register page
    const homepage=new HomePage(page);
    await homepage.clickMyAccount();
    await homepage.clickRegisterLink();

    //enter details and register user
    const registrationpage=new RegistrationPage(page);
    await registrationpage.enterFirstName(RandomDataUtil.getFirstName());
    await registrationpage.enterLastName(RandomDataUtil.getLastName());
    let email:string= RandomDataUtil.getEmail();
    await registrationpage.enterEmail(email);
    await registrationpage.enterTelephone(RandomDataUtil.getPhoneNumber());
    await registrationpage.enterPassword("Abbas123");
    await registrationpage.enterConfirmPassword("Abbas123");
    await registrationpage.checkPrivacyPolicy();
    await registrationpage.clickContinue();
   
    //validate that resistration is successfull
    const confirmmsg=await registrationpage.getConfirmation();
    expect(confirmmsg).toContain("Your Account Has Been Created!");
    return email;
}

async function performLogout(page:Page):Promise<void>
{
   const myaccountpage=new MyAccountPage(page);
   const logoutpage:LogoutPage=await myaccountpage.clickLogoutLink();
   //ensure continue button is visible
   expect(await logoutpage.verifylogoutMessage()).toBeTruthy();
   //click continue and confirm Home Page
   const homepage=await logoutpage.clickContinue();
    expect(await homepage.isPageExist()).toBe(true);
}

async function performLogin(page:Page,email:string)
{
    const config=new TestConfig();
    await page.goto(config.appUrl);

    const homepage=new HomePage(page);
    await homepage.clickMyAccount();
    await homepage.clickLogin();
    const loginpage=new LoginPage(page);
    await loginpage.login(email,"Abbas123");
    //verify successfull login
    const myaccountpage=new MyAccountPage(page);
    expect(await myaccountpage.isMyAccoutnPageExists()).toBeTruthy();
}

async function SearchAndAddProduct(page:Page)
{
    const homepage=new HomePage(page);
    const productpage=new ProductPage(page);
    const config=new TestConfig();
    await homepage.enterProductName(config.productName);
    await homepage.clicksearchBtn();
    //validate search result page and product exists
    const searchresultpage=new SearchResultPage(page);
    expect(await searchresultpage.isSearchPageExist()).toBeTruthy();
    expect(await searchresultpage.isProductExist(config.productName)).toBeTruthy();

    //select product and enter quantity
    await searchresultpage.selectProductfromResult(config.productName);
    await productpage?.setProductQuantity(config.productQuantity);
    await productpage.addPrdToCart();
    await page.waitForTimeout(3000);
    //confirm product is added
    expect(await productpage.confirmMessageVisible()).toBeTruthy();
}

async function VerifyShoppingCart(page:Page)
{
    const productpage=new ProductPage(page);
    const shoppingcartpage=new ShoppingCartPage(page);
    //navigate to shopping cart from product page
    await productpage.clickOnItemsViewCart();
    console.log("🛒Navigated to shopping cart");
    const config=new TestConfig();
    //validate total price is correct based on config
    expect(await shoppingcartpage.getTotalPrice()).toBe(config.totalPrice);

}

// Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.
    // Place your checkout flow logic here if backend is available.
}

