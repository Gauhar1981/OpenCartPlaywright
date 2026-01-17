import{ Page, expect, Locator} from "@playwright/test";

export class HomePage
{
    private readonly page:Page;
 //locators

 private readonly myaccountLink:Locator;
 private readonly registerlink:Locator;
 private readonly loginLink:Locator;
 private readonly txtSearchBox:Locator;
 private readonly btnSearch:Locator;


 //constructor
 constructor(page:Page)
 {
    this.page=page;
    this.myaccountLink=page.locator('span:has-text("My Account")');
    this.registerlink=page.getByRole('link', { name: 'Register' })
    this.loginLink=page.getByRole('link', { name: 'Login' });
    this.txtSearchBox=page.getByRole('textbox', { name: 'Search' });
    this.btnSearch=page.locator('button.btn.btn-default.btn-lg');

 }


 //Action Methods
 
 async isPageExist()
 {
   let title=await this.page.title();
   if(title)
   {
   return true;
   }
  return false;
 }
 
 //click My Account link

 async clickMyAccount()
 {
    try
    {
        await this.myaccountLink.click();
    }catch(error)
    {
      console.log(`Exception found while clicking My Account : ${error}`);
      throw error;
    }
 }

 //Enter product name in search box

 async enterProductName(pName:string)
 {
    try
    {
        await this.txtSearchBox.fill(pName);

    }catch(error)
    {
       console.log(`Exception found while entering Product : ${error}`);
      throw error; 
    }
 }

//Click search button

 async clicksearchBtn()
 {
    try
    {
        await this.btnSearch.click();

    }catch(error)
    {
       console.log(`Exception found while clicking Search button : ${error}`);
      throw error; 
    }

 }

  //click login link

 async clickLogin()
 {
    try
    {
        await this.loginLink.click();

    }catch(error)
    {
       console.log(`Exception found while clicking Login Link : ${error}`);
      throw error; 
    }
 }

  //click register link

 async clickRegisterLink()
 {
    try
    {
        await this.registerlink.click();

    }catch(error)
    {
       console.log(`Exception found while clicking Resigter Link : ${error}`);
      throw error; 
    }
 }












}