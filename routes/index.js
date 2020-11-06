import { Router } from 'express';
const router = Router();
import { validate, create, retrieve, retrieveById, updateById } from '../app/api/controllers/users.js';
router.post('/register', validate('createUser'), create);
router.get('/', retrieve);
router.get('/:id', retrieveById);
router.put('/:id', validate('updateUser'), updateById);

export default router;
// items?limit=20&offset=100
