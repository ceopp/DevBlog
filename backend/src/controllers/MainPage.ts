import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import MainPage from "../models/MainPage";

const createMainPage = (req: Request, res: Response, next: NextFunction) => {
    const { navigation } = req.body;
    const { about } = req.body;
    const { contacts } = req.body;


    const mainPage = new MainPage({
        _id: new mongoose.Types.ObjectId(),
        navigation,
        about,
        contacts
    });

    return mainPage.save()
    .then(mainPage => res.status(201).json( { mainPage }))
    .catch(error => res.status(500).json(error));
};

const readMainPage = (req: Request, res: Response, next: NextFunction) => {
    const mainPageId = req.params.mainPageId;

    return MainPage.findById(mainPageId)
    .then((mainPage) => (mainPage ? res.status(200).json( { mainPage }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllMainPage = (req: Request, res: Response, next: NextFunction) => {
    return MainPage.find()
    .then((mainPages) => (mainPages ? res.status(200).json( { mainPages }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};


const updateMainPage = (req: Request, res: Response, next: NextFunction) => {
    const mainPageId = req.params.mainPageId;

    return MainPage.findById(mainPageId)
    .then((mainPage) => {
        if (mainPage){
            mainPage.set(req.body)

            return mainPage.save()
                .then(mainPage => res.status(200).json( { mainPage }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteMainPage = (req: Request, res: Response, next: NextFunction) => {
    const mainPageId = req.params.mainPageId;

    return MainPage.findByIdAndDelete(mainPageId)
    .then((mainPage) => (mainPage ? res.status(200).json( { mainPage }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createMainPage, deleteMainPage, readMainPage, readAllMainPage, updateMainPage};