import{ Page, expect, Locator} from "@playwright/test"
import{ CheckoutPage } from "../Pages/CheckoutPage"
import { log } from "node:console";

export class ShoppingCartPage
{
  private readonly page:Page;
  private readonly lblToTalPrice:Locator;
  private readonly btnCheckOut:Locator;

  constructor(page:Page)
  {
    this.page=page;

    this.lblToTalPrice=page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
    this.btnCheckOut=page.locator("a[class='btn btn-primary']");
  }

  async getTotalPrice():Promise<string | null>
  {
   try
   {
    return await this.lblToTalPrice.textContent();
   }catch(error)
   {
    console.log(`Unable to retrieve total price : ${error}`);
    return null;
   }
  }

  async isPageAvailable():Promise<boolean>
  {
    try
    {
      return await this.btnCheckOut.isVisible();
    }catch(error)
    {
        return false
    }
  }
 async clickCheckoutButton():Promise<CheckoutPage>
 {
     await this.btnCheckOut.click();
     return new CheckoutPage(this.page);
 }

}








