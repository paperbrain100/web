
import express from 'express';
import { create, read, readById, update, remove } from '../controllers/userController.js';

const router = express.Router();

router.post('/', create);
router.get('/', read);
router.get('/:id', readById);
router.put('/:id', update);

export default router;
