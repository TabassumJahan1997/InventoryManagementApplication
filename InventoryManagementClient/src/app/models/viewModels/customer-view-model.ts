export class CustomerViewModel {
    constructor(
        public customerID?: number,
        public customerName?: string,
        public address?: string,
        public email?: string,
        public canDelete?: boolean
    ){}
}

// export interface CustomerViewModel {
//     customerID?:number;
//     customerName?:string;
//     address?:string;
//     email?:string;
//     canDelete?:boolean
// }