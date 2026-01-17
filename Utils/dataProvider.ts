import fs from "fs";
import {parse} from "csv-parse/sync";

export class DataProvider
{
 static getTestDataFromJSON(filepath:string)
 {
   let data:any=JSON.parse(fs.readFileSync(filepath,'utf-8'));

   return data;

 }


static getTestDataFromCSV(filepath:string)
 {
   let data:any=parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true});
   return data;
 }



}