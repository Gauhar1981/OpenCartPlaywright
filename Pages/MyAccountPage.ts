import{ Page, expect, Locator} from "@playwright/test";
import{ LogoutPage} from "./LogoutPage"
import { log } from "node:console";

export class MyAccountPage
{
 private readonly page:Page;
 private readonly msgHeading:Locator;
 private readonly linkLogout:Locator;

 constructor(page:Page)
 {
    this.page=page;
    this.msgHeading=page.locator('h2:has-text("My Account")');
    this.linkLogout=page.locator("text='Logout'").nth(1);

 }

 async isMyAccoutnPageExists():Promise<boolean>
 {
    try
    {
        const isVisible=await this.msgHeading.isVisible();
        return isVisible;
    }
    catch(error)
    {
        console.log(`Error found while checking My Account Page is Visible ,${error}`);
        return false;
    }
 }

 async clickLogoutLink(): Promise<LogoutPage>
 {
   try{
       await this.linkLogout.click();
       return new LogoutPage(this.page);
      }
   catch(error)
    {
      console.log(`Unable to click logout link, ${error}`);
      throw error;
    }
 }




}