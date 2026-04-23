export class RegexBuilder {
    private parts: string[] = [];
    private minLength = 3;
    private maxLength = 50;

    private static readonly CYRILLIC = 'а-яА-яёЁіІїЇєЄҐґ';
    private static readonly LATIN = 'a-zA-Z';
    private static readonly NUMBERS = '0-9';

    constructor(min: number = 3, max: number = 30) {
        this.minLength = min;
        this.maxLength = max;
    }

    public withCyrillic(): this {
        this.parts.push(RegexBuilder.CYRILLIC);
        return this;
    }

    public withLatin(): this {
        this.parts.push(RegexBuilder.LATIN);
        return this;
    }

    public withNumbers(): this {
        this.parts.push(RegexBuilder.NUMBERS);
        return this;
    }

    public withSpace(): this {
        this.parts.push('\\s');
        return this;
    }

    public withSymbols(chars: string): this {
        const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        this.parts.push(escaped);
        return this;
    }

    public setLength(min: number, max: number): this {
        this.minLength = min;
        this.maxLength = max;
        return this;
    }

    public build(): RegExp {
        const patternStr = this.parts.join('');
        return new RegExp(
            `^[${patternStr}]{${this.minLength},${this.maxLength}}$`,
        );
    }
}
