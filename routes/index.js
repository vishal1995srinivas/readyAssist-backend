import { Router } from 'express';
const router = Router();
import { validate, create, retrieve } from '../app/api/controllers/users.js';

router.post('/register', validate('createUser'), create);
export default router;
