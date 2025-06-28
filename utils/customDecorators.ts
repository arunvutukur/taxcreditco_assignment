/* eslint-disable */

import { test } from "../fixtures/pageFixtures";
 
/**
   * Decorator function for wrapping POM methods in a test.step.
   *
   * Use it without a step name `@step()`.
   *
   * Or with a step name `@step("Search something")`.
   *
   * @param stepName - The name of the test step.
   * @returns A decorator function that can be used to decorate test methods.
*/
export function step<This, Args extends any[], Return>(stepName?: string): any {
    return function decorator(
      target: Function,
      context: ClassMethodDecoratorContext
    ) {
      return function replacementMethod(this: any, ...args: any) {
        const name = `${this.constructor.name}.${context.name as string}(${args.map((a: any) => JSON.stringify(a)).join(',')})`;
        return test.step(name, async () => target.call(this, ...args));
      }
    }      
  }
