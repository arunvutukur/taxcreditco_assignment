import type { Locator, Page } from 'playwright';
import { expect } from '../fixtures/pageFixtures';
import { logger } from '../utils/logger';
import { isFalsy } from 'utility-types';
import * as playwright from 'playwright';
 
export const maxTimeout: number = 10_000;//Number.parseInt(process.env.TEST_TIMEOUT!);
 
 
/**
 * Checks if a given element is selected within the page context.
 *
 * This function first verifies if the element is visible on the page.
 * If the element is visible, it checks whether the element is enabled
 * within the specified timeout period.
 *
 * @param element - The Playwright `Locator` representing the element to check.
 * @param eleTimeout - (Optional) The timeout in milliseconds to wait for the element to be enabled.
 * @returns A promise that resolves to `true` if the element is visible and enabled, otherwise `false`.
 **/
 /* The function first verifies if the element is visible on the page. If the element is visible,
 * it checks whether the element is disabled within the provided timeout. If the element is not
 * visible, it logs the information and returns `false`.
 */
export async function isElementDisabled(element: Locator,eleTimeout?: number): Promise<boolean> {
    const visible: boolean = await isElementVisible(element);
    if(visible){
        logger.info("Element is displayed in the given page context");
        return await element.isDisabled({timeout :eleTimeout});        
     }
     else {
        logger.info("Element is not visible in the given page context");
        return false;
     }          
}
 
//Element visibility check with default timeout
export async function isElementVisible(ele: Locator, eleTimeout?: number): Promise<boolean> {
    try {
        await elementAttached(ele);
        await ele.waitFor({ state: 'visible' });
        const localTimeout = isFalsy(eleTimeout) ? maxTimeout : eleTimeout;
        const eleVisible: boolean = await ele.isVisible({ timeout: localTimeout });
 
        if (eleVisible) {
            logger.info("Element - " + ele + " is visible in the given page context");
        } else {
            logger.info("Element - " + ele + " is not visible in the given page context");
        }
        return eleVisible;
    }
    catch (exception) {
        logger.info("The Element is not visible due to " + exception);
        return false;
    }
}
 
//Element using selector attached to dom or not is validated and waits for the element until defined timeout 60 seconds
export async function selectorAttached(page: Page, selector: string) {
    //Wait for element to be attached for DOM
    await page.locator(selector).waitFor({
        state: 'attached',
        timeout: maxTimeout
    });
}
 
//Element using locator attached to dom or not is validated and waits for the element until defined timeout 60 seconds
export async function elementAttached(element: Locator) {
    //Wait for element to be attached for DOM  
        await element.waitFor({
            state: 'attached',
            timeout: maxTimeout
        });
    }
 
/**
 * Clicks the "Next" button on the page and waits for the necessary load states.
 *
 * This function performs the following steps:
 * 1. Waits for the network to become idle.
 * 2. Clicks the "Next" button that is visible on the page.
 * 3. Waits for the DOM content to be fully loaded.
 * 4. Logs a message indicating that the default mapping has been completed.
 *
 * @param page - The Playwright `Page` object representing the current browser page.
 *
 * @returns A promise that resolves once the "Next" button has been clicked and the necessary load states have been met.
 */
export async function selectNextButton(page: Page){    
        await page.waitForLoadState('networkidle');      
        await clickElement(page.getByRole('button', { name: 'Next' }).locator('visible=true'));
        await page.waitForLoadState('domcontentloaded');          
        logger.info("The Default Mapping has been completed");
   }
   
 
/**
 * Clicks on a specified Playwright Locator element.
 *
 * This function ensures that the element is attached to the DOM before attempting to click it.
 * If a timeout error occurs, it retries clicking the element with a shorter timeout.
 * Logs relevant information and errors during the process.
 *
 * @param ele - The Playwright Locator representing the element to be clicked.
 *
 * @throws {playwright.errors.TimeoutError} If the click operation exceeds the specified timeout.
 * @throws {Error} If the element is not attached to the DOM or another error occurs.
 *  */
export async function clickElement(ele: Locator) {    
    try {
        await elementAttached(ele);
        await ele.click({ timeout: maxTimeout });
        logger.info("Successfully Clicked on Element - " + ele);
    }
    catch (error){
        let message;  
        if (error instanceof playwright.errors.TimeoutError){
            logger.info('Timeout! Error exceeded -- ' +maxTimeout+ " ms");
            logger.info('Retry the locator');
            await ele.click({ timeout: 3000 });
        }                        
        else if (error instanceof Error){                    
            logger.info('Element is not attached to DOM ' + {message: error.message} + "value : "+ error );
            throw error;
        }
        else message = String(error)
        logger.info('Error in clickElement method ' + message);
    }
}
 
//Fill in a text box using locator and given text
export async function fill(field: Locator, text: string) {
    await elementAttached(field);
    await isElementVisible(field);
    await field.click({ timeout: maxTimeout });    
    await field.fill(text, { timeout: maxTimeout });
    const actualValue = await field.inputValue({ timeout: maxTimeout });
    await expect(field).toHaveValue(text, { timeout: 10000 });
    logger.info("Successfully entered text - " + actualValue + " in field - " + field);
}
 
//Validate page title -- retry until it passes successfully
export async function validatePageTitle(page: Page, pageTitle:string){
      await expect(async () => {
        const actualTitle = await page.title();
        console.log("Actual Page Title: " + actualTitle);  
        expect(actualTitle).toBe(pageTitle);      
    },"Title Page Validation").toPass({      
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000
    });
};
 
 
export async function selectButton(page: Page) {
    logger.info("Selecting the button based on the provided selection");    
    await page.waitForLoadState('networkidle');      
    await clickElement(page.getByRole('button', { name: 'Next' }).locator('visible=true'));
    await page.waitForLoadState('domcontentloaded');
}
