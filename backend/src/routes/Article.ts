import express from 'express';
import controller from '../controllers/Article';

const router = express.Router();

router.post('/create', controller.createArticle);
router.get('/get/:articleId', controller.readArticle);
router.get('/get/', controller.readAllArticle);
router.patch('/update/:articleId', controller.updateArticle);
router.delete('/delete/:articleId', controller.deleteArticle);
router.get('/get/:typeId', controller.readAllArticlesByType);

export = router;