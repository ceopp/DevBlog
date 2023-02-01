import { NextFunction, Request, Response } from "express";
import { number } from "joi";
import mongoose from "mongoose";
import Question from "../models/Question";

const createQuestion = (req: Request, res: Response, next: NextFunction) => {
    const { questionName } = req.body;
    const { questionDate } = req.body;
    const { questionText } = req.body;
    const { answerText } = req.body;
    const { answerDate } = req.body;
    const { product } = req.body;


    const question = new Question({
        _id: new mongoose.Types.ObjectId(),
        questionName,
        questionText,
        questionDate,
        answerText,
        answerDate,
        product
    });

    return question.save()
    .then(question => res.status(201).json( { question }))
    .catch(error => res.status(500).json(error));
};

const readQuestion = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    return Question.findById(questionId)
    .then((question) => (question ? res.status(200).json( { question }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllQuestion = (req: Request, res: Response, next: NextFunction) => {
    var page: any = req.query.page;
    var limit: any  = req.query.limit;


    return Question.find()
    .limit(limit * 1)
    .skip((page - 1) * parseInt(limit))
    .then((questions) => (questions ? res.status(200).json( { questions }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readProductQuestion = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Question.find({ product: productId })
    .then((questions) => (questions ? res.status(200).json( { questions }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

const readRandomQuestions = (req: Request, res: Response, next: NextFunction) => {
    var random = Math.floor(Math.random());
    return Question.find().skip(random).limit(5)
    
    .then((questions) => (questions ? res.status(200)
    .json( { questions }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const updateQuestion = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    return Question.findById(questionId)
    .then((question) => {
        if (question){
            question.set(req.body)

            return question.save()
                .then(question => res.status(200).json( { question }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteQuestion = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.questionId;

    return Question.findByIdAndDelete(questionId)
    .then((question) => (question ? res.status(200).json( { question }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createQuestion, deleteQuestion, readQuestion, readAllQuestion, updateQuestion, readRandomQuestions,  readProductQuestion};