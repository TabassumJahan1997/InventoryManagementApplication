// export class OrderViewModel {
// }
// export interface OrderViewModel {
//     orderID?:number;
//     orderDate?:Date;
//     deliveryDate?:Date;
//     status?:Status;
//     customerID?:number;
//     customerName?:string;
//     orderValue?:number;
// }

import { Status } from "./status";

export class OrderViewModel{
    constructor(
        public orderID?: number,
        public orderDate?: Date,
        public deliveryDate?: Date,
        public status?: Status,
        public customerID?: number,
        public customerName?: string,
        public orderPrice?: number
    ){}
}