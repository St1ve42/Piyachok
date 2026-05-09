export class UtilsService {
    static outputArray(array: any[]): string {
        return array.reduce<string>((accum, value, index) => {
            if (index !== array.length - 1) {
                accum += `${value}, `;
            } else {
                accum += `${value}`;
            }
            return accum;
        }, '');
    }
}
