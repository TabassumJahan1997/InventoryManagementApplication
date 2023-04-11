import { OrderItem } from "./order-item";
import { Status } from "./viewModels/status";


export class Order{
    constructor(
        public orderID?: number,
        public orderDate?: Date,
        public deliveryDate?: Date,
        public status?: Status,
        public customerID?: number,
        public orderItems?: OrderItem[]
    ){}
}