
import { test as base} from '@playwright/test'
import { UserFormsPage } from '../page-objects/userFormsPage';
import { TaxCreditFormPage } from '../page-objects/taxCreditFormPage';
import { TaxAdditionalInformationPage } from '../page-objects/taxAdditionalInformationPage';
export { expect } from "@playwright/test";
 
export type TestOptions = {    
    userFormsPage:UserFormsPage;  
    taxCreditFormPage:TaxCreditFormPage;
    taxAdditionalInformationPage:TaxAdditionalInformationPage;    
}
 
export const test = base.extend<TestOptions>({  
 
    /** Page Implementation */
    userFormsPage:async({page}, use) => {                
        await use(new UserFormsPage(page));  
    },
    taxCreditFormPage:async({page}, use) => {                
        await use(new TaxCreditFormPage(page));  
    },
    taxAdditionalInformationPage:async({page}, use) => {                
        await use(new TaxAdditionalInformationPage(page));  
    }
});
