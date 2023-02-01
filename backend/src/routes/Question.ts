import express from 'express';
import controller from '../controllers/Question';

const router = express.Router();

router.post('/create', controller.createQuestion);
router.get('/get/:questionId', controller.readQuestion);
router.get('/get/', controller.readAllQuestion);
router.patch('/update/:questionId', controller.updateQuestion);
router.delete('/delete/:questionId', controller.deleteQuestion);
router.get('/random/', controller.readRandomQuestions);
router.get('/get/questionsById/:productId', controller.readProductQuestion);

export = router;