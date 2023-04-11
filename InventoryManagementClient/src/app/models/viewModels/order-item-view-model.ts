// export interface OrderAndOrderItemViewModel {
//     orderID?:number;
//     orderDate?:Date;
//     deliveryDate?:Date;
//     status?:Status;
//     customerID?:number;
//     orderItems?:OrderItem[];
//     customer?:Customer;
// }

import { Customer } from "../customer";
import { OrderItem } from "../order-item";
import { Status } from "./status";


export class OrderItemViewModel {
    constructor(
        public orderID?: number,
        public orderDate?: Date,
        public deliveryDate?: Date,
        public status?: Status,
        public customerID?: number,
        public orderItems?: OrderItem[],
        public customer?: Customer
    ){}
}
