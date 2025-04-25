import express from 'express';
import atmRoutes from './atmRoutes';

const router = express.Router();

router.use('/atm', atmRoutes);

export default router;
