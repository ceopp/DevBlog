import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Type from "../models/Type";

const createType = (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;

    const type = new Type({
        _id: new mongoose.Types.ObjectId(),
        title
    });

    return type.save()
    .then(type => res.status(201).json( { type }))
    .catch(error => res.status(500).json(error));
};

const readType = (req: Request, res: Response, next: NextFunction) => {
    const typeId = req.params.typeId;

    return Type.findById(typeId)
    .then((type) => (type ? res.status(200).json( { type }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllType = (req: Request, res: Response, next: NextFunction) => {
    return Type.find()
    .then((types) => (types ? res.status(200).json( { types }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const updateType = (req: Request, res: Response, next: NextFunction) => {
    const typeId = req.params.typeId;

    return Type.findById(typeId)
    .then((type) => {
        if (type){
            type.set(req.body)

            return type.save()
                .then(type => res.status(200).json( { type }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteType = (req: Request, res: Response, next: NextFunction) => {
    const typeId = req.params.typeId;

    return Type.findByIdAndDelete(typeId)
    .then((type) => (type ? res.status(200).json( { type }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createType, deleteType, readType, readAllType, updateType };