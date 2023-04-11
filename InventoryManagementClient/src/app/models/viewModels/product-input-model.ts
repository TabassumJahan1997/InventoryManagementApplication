// export class ProductInputModel {
// }

// export interface ProductInputModel {
//     productId?:number;
//     productName?:string;
//     price?:number;
// }

// export interface ProductInputModel {
//     productID?:number;
//     productName?:string;
//     price?:number;
//     isAvailable?:boolean;
// }

export class ProductInputModel{
    constructor(
        public productID?: number,
        public productName?: string,
        public price?: number,
        public isAvailable?:boolean
    ){}
}