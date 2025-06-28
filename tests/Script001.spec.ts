import { expect, test } from '../fixtures/pageFixtures';
import { logger } from '../utils/logger';
 
test.describe('InSprintAutomation_E2E_01', () => {
        test('Submit User details and validate Information',
        {
            tag: '@Smoke',
            annotation: [
                { type: "US_<Feature_number>", description: "Provide and Validate user details" },
            ],                    
        },async({page,
            userFormsPage,
            taxCreditFormPage,
            taxAdditionalInformationPage                                                              
            }) =>
            {
            await userFormsPage.navigateToHomePage();
            await userFormsPage.pageValidation('Tax Credit Survey');
            await userFormsPage.provideUserInformation();          
            await userFormsPage.clickNextButton();            
            await taxCreditFormPage.setAllTheOptionsAsNo();          
            await taxCreditFormPage.clickNextButton();
            await taxAdditionalInformationPage.validateUserLastAndFirstName(userFormsPage.getFullName());
            await taxAdditionalInformationPage.submitForm();
            await expect(page).toHaveURL('https://www.experian.com/employer-services/');          
            logger.info('Test completed successfully');            
        });
    });
