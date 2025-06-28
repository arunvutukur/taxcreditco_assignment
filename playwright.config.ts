/* eslint-disable */
import { devices } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import path from 'path';
 
//**Time Stamp with Default Report Generation */
function generateTimestamp() {
  return new Date().toISOString().replace(/:/g, '_');
}
 
//--Default configuration settings
export default defineConfig({
 
  //**Global Setup to run different environments*/
  globalSetup: 'utils/globalSetup.ts',
 
  //Individual test Time Out
  timeout: 1200 * 100,
 
  //Test Suite total timeout
  globalTimeout : 60*10000,  
 
  expect:{
    // ---Maximum time expect() should wait for the condition to be met.
    timeout: 10000,
 
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
 
    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },  
  },
  // Give failing tests retry attempts : 1
  retries: 1,
  //Max Failure accepted before exiting the build
  maxFailures:5,  
 
  reporter: [
    ["dot"],
    ['list'],
 
    //** Default Report */
    ['html',{ open: 'never' }],
 
    //** Generate Time Stamp default reports */
    //['html', { outputFolder: path.join('playwright-report', generateTimestamp())}],  
 
    ["json", {
      outputFile: "jsonReports/jsonReport.json"}],
  ],  
 
  //** Project Profile */
  projects: [  
 
    //**Global Teardown */
    {
      name: 'teardown',
      testDir:'./utils',
      testMatch : 'globalTearDown.ts',            
    },    
   
    {
      name: 'QA',
      use: { ...devices['Desktop Chrome'],
     
      baseURL: process.env.BASE_URL,
      //baseURL: 'https://uat-survey.taxcreditco.com/',            
      launchOptions: {
     
        args: [ '--start-maximized','--auth-server-allowlist="_"'],
        ignoreDefaultArgs: ['--disable-field-trial-config','--disable-extensions'],
           
      },                  
      trace: "on",
      screenshot :"on",
      video: "on",
      viewport: null,
      deviceScaleFactor: undefined,
      headless:false,
      testIdAttribute: 'data-question-id-text',            
      },
 
      testDir: './tests',
      testMatch :'Script001.spec.ts',
      teardown:'teardown',        
    },    
  ],  
});