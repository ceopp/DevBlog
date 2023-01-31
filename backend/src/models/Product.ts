import mongoose, { Document, Schema} from "mongoose";

export interface IProduct {
    title: string;
    description: string;
    mainImage: string;
    price: number;
    oldPrice: number;
    salePercent: number;
    pointsForSale: number;
    priceForUnit: string;
    brand: string;
    line: string;
    stock: number;
    rating: number;
    ratingQuantity: number;
    productImages: string[];
    productCharacteristics:  { [title: string]: string }
}

export interface IProductModel extends IProduct, Document {

}

const ProductSchema: Schema = new Schema(
    {
    title: { type: "string", required: true },
    description: { type: "string", required: true},
    mainImage:  { type: "string", required: true, default: "https://www.burmunk.am/media/500x500/2020/268/bloom.jpg"},
    price: { type: "number", required: true},
    oldPrice: { type: "number", required: false, default: null },
    salePercent: { type: "string", required: false, default: null },
    pointsForSale: { type: "string", required: false, default: null },
    priceForUnit: { type: "string", required: false, default: null },
    brand: { type: "string", required: true},
    line: { type: "string", required: true},
    stock:  { type: "number", required: true},
    rating: { type: "number", required: false, default: null },
    ratingQuantity: { type: "number", required: false, default: 0 },
    productImages: [String],
    productCharacteristics: [Schema.Types.Mixed],
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IProductModel>('Product', ProductSchema)