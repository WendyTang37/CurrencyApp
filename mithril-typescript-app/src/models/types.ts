export type RatesData = {
    date: string;
    base: string;
    rates: object;
}

export type CurrencyRate = {
    code: number;
}

export type CurrencyList = string[];

export type Tab = {
    route: string;
    name: string;
}