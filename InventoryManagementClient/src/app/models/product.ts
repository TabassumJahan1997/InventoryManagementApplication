


export class Product{
    constructor(
        public productID?:number,
        public productName? :string,
        public price?: number,
        public picture?: string,
        public isAvailable?: boolean,
        public orderItems?: string[]
    ){}
}