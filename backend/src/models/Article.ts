import mongoose, { Document, Schema} from "mongoose";

export interface IArticle {
    title: string;
    body: string;
}

export interface IArticleModel extends IArticle, Document {

}

const ArticleSchema: Schema = new Schema(
    {
    title: { type: "string", required: true },
    body: { type: "string", required: true },
    date: {type: "date", required: true },
    //add TypeId
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IArticleModel>('Type', ArticleSchema)