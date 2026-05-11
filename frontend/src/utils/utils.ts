export class Utils{
    capitalizeFirstLetter(text: string): string{
        return text[0].toUpperCase() + text.slice(1, text.length)
    }
}

export const utils = new Utils()