import{Page,expect, Locator} from "@playwright/test"

export class ProductPage
{
    private readonly page:Page;
    private readonly txtQuantity:Locator;
    private readonly btnAddToCart:Locator;
    private readonly confirmMsg:Locator;
    private readonly btnItems:Locator;
    private readonly viewCartLink:Locator;

constructor(page:Page)
{
    this.page=page;

    this.txtQuantity=page.locator("#input-quantity");
    this.btnAddToCart=page.locator('#button-cart');
    this.confirmMsg=page.locator(".alert.alert-success.alert-dismissible");
    this.btnItems=page.locator('#cart');
    this.viewCartLink=page.locator('strong:has-text("View Cart")');
}
 
//set product quantity
async setProductQuantity(qty:string):Promise<void>
{
 await this.txtQuantity.fill('');
 await this.txtQuantity.fill(qty);
}

//Add product to cart

async addPrdToCart():Promise<void>
{
    await this.btnAddToCart.click();
}

//validate confirmation message is visible
async confirmMessageVisible():Promise<boolean>
{
  try
  {
    if(this.confirmMsg!=null)
     return true;
    
    else 
      return false;
  }
  catch(error)
  {
    console.log(`Confirmation message not visible : ${error}`)
    return false;
  }
}
 // click on items to navigate to cart
 
 async clickOnItemsViewCart():Promise<void>
 {
   await this.btnItems.click();
   await this.viewCartLink.click();
 }

}
 



