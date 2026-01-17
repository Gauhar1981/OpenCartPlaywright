import{Page, expect, Locator} from "@playwright/test"
import { ProductPage } from "./ProductPage";

export class SearchResultPage
{
  private readonly page:Page;

//locators

 private readonly searchheading:Locator;
 private readonly searchedproducts:Locator;
 
 //constructor
 constructor(page:Page)
 {
    this.page=page;
    this.searchheading=page.locator("#content h1");
    this.searchedproducts=page.locator("h4>a");
 }

 async isSearchPageExist():Promise<boolean>
 {
   try
   {
    const headertext=await this.searchheading.textContent();
    return headertext?.includes("Search -") ?? false;
   }
   catch(error)
   {
    return false;
   }
 }

//  async isProductExist(productname:string):Promise<boolean>
//  {
//     try
//     {
//       const count=await this.searchedproducts.count();
//       for(let i=0;i<count;i++)
//       {
//         const product=this.searchedproducts.nth(1);
//         const prdtitle=await product.textContent();
//         if(prdtitle===productname)
//         {
//             return true;
//         }
//       }
//     }
//       catch(error)
//       {
//         console.log(`error found while checking product : ${error}`);
//       }
//       return false;
//  }

//next approach->
// async isProductExist(productname: string): Promise<boolean> {
//   return (await this.searchedproducts.filter({ hasText: productname }).count()) > 0;
// }

//another approach using for of loop=>

async isProductExist(productname:string):Promise<boolean>
 {
    try
    {
      const products=await this.searchedproducts.all();
      for(const product of products)
      {
        const prdtitle=(await product.textContent())?.trim();
          
         if(prdtitle===productname)
         {
             return true;
         }
      }
    }
      catch(error)
      {
        console.log(`error found while checking product : ${error}`);
      }
      return false;
 }

 //select and click on th product 
 async selectProductfromResult(productname:string):Promise<ProductPage | null>
 {
   try
   {
    const products=await this.searchedproducts.all();
    for(const product of products)
      {
        const prdtitle=await product.textContent();
        if(prdtitle===productname)
        {
          await product.click();
          return new ProductPage(this.page);
        }
      }
      console.log(`Product Not Found : ${productname}`)
   }catch(error)
   {
    console.log(`Error selecting product: ${error}`)
   }
   return null;
 }

 //get the product count
 async getProductCount():Promise<number>
 {
  return await this.searchedproducts.count();
 }


}
