import{test,expect} from "@playwright/test"
import{ HomePage } from "../Pages/HomePage"
import { SearchResultPage } from "../Pages/SearchResultPage"
import { TestConfig } from "../test.config"

//declare reusable variables

let config:TestConfig;
let homepage:HomePage;
let searchresultpage:SearchResultPage;

//Playwright hooks runs before each test

test.beforeEach(async({page})=>
{
    config=new TestConfig();
    await page.goto(config.appUrl);

    //initialize page object

    homepage=new HomePage(page);
    searchresultpage=new SearchResultPage(page);
})

//hooks run after each test-optional
test.afterEach(async({page})=>
{
    await page.close();
})

test("Search product @master @regression",async()=>
{
 const productname=config.productName;
 //enter product name and search
 await homepage.enterProductName(productname);
 await homepage.clicksearchBtn();

 //verify search result page is displayed

 expect(await searchresultpage.isSearchPageExist()).toBeTruthy();

 //validate if searched products appears in th result

  const isproductFound= await searchresultpage.isProductExist(productname);
  expect(isproductFound).toBe(true);

})