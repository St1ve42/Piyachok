export class Utils{
    capitalizeFirstLetter(text: string): string{
        return text[0].toUpperCase() + text.slice(1, text.length)
    }

    debounce(func: (...args: unknown[]) => void, time: number){
        let timeout: ReturnType<typeof setTimeout>;
        return function (...args: any[]) {
            clearTimeout(timeout)
            timeout = setTimeout(() => func(...args), time);
        }
    }
}

export const utils = new Utils()