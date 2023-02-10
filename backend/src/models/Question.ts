import mongoose, { Document, Schema} from "mongoose";

export interface IQuestion {
    questionName: string;
    questionDate: Date;
    answerDate: Date;
    questionText: string;
    answerText: string;
    product: string;
}

export interface IQuestionModel extends IQuestion, Document {

}

const QuestionSchema: Schema = new Schema(
    {
        questionName: { type: "string", required: true },
        questionDate: { type: "Date", required: true },
        questionText: { type: "string", required: true },
        answerText: { type: "string", required: false },
        product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IQuestionModel>('Question', QuestionSchema)