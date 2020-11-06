import { Router } from 'express';
const router = Router();
import { validate, create, retrieve, retrieveById, updateById, deleteById } from '../app/api/controllers/users.js';
router.post('/register', validate('createUser'), create);
router.get('/', retrieve);
router.get('/:id', retrieveById);
router.put('/:id', validate('updateUser'), updateById);
router.delete('/', validate('deleteUser'), deleteById);
export default router;
