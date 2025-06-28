# Introduction
Playwright is an automation framework supporting both API and GUI functional automation testing.
 
Playwright is an Open source automation library provided by Microsoft
 
To know more about playwright refer [Playwright Docs](https://playwright.dev/docs/intro)
 
Tech stack used for building this framework -
1.  Playwright
2.  Cross-Env
3.  DotEnv
4.  Winston
5.  ESLint
6.  Prettier formatter
7.  Vanilla Playwright reporter(default)
 
# Getting Started
In this section you can talk about:
1.  Installation process
    * Clone the project - Clone it from Github        
        * Clone using Git URL - This will help you take the clone https URL and then clone it using Git Bash with following command "clone <remote clone url>" to your local drive      
2.  Software dependencies
    *Node and NPM - It is mandatory for running any of your java script / type script based projects either from VSCode or from local command line. Make sure you have atleasdt these versions of node and npm installed in your machine -
      * Node - v22.10.1
        - You can validate the version by running the command node -v / node --version
      * NPM -  v10.8.0
        - You can validate the version by running the command npm -v / npm --version


    * Microsoft Visual Studio Code - It is required for execution / debugging / contributing to this project. For execution only, having this tool is not mandatory and can be easily run via command line. There is no recommended version but you can chose to pick the latest stable release.
        * Plugins / Extensions to be installed on Visual Studio Code ->**Playwright Test for VS Code**
            * Playwright Test for VSCode - Required for recognizing your playwright configurations            
    * Git Bash - For running the git commands outside the visual studio code if necessary. We can still use inbuilt git features within visual studio code.
    * 
 
# Build and Test
  Describe and show how to build your code and run the tests.
   **Execution via npm command line**
     ---- Go to Playwright configuration ts
     *For the first time please run the command line -> build
        ->>>"build": "tsc --init && npm install"
     *This is run as default before running the dry run    
            "pretest": "tsc --noEmit && npx eslint tests/**" 
     **Dry run test**
     --Use the below command line to execute test in headed mode- >test:dry_run         
            "test:dry_run":"npx cross-env test_env=test npx playwright test --project=QA" 
     **Reports**
     --Use the below command to get the reports ( as post test it should display automatically if already exists on browser)            
    "posttest": "npx playwright show-report"    
 
# Debug
  Debugging the project is key when trouble shooting for any issues observed in the project / tests. VS Code comes with inbuilt debugger for native playwright project.
 
# Coding Standards
- Name files with camelCase (for example, ebsVolumes.js or storage.ts)
- Use PascalCase for class names and interface names.
- Use camelCase for variable and function names.
- Use camelCase for interface members.
- Use PascalCase for type names and enum names.