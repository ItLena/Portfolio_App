
export class Portfolio {
    id?: number | null;
    name?: string | null;
    dateCreated?: string | null 
    dateDeleted?: string | null;
    personName?: string | null;
    benchmarkDescription? : string | null;
    portfolioValue?: number | null;
    lastUpdated?: string | null;
}

export class Position {
    id?: number | null;
    instrumentName?: string | null;
    instrumentType?: string | null 
    totalValue?: number | null;
    date?: string | null;
    quantity? : number | null;  
}

export class Performance{
    portfolioId?: number | null;
    date?: string | null;
    portfolioPerformance?: number | null;
    benchmarkPerformance?: number | null;
    portfolioValue?: number | null;
}

export class Risk{
    portfolioId?: number | null;
    year?: string | null;
    ammountDays?: number | null;
    sDforPortfolio?: number | null;
    sDforBenchmark?: number | null;
    trackingError?: number | null;
    ratio?: number | null;

}

