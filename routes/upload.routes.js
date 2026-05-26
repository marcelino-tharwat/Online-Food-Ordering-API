import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/auth/protect.js';
import { adminOnly } from '../middleware/auth/adminOnly.js';
import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

router.post(
  '/admin/upload-image',
  protect,
  adminOnly,
  upload.single('image'),
  catchAsync(async (req, res) => {
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  })
);

export default router;