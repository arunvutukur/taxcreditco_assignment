import { Page } from '@playwright/test';
import { logger } from '../utils/logger';
import * as commonUtils from '../utils/commonUtils'; // Ensure this path is correct
import { step } from '../utils/customDecorators';
import { faker } from '@faker-js/faker'; 
 
export class UserFormsPage{
 
    private readonly page : Page;
    private readonly url = process.env.BASE_URL!;
    private FullName :string = "";
   
   
    constructor(page : Page){
        this.page = page;          
    }      
 
    //Locators
    txtFirstName = () =>this.page.getByRole('textbox', { name: 'First Name' });
    txtLastName= () => this.page.getByRole('textbox', { name: 'Last Name' });
    txtEmailAddress = () => this.page.getByRole('textbox', { name: 'Email Address' });
    txtStreetAddress = () => this.page.getByRole('textbox', { name: 'Street Address' });
    txtCity = () => this.page.getByRole('textbox', { name: 'City' });
    txtZipCode= () => this.page.getByRole('textbox', { name: 'Zip Code' });
    selectNextButton = () => this.page.getByRole('button', { name: 'Next' });
 
 
    //Page Actions
 
    /**
     * Navigates the user to the home page.
     *
     * This function is typically used to redirect the user to the main landing page of the application.
     * It may involve updating the browser's history stack and rendering the home page component.
     *
     * @returns {void} This function does not return a value.
     */
    @step('Navigate To Home Page')
    async navigateToHomePage(){
        await this.page.goto('/automation-challenge',{waitUntil: 'domcontentloaded'});
        logger.info("Navigated to Home Page");
    }
   
    /**
     * Basic Page Title Validation Functionality
     *
     * @param pageTitle ex:Tax Credit Survey'
     */
    @step()
    async pageValidation(pageTitle:string){
        await this.page.waitForLoadState('domcontentloaded');
        await commonUtils.validatePageTitle(this.page,pageTitle);        
        logger.info("Page Title matches with expected title: " + pageTitle);        
    }
    
    /**
     * Provides and updates user information on the User Forms Page either through faker.js or user inputs from json file.
     * Parametes are optional 
     * --If no values are provided in the parameters during function call then function invokes faker.js methods to randome generate test data
     * 
     * @param firstName : 'string'
     * @param lastName : 'string'
     * @param streetAddress :'string'
     * @param city :'string'
     * @param zipCode :'string'(5 digit code)
     * 
     */
 
    @step("Provide all the required USER Information")
    async provideUserInformation(firstName?: string, lastName?: string, email?: string, streetAddress?: string, city?: string, zipCode?: string) {
       
        logger.info("Entering user information using Faker.js if details are not provided");
 
        if(firstName === "" || firstName === undefined) {
            firstName = faker.person.firstName();
        }
        logger.info("First Name: " + firstName);
        await commonUtils.fill(this.txtFirstName(), firstName);
       
        if(lastName === "" || lastName === undefined) {
            lastName = faker.person.lastName();
        }
        logger.info("Last Name: " + lastName);
        await commonUtils.fill(this.txtLastName(), lastName);
       
        if(email === "" || email === undefined) {
            email = faker.internet.email();
        }
        logger.info("Email Address: " + email);
        await commonUtils.fill(this.txtEmailAddress(), email);    
       
       if(streetAddress === "" || streetAddress === undefined) {
            streetAddress = faker.location.streetAddress();
        }
        logger.info("Street Address: " + streetAddress);        
        await commonUtils.fill(this.txtStreetAddress(), streetAddress);
 
        if(city === "" || city === undefined) {
            city = faker.location.city();
        }
        logger.info("City: " + city);
        await commonUtils.fill(this.txtCity(), city);
 
        if(zipCode === "" || zipCode === undefined) {
            zipCode = faker.location.zipCode('#####');
        }
        logger.info("Zip Code: " + zipCode);
        await commonUtils.fill(this.txtZipCode(), zipCode);
       
        this.FullName = firstName + " " + lastName;
        logger.info("Full Name: " + this.FullName);
        //console.log("Full Name: " + this.FullName); // For debugging purposes
    }
 
    /**Click Next Button on the Forms page */
    @step()
    async clickNextButton() {        
        await commonUtils.clickElement(this.selectNextButton());
        await this.page.waitForLoadState('networkidle');
    }
   
    /** Returns the invoked full name details from the above user provided information method call */
    getFullName(): string {
 
        return this.FullName;
    }
}