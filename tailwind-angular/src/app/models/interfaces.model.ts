export interface IPart {
    id: number,
    code: string,
    curStationId: number,
    status: string,
}

export interface IMoviment {
    id: number,
    partId: number,
    dateTime: Date,
    origin: number,
    destination: number,
    responsable: string
}

export interface IStation {
    curStation: string
    id: number,
    title: string,
    sort: number
}