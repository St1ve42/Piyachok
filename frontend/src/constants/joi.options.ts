import {ValidationOptions} from "joi";

export const JoiOptions: ValidationOptions = {
    messages: {
        'any.required': '{{#label}} є необхідним.',
        'string.empty': '{{#label}} не має бути порожнім.',
        'string.base': '{{#label}} має бути рядком.',
        'string.min': `{{#label}} має мати більше або містити {{#limit}} символи.`,
        'string.max': `{{#label}} не має перевищувати {{#limit}} символи.`,
        'number.empty': '{{#label}} не має бути порожнім.',
        'number.base': '{{#label}} має бути числом.',
        'number.integer': '{{#label}} має бути цілим числом.',
        'number.min': `{{#label}} має бути більше, ніж {{#limit}}.`,
        'number.max': `{{#label}} не має перевищувати {{#limit}}.`,
        'string.email': `{{#label}} має бути формату example@domain.com`
    },
    errors: {
        wrap: {
            label: ''
        }
    },
    abortEarly: false
}