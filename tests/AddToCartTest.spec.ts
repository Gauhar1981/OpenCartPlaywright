import{test,expect} from "@playwright/test"
import{ HomePage } from "../Pages/HomePage"
import { SearchResultPage } from "../Pages/SearchResultPage"
import { TestConfig } from "../test.config"
import { ProductPage } from "../Pages/ProductPage"

let config:TestConfig;
let homepage:HomePage;
let searchresultpage:SearchResultPage;
let productpage:ProductPage;    

test.beforeEach(async({page})=>
{
    config=new TestConfig();
    await page.goto(config.appUrl);

    //initialize page object

    homepage=new HomePage(page);
    searchresultpage=new SearchResultPage(page);
    productpage=new ProductPage(page);
})

//hooks run after each test-optional
test.afterEach(async({page})=>
{
    await page.close();
})

test("add product to cart @master @sanity @regression",async({page})=>
{
    const prdname=config.productName;
    //enter product name in search box
    await homepage.enterProductName(prdname);
    //click search button
    await homepage.clicksearchBtn();
    //verify search rersult page is displayed
    expect(await searchresultpage.isSearchPageExist()).toBeTruthy();
    //verify that product exist the result
    expect (await searchresultpage.isProductExist(prdname)).toBeTruthy();
    //select product if exist-set quantity-add to cart-verify confirmation
   if(await searchresultpage.isProductExist(prdname))
   {
    await searchresultpage.selectProductfromResult(prdname)
    await productpage.setProductQuantity(config.productQuantity);
    await productpage.addPrdToCart();
    expect(await productpage.confirmMessageVisible()).toBeTruthy();
   }


})

