import {ValidationOptions} from "joi";

export const JoiOptions: ValidationOptions = {
    messages: {
        'any.required': 'Значення є необхідним.',
        'string.empty': 'Значення не має бути порожнім.',
        'string.base': 'Значення має бути рядком.',
        'string.min': `Значення має мати більше або містити {{#limit}} символи.`,
        'string.max': `Значення не має перевищувати {{#limit}} символи.`,
        'number.empty': 'Значення не має бути порожнім.',
        'number.base': 'Значення має бути числом.',
        'number.integer': 'Значення має бути цілим числом.',
        'number.min': `Значення має бути більше, ніж {{#limit}}, або бути рівним.`,
        'number.max': `Значення не має перевищувати {{#limit}}.`,
        'string.email': `Значення має бути формату example@domain.com`
    },
    errors: {
        wrap: {
            label: ''
        }
    },
    abortEarly: false
}