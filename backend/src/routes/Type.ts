import express from 'express';
import controller from '../controllers/Type';

const router = express.Router();

router.post('/create', controller.createType);
router.get('/get/:typeId', controller.readType);
router.get('/get/', controller.readAllType);
router.patch('/update/:typeId', controller.updateType);
router.delete('/delete/:typeId', controller.deleteType);

export = router;