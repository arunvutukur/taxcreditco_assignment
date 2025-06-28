import { expect, Page } from "@playwright/test";
import * as commonUtils from '../utils/commonUtils';
 
export class TaxAdditionalInformationPage {
   
    private readonly page : Page;
 
    constructor(page: Page) {
        this.page = page;
    }
 
    // Locators
    txtNameConfirmation = () => this.page.getByTestId("NameConfirmation").getByRole('textbox');
    btnSubmitForm = () => this.page.getByRole('button', { name: 'Submit form' });
 
    /**
     * Validates that the user's last and first name matches the expected value.
     *
     * @param info - The expected full name (last and first name) to validate against.
     * @returns A promise that resolves when the validation is complete.
     * @throws Will throw an error if the name does not match the expected value within the timeout period.
     */
    async validateUserLastAndFirstName(info: string) {
        await expect(this.txtNameConfirmation()).toHaveValue(info);
    }

    /**
     * Functionality to select submit button in Additional Information page
     * 
     * Waits for the network to become idle after selecting submit form
     */
 
    async submitForm() {
        await commonUtils.clickElement(this.btnSubmitForm());
        await this.page.waitForLoadState('networkidle');
    }
}
