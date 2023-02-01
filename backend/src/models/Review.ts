import mongoose, { Document, Schema} from "mongoose";

export interface IReview {
    reviewerName: string;
    rating: number;
    date: Date;
    reviewText: string;
    likes: number;
    reviewImage: string;
    product: string;
}

export interface IReviewModel extends IReview, Document {

}

const ReviewSchema: Schema = new Schema(
    {
        reviewerName: { type: "string", required: true },
        rating: { type: "number", required: true },
        date: { type: "Date", required: true },
        reviewText: { type: "string", required: true },
        likes: { type: "number", required: true },
        reviewImage: { type: "string", required: true },
        product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IReviewModel>('Review', ReviewSchema)