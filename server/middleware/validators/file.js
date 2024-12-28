import { body } from 'express-validator';

export const createFileValidator = [
    body('name').trim().notEmpty().withMessage('Nome do arquivo é obrigatório'),
    body('size').isInt({ min: 1 }).withMessage('Tamanho do arquivo inválido'),
    body('type').trim().notEmpty().withMessage('Tipo do arquivo é obrigatório')
];