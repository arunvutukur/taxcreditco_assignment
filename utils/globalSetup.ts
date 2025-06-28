import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";
 
 
dotenv.config(({path: `${__dirname}/../.env` }));
 
async function globalSetup(config:FullConfig) {
  if (process.env.test_env) {
      dotenv.config({
      path: `.env.${process.env.test_env}`,
      override: true,
    });  
  }
  const flagStatus = { success: "Global Setup completed successfully!" ,
    error: "Global Setup failed!"};  
 
  console.log(flagStatus.success);
}
 
export default globalSetup;