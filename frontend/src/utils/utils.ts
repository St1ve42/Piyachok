export class Utils{
    public static debounce(func: any, delay: number) {
        let timer: NodeJS.Timeout
        return function(...args: any[]) {

            clearTimeout(timer);
            
            timer = setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                func.apply(this, args);
            }, delay);
        };
    }
}