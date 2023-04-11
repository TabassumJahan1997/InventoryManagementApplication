// export interface ProductViewModel {
//     productId?:number;
//     productName?:string
//     price?:number
//     picture?:string;
//     canDelete?:boolean;
// }

// export interface ProductViewModel {
//     productID?:number;
//     productName?:string
//     price?:number
//     picture?:string;
//     isAvailable?:boolean;
//     canDelete?:boolean;
// }

export class ProductViewModel{
    constructor(
        public productID?: number,
        public productName?: string,
        public price?: number,
        public picture?: string ,
        public isAvailable?: boolean,
        public canDelete?: boolean
    ){}
}