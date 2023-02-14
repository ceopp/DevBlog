import express from 'express';
import controller from '../controllers/Product';

const router = express.Router();

router.post('/create', controller.createProduct);
router.get('/get/:productId', controller.readProduct);
router.get('/get/', controller.readAllProduct);
router.patch('/update/:productId', controller.updateProduct);
router.delete('/delete/:productId', controller.deleteProduct);
router.get('/random/', controller.readRandomProducts);
router.get('/search/', controller.searchProducts);

export = router;