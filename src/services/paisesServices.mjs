import { CountryModel } from "../models/countryModel.mjs";
import paisesRepository from "../repositories/paisesRepository.mjs";

const repository = paisesRepository

export function obtenerTodosLosPaises() {
    const paises = repository.obtenerTodos()
    return paises
}


export async function getAllCountries() {


    const API_URL = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const todosLosPaises = CountryModel.fromAPI(data);
        return CountryModel.findSpanishSpeakingCountries(todosLosPaises);

    } catch (error) {
        console.error('Se produjo un error al consumir la api:', error);
        throw error;
    }

}


// export async function obtenerPaises() {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (error) {
//         console.log(`Error, no se pudo obtner resultado ${API_URL}`);
//         throw error;
//     }
// }

async function getCountriesByRegion(region) {
    const allCountries = await this.getAllCountries();
    return CountryModel.findByRegion(allCountries, region);
}

//almacena los paises en la coleccion de mongoDB
export async function agregarPais(datos) {
    const pais = repository.agregarPais(datos);
    return pais
}

//trae los paises de la coleccion de mongoDB
export async function obtenerTodos() {
    const paises = repository.obtenerTodos();
    return paises
}


//borrar todos los paises de la coleccion de mongoDB
export async function borrarTodos() {
    const paises = repository.borrarTodos();
    return paises
}


//obtiene el pais para el ID indicado
export function obtenerPorId(id) {
    const pais = repository.obtenerPorId(id)
    return pais
}


//actualiza el documento mongodb
export async function actualizarPaisPorId(id, datos) {
    const pais = await repository.actualizarPaisPorId(id, datos)
    return pais
}

//borra un pais indicando el ID
export async function borrarPaisPorId(id) {
    const pais = await repository.borrarPaisPorId(id)
    return pais
}