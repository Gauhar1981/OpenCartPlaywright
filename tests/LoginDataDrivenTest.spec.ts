import{test,expect} from "@playwright/test"
import { HomePage } from "../Pages/HomePage"
import { LoginPage } from "../Pages/LoginPage"
import{DataProvider} from "../Utils/dataProvider"
import { MyAccountPage } from "../Pages/MyAccountPage"
import { TestConfig } from "../test.config"

//load JSON test data loginData.json

const jsonpath="TestData/loginData.json";

const jsonTestData=DataProvider.getTestDataFromJSON(jsonpath);

for(const data of jsonTestData )
{
    test(`Login test with JSON Data : ${data.testName} @datadriven`,async({page})=>
    {
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const homepage=new HomePage(page);
        await homepage.clickMyAccount();        
        await homepage.clickLogin();

        const loginpage=new LoginPage(page);
        await loginpage.login(data.email,data.password);

        if(data.expected.toLowerCase()==="success")
        {
            const myaccountpage=new MyAccountPage(page);
            const isloggedin= await myaccountpage.isMyAccoutnPageExists();
           expect(isloggedin).toBeTruthy();
        }
        else
        {
             expect(await loginpage.loginerrorMeesage()).toBe("Warning: No match for E-Mail Address and/or Password.")
        }

      
    });
}


//load csv test data logindata.csv

const csvpath="TestData/logindata.csv";

const csvTestData=DataProvider.getTestDataFromCSV(csvpath);

for(const data of csvTestData )
{
    test(`Login test with CSV Data : ${data.testName} @datadriven`,async({page})=>
    {
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const homepage=new HomePage(page);
        await homepage.clickMyAccount();        
        await homepage.clickLogin();

        const loginpage=new LoginPage(page);
        await loginpage.login(data.email,data.password);

        if(data.expected.toLowerCase()==="success")
        {
            const myaccountpage=new MyAccountPage(page);
            const isloggedin= await myaccountpage.isMyAccoutnPageExists();
           expect(isloggedin).toBeTruthy();
        }
        else
        {
             expect(await loginpage.loginerrorMeesage()).toBe("Warning: No match for E-Mail Address and/or Password.")
        }

      
    });
}