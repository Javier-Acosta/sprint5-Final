import { body } from 'express-validator'

export const paisValidation = () => [
    body('name.nativeName.spa.official').notEmpty().withMessage('el nombre del pais es requerido').trim().isLength({ min: 3, max: 90 }).withMessage('El nombre del pais debe tener como mínimo 3 caracteres y máximo 90'),

    body('capital.*').notEmpty().withMessage('debe indicar la capital').trim().isLength({ min: 3, max: 90 }).withMessage('La capital debe tener como minimo 3 caracteres y maximo 90'),

    body('borders.*').isString().withMessage('Cada elemento debe ser un string').isLength({ min: 3, max: 3 }).withMessage('Cada país de frontera debe tener exactamente 3 caracteres').toUpperCase(), //.matches(/^[A-Z]{3}$/).withMessage('Cada elemento debe ser 3 letras mayúsculas'),

    body('area').trim().isNumeric({ min: 0 }).withMessage('area debe ser un número positivo'),

    body('population').trim().isInt({ min: 0 }).withMessage('poblacion debe ser un número entero positivo'),
    // body('aniogini').trim().isNumeric({ min: 0, max:2024 }).withMessage('debe indicar un año válido'),
    // body('valorgini').trim().isNumeric({ min: 0 , max:100}).withMessage('debe ingresar un valor entre 0 y 100'),
]