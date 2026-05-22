export class Utils{
    capitalizeFirstLetter(text: string): string{
        return text[0].toUpperCase() + text.slice(1, text.length)
    }

    buildStorageURL(path: string): string {
        if(!path.includes('http')){
            return process.env.NEXT_PUBLIC_STORAGE_URL + path
        }
        return path
    }
}

export const utils = new Utils()