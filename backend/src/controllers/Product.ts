import { NextFunction, Request, Response } from "express";
import { number } from "joi";
import mongoose from "mongoose";
import Product from "../models/Product";

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const { description } = req.body;
    const { price } = req.body;
    const { oldPrice } = req.body;
    const { salePercent } = req.body;
    const { pointsForSale } = req.body;
    const { priceForUnit } = req.body;
    const { brand } = req.body;
    const { line } = req.body;
    const { stock } = req.body;
    const { rating } = req.body;
    const { ratingQuantity } = req.body;
    const { productImages } = req.body;
    const { productCharacteristics } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        price,
        mainImage : "https://www.burmunk.am/media/500x500/2020/268/bloom.jpg",
        oldPrice,
        salePercent,
        pointsForSale,
        priceForUnit,
        brand,
        line,
        stock,
        rating,
        ratingQuantity,
        productImages,
        productCharacteristics
    });

    return product.save()
    .then(product => res.status(201).json( { product }))
    .catch(error => res.status(500).json(error));
};

const readProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
    .then((product) => (product ? res.status(200).json( { product }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readAllProduct = (req: Request, res: Response, next: NextFunction) => {
    var page: any = req.query.page;
    var limit: any  = req.query.limit;


    return Product.find()
    .limit(limit * 1)
    .skip((page - 1) * parseInt(limit))
    .then((products) => (products ? res.status(200).json( { products }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const readRandomProducts = (req: Request, res: Response, next: NextFunction) => {
    var random = Math.floor(Math.random());
    return Product.find().skip(random).limit(5)
    
    .then((products) => (products ? res.status(200)
    .json( { products }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const searchProducts = (req: Request, res: Response, next: NextFunction) => {
    var page: any = req.query.page;
    var limit: any  = req.query.limit;
    var searchQuery: any = req.query.search;


    return Product.find({ 'title': searchQuery})
    .limit(limit * 1)
    .skip((page - 1) * parseInt(limit))
    .then((products) => (products ? res.status(200).json( { products }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
    .then((product) => {
        if (product){
            product.set(req.body)

            return product.save()
                .then(product => res.status(200).json( { product }))
                .catch(error => res.status(500).json(error));
        }
        else{
            return res.status(404).json( { message: 'Not Found'})
        }
    })
    .catch(error => res.status(500).json(error))
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findByIdAndDelete(productId)
    .then((product) => (product ? res.status(200).json( { product }) : res.status(404).json( { message: 'Not Found'})))
    .catch(error => res.status(500).json(error))
}

export default { createProduct, deleteProduct, readProduct, readAllProduct, updateProduct, readRandomProducts, searchProducts };