import express from "express";

import { obtenerCountriesController, obtenerPaisesController, vaciarPaisesController, nuevoPaisesController, agregarPaisesController, editarController, obtenerPaisPorIdController, actualizarPaisController, borrarPaisController } from '../controllers/PaisesController.mjs'
import { paisValidation } from '../validators/paisValidator.mjs'
import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router()

router.get('/', (req, res) => { res.render('home', { 'title': 'Lista de Paises del Mundo - idioma Español' }) })

router.get('/paises/obtener', obtenerCountriesController)
router.get('/paises', obtenerPaisesController)
router.get('/paises/vaciar', vaciarPaisesController)
router.get('/paises/nuevo', nuevoPaisesController)
router.get('/paises/id/:id', obtenerPaisPorIdController)

router.post('/paises/agregar/', paisValidation(), handleValidationErrors, agregarPaisesController)
router.get('/paises/editar/', editarController) // muestra el formulario

router.put('/paises/actualizar/:id', paisValidation(), handleValidationErrors, actualizarPaisController)

router.delete('/paises/borrar/:id', borrarPaisController)

export default router;