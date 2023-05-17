import { formatDate } from "@angular/common";

export class Portfolio {
    id?: number | null;
    name?: string | null;
    dateCreated?: string | null 
    dateDeleted?: string | null;
    personName?: string | null;
    benchmarkDescription? : string | null;

}

export class Position {
    id?: number | null;
    instrumentName?: string | null;
    instrumentType?: string | null 
    totalValue?: number | null;
    date?: string | null;
    quantity? : number | null;

}