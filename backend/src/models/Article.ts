import mongoose, { Document, Schema} from "mongoose";

export interface IArticle {
    title: string;
    subtitle: string;
    body: string;
    date: Date;
    type: string;
}

export interface IArticleModel extends IArticle, Document {

}

const ArticleSchema: Schema = new Schema(
    {
    title: { type: "string", required: true },
    substring: { type: "string", required: true},
    body: { type: "string", required: true},
    date: { type: "Date", required: false},
    type: { type: Schema.Types.ObjectId, required: true, ref: "Type" }
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IArticleModel>('Article', ArticleSchema)