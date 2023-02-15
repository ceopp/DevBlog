import mongoose, { Document, Schema} from "mongoose";

export interface IMainPage {
    navigation: string[];
    about: string;
    contacts: { [title: string]: string };
}

export interface IMainPageModel extends IMainPage, Document {

}

const MainPageSchema: Schema = new Schema(
    {
    navigation: [String],
    about: { type: "string", required: true},
    contacts: [Schema.Types.Mixed],
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<IMainPageModel>('MainPage', MainPageSchema)