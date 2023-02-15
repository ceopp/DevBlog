import express from 'express';
import controller from '../controllers/MainPage';

const router = express.Router();

router.post('/create', controller.createMainPage);
router.get('/get/:mainPageId', controller.readMainPage);
router.get('/get/', controller.readAllMainPage);
router.patch('/update/:mainPageId', controller.updateMainPage);
router.delete('/delete/:mainPageId', controller.deleteMainPage);

export = router;