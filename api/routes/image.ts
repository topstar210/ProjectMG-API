import express from 'express';
import { uploadImage } from '../controllers/imageCtrl';

const router = express.Router();

router.post('/upload', uploadImage);

export default router;
