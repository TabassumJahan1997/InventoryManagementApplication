

import { Product } from "./product";

export class OrderItem{
    constructor(
        public orderID?: number,
        public productID?: number,
        public quantity?: number,
        public product?: Product
    ){}
}