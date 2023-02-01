import express from 'express';
import controller from '../controllers/Review';

const router = express.Router();

router.post('/create', controller.createReview);
router.get('/get/:reviewId', controller.readReview);
router.get('/get/', controller.readAllReview);
router.patch('/update/:reviewId', controller.updateReview);
router.delete('/delete/:reviewId', controller.deleteReview);
router.get('/random/', controller.readRandomReviews);
router.get('/get/reviewsById/:productId', controller.readProductReview);

export = router;