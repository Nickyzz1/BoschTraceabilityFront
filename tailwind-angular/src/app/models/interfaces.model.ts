export interface IPart {
    id: number,
    code: string,
    curStationId: number,
    status: string,
}

export interface IMovimentCreate {
    partId: number,
    destination: number,
    responsable: string
}

export interface IMovimentGet {
  id: number;
  partId: number;
  part: any;
  partCode?: string;
  dateTime: string;
  origin: number;
  destination: number;
  responsable: string;
}

export interface IStation {
    id: number,
    title: string,
    sort: number
}