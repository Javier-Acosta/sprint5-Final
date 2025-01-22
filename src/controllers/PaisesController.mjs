import { getAllCountries, agregarPais, obtenerTodos, borrarTodos, actualizarPaisPorId, obtenerPorId, borrarPaisPorId } from "../services/paisesServices.mjs"
import { renderizarPais } from "../views/responseView.mjs"

// obtener tosos los paises del al  api y los almacena en MongoDB

export async function obtenerCountriesController(req, res) {
    const contries = await getAllCountries()
    const respuesta = await getAllCountries(contries)
    console.log(respuesta)
    obtenerPaisesController(req, res)


}

// obtiene paises desde MongoDB

export async function obtenerPaisesController(req, res) {
    const paises = await obtenerTodos()
        // console.log('Paises', JSON.stringify(paises))

    res.render('dashboard', { paises })

}

// limpia la coleccion paises en mongoDB

export async function vaciarPaisesController(req, res) {

    const respuesta = await borrarTodos()
        // console.log('Paises borrados', JSON.stringify(respuesta))

    obtenerPaisesController(req, res)


}

// muestra formulario para cargar un pais

export async function nuevoPaisController(req, res) {
    res.render('addPais')

}

// envia los campos del formulario a mongoDb
export async function agregarPaisesController(req, res) {
    const respuesta = await agregarPais(req.body)
    res.send(respuesta)

}

// renderizala vista para ediar pais 
export async function editarController(req, res) {
    const { pais, id } = req.query
    res.render('editPais', { pais: JSON.parse(pais), id })

}

// busca un pais por ID
export async function obtenerPaisPorIdController(req, res) {
    const { id } = req.params
    const pais = await obtenerPorId(id)

    if (pais) {
        res.send(renderizarPais(pais));


    } else {
        res.status(404).send({ mensaje: 'País no encontrado' })
    }

}


// envia las modificaciones a mongoDB

export async function actualizarPaisController(req, res) {

    try {
        const pais = await actualizarPaisPorId(req.params.id, req.body)
            // console.log(pais)
        res.send(renderizarPais(pais))

    } catch (error) {
        console.error('se produjo un error', error)
    }
}



export async function borrarPaisController(req, res) {
    const pais = await borrarPaisPorId(req.params.id)
    res.send(renderizarPais(pais))
}