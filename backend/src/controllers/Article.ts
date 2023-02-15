import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/Article";

const createArticle = (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const { subtitle } = req.body;
    const { body } = req.body;
    const { type } = req.body;

    const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title,
        subtitle,
        body,
        date: new Date(),
        type
    });

    return article.save()
    .then(article => res.status(201).json( { article }))
    .catch(error => res.status(500).json(error));
};

const readArticle = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;

    return Article.findById(articleId)
    .then((article) => (article ? res.status(200).json( { article }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllArticle = (req: Request, res: Response, next: NextFunction) => {
    return Article.find()
    .then((articles) => (articles ? res.status(200).json( { articles }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllArticlesByType = (req: Request, res: Response, next: NextFunction) => {
    const typeId = req.params.typeId;

    return Article.find({ type: typeId })
    .then((articles) => (articles ? res.status(200).json( { articles }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const updateArticle = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;

    return Article.findById(articleId)
    .then((article) => {
        if (article){
            article.set(req.body)

            return article.save()
                .then(article => res.status(200).json( { article }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;

    return Article.findByIdAndDelete(articleId)
    .then((article) => (article ? res.status(200).json( { article }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createArticle, deleteArticle, readArticle, readAllArticle, updateArticle, readAllArticlesByType};