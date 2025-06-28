import { Page } from "@playwright/test";
import * as commonUtils from '../utils/commonUtils';
import { step } from "../utils/customDecorators";
import { logger } from "../utils/logger";
 
export class TaxCreditFormPage {
 
    private readonly page : Page;
    private readonly optionsValue = {Yes: 'Yes', No: 'No'};
   
        constructor(page : Page){
            this.page = page;          
        }
 
    //Locators
    btnSnapCombinedRct = (selection:string) => this.page.getByTestId("SnapCombinedRecent").getByText(selection);
    btnTanfCombinedRct = (selection:string) => this.page.getByTestId("TanfCombinedRecent").getByText(selection);  
    btnUSArmedForces = (selection:string) => this.page.getByTestId("USArmedForces").getByText(selection);
    btnDisabledPerson = (selection:string) => this.page.getByTestId("DisabledPerson").getByText(selection);
    btnConvicted = (selection:string) => this.page.getByTestId("Convicted").getByText(selection);
    btnLongTermUnemployed = (selection:string) => this.page.getByTestId("LongTermUnemployed").getByText(selection);  
   
 
    //Page Actions
 
    /**
     * Sets all the options in the tax credit form to "No".
     * This method interacts with various form elements and ensures that
     * each option is selected as "No" by invoking the respective click methods.
     *
     * The options handled by this method include:
     * - SNAP Combined RCT
     * - TANF Combined RCT
     * - U.S. Armed Forces
     * - Disabled Person
     * - Convicted
     * - Long-Term Unemployed
     *
     * @returns {Promise<void>} A promise that resolves when all options have been set to "No".
     */
    async setAllTheOptionsAsNo() {
        await this.clickSnapCombinedRct(this.optionsValue.No);
        await this.clickTanfCombinedRct(this.optionsValue.No);
        await this.clickUSArmedForces(this.optionsValue.No);
        await this.clickDisabledPerson(this.optionsValue.No);
        await this.clickConvicted(this.optionsValue.No);
        await this.clickLongTermUnemployed(this.optionsValue.No);
    }
 
    //Page Actions for all the field elements
    async clickSnapCombinedRct(selection:string) {
        await commonUtils.clickElement(this.btnSnapCombinedRct(selection));      
    }
 
    async clickTanfCombinedRct(selection:string) {
        await commonUtils.clickElement(this.btnTanfCombinedRct(selection));
    }
 
    async clickUSArmedForces(selection:string) {
        await commonUtils.clickElement(this.btnUSArmedForces(selection));
    }
 
    async clickDisabledPerson(selection:string) {
        await commonUtils.clickElement(this.btnDisabledPerson(selection));
    }
 
    async clickConvicted(selection:string) {
        await commonUtils.clickElement(this.btnConvicted(selection));
    }
 
    async clickLongTermUnemployed(selection:string) {
        await commonUtils.clickElement(this.btnLongTermUnemployed(selection));
    }
     
   /**Click Next Button on the TAX Credit Forms page */ 
    @step()
    async clickNextButton() {        
        await commonUtils.selectNextButton(this.page);
        await this.page.waitForLoadState('domcontentloaded');
        logger.info("Clicked on Next Button");
    }
}
