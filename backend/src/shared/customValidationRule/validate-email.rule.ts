// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
//
// export const ValidatorConstraint =  (Service: )
// @ValidatorConstraint({ name: 'ExistingEmailRule', async: true })
// export class CustomExternalRule implements ValidatorConstraintInterface {
//   validate(value: any, args: ValidationArguments) {
//     // Implement your complex or external validation logic here
//     // e.g., check against a database or another service
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(value === 'expectedValue'); // example logic
//       }, 1000);
//     });
//   }
//
//   defaultMessage(args: ValidationArguments) {
//     return 'Value ($value) is invalid based on external rule!';
//   }
// }
