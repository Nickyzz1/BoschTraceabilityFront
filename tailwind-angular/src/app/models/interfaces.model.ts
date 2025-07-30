export interface IPart {
    id: number,
    code: string,
    curStationId: number,
    status: string,
}

export interface IMoviment {
    partId: number,
    destination: number,
    responsable: string
}

export interface IStation {
    id: number,
    title: string,
    sort: number
}