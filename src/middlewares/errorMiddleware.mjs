import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            message: 'se detectectó un fsllo, la validación no se realizó',
            error: error.array().map(error => ({
                filed: error.param,
                message: error.msg,
            }))

        })
    }
    next()
}