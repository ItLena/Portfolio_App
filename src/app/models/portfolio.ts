
export class Portfolio {
    id?: number 
    name?: string 
    dateCreated?: string 
    dateDeleted?: string 
    personName?: string 
    benchmarkDescription? : string 
    portfolioValue?: number 
    lastUpdated?: string 
}

export class Position {
    id?: number | null;
    instrumentName?: string;
    instrumentType?: string 
    totalValue?: number
    date?: string  
    quantity? : number  
}

export class Performance{
    portfolioId?: number ;
    date?: string 
    portfolioPerformance?: number ;
    benchmarkPerformance?: number;
    portfolioValue?: number ;
}
    

export class Risk{
    portfolioId?: number 
    year?: string 
    ammountDays?: number 
    sDforPortfolio?: number 
    sDforBenchmark?: number
    trackingError?: number
    ratio?: number 

}

