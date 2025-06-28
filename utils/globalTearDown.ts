import { test as teardown } from '@playwright/test';
import { logger } from '../utils/logger';
 
teardown('Exit Browser ', async ({page }) => {
 
  await page.close();  
  console.log('close the browser');
  logger.info("Browser Closed Successfully");
     
});
