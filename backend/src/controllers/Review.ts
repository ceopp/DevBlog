import { NextFunction, Request, Response } from "express";
import { number } from "joi";
import mongoose from "mongoose";
import Review from "../models/Review";

const createReview = (req: Request, res: Response, next: NextFunction) => {
    const { reviewerName } = req.body;
    const { rating } = req.body;
    const { date } = req.body;
    const { reviewText } = req.body;
    const { likes } = req.body;
    const { reviewImage } = req.body;
    const { product } = req.body;


    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        reviewerName,
        rating,
        reviewText,
        date,
        reviewImage : "https://www.burmunk.am/media/500x500/2020/268/bloom.jpg",
        likes,
        product
    });

    return review.save()
    .then(review => res.status(201).json( { review }))
    .catch(error => res.status(500).json(error));
};

const readReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findById(reviewId)
    .then((review) => (review ? res.status(200).json( { review }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllReview = (req: Request, res: Response, next: NextFunction) => {
    var page: any = req.query.page;
    var limit: any  = req.query.limit;


    return Review.find()
    .limit(limit * 1)
    .skip((page - 1) * parseInt(limit))
    .then((reviews) => (reviews ? res.status(200).json( { reviews }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readProductReview = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Review.find({ product: productId })
    .then((reviews) => (reviews ? res.status(200).json( { reviews }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

const readRandomReviews = (req: Request, res: Response, next: NextFunction) => {
    var random = Math.floor(Math.random());
    return Review.find().skip(random).limit(5)
    
    .then((reviews) => (reviews ? res.status(200)
    .json( { reviews }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const updateReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findById(reviewId)
    .then((review) => {
        if (review){
            review.set(req.body)

            return review.save()
                .then(review => res.status(200).json( { review }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteReview = (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return Review.findByIdAndDelete(reviewId)
    .then((review) => (review ? res.status(200).json( { review }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createReview, deleteReview, readReview, readAllReview, updateReview, readRandomReviews,  readProductReview};