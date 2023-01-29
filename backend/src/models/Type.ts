import mongoose, { Document, Schema} from "mongoose";

export interface IType {
    title: string;
}

export interface ITypeModel extends IType, Document {

}

const TypeSchema: Schema = new Schema(
    {
    title: { type: "string", required: true }
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<ITypeModel>('Type', TypeSchema)