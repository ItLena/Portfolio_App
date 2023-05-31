export class Person {
    firstName!: string ;
    lastName!: string ;
    userName!: string ;
    password!: string ;
    personRole: string = "customer";
    id!: number;
    
}

export class Login{
    userName?: string | null;
    password?: string | null;
}