import { getAllCountries, agregarPais, obtenerTodos, borrarTodos, obtenerPaisPorId, actualizarPais, borrarPais } from "../services/paisesServices.mjs"
import { renderizarPais } from "../views/responseView.mjs"

//obtiene todos los paises de la api y los almacena en mongoDB
export async function obtenerCountriesController(req, res) {
    const countries = await getAllCountries()
        // console.log('countries', JSON.stringify(countries))
    const respuesta = await agregarPais(countries)
        //console.log(respuesta)
        //await res.render('dashboard',  { paises })
    obtenerPaisesController(req, res)
}

//obtiene los paises desde mongodb
export async function obtenerPaisesController(req, res) {
    const paises = await obtenerTodos()
        //  console.log('Paises', JSON.stringify(paises))

    res.render('dashboard', { paises })
}

//limpia la coleccon paises en mongodb
export async function vaciarPaisesController(req, res) {
    const respuesta = await borrarTodos()
        //  console.log('Paises borrados', JSON.stringify(respuesta))
    obtenerPaisesController(req, res)
}

//muestra el formulario para cargar un nuevo pais
export async function nuevoPaisesController(req, res) {
    res.render('addPais')
}

//envia los campos del formulario a mongodb
export async function agregarPaisesController(req, res) {
    const respuesta = await agregarPais(req.body)
        //console.log(respuesta)
    res.send(respuesta)
        // obtenerPaisesController(req, res)

}

//renderiza la vista para editar el pais
export async function editarController(req, res) {
    const { pais, id } = req.query
    res.render('editPais', { pais: JSON.parse(pais), id })
}

// busca un pais por ID
export async function obtenerPaisPorIdController(req, res) {
    const { id } = req.params
    const pais = await obtenerPaisPorId(id)

    if (pais) {
        res.send(renderizarPais(pais));
    } else {
        res.status(404).send({ mensaje: 'País no encontrado' })
    }

}

// envia las modificaciones a mongodb
export async function actualizarPaisController(req, res) {

    try {
        const pais = await actualizarPais(req.params.id, req.body)
            // console.log(pais)
        res.send(renderizarPais(pais))

    } catch (error) {
        console.error('se produjo un error', error)
    }
}



export async function borrarPaisController(req, res) {
    const pais = await borrarPais(req.params.id)
    res.send(renderizarPais(pais))
}