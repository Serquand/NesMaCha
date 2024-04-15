export type Adress = {
    x: number;
    y: number;
}

export type CarPooling = {
    from: Adress | number;
    to: Adress | number;
    driver: string;
    maxPlace: number;
    dateDeparture: string;
    currentPassenger?: number;
    passengers?: Array<string>;
    idCarPooling?: number;
    status?: string;
}