import { CountryModel } from "../models/countryModel.mjs";
import PaisesRepository from '../repositories/paisesRepository.mjs'

const repository = PaisesRepository

export function obtenerTodoslosPaises() {
    const paises = repository.obtenerTodos()
    return paises
}


// Servicio para consumir la API


// trae todos los paises desde la api
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
export function obtenerPaisPorId(id) {
    const pais = repository.obtenerPorId(id)
    return pais
}


//actualiza el documento mongodb
export async function actualizarPais(id, datos) {
    const pais = await repository.actualizarPais(id, datos)
    return pais
}

//borra un pais indicando el ID
export async function borrarPais(id) {
    const pais = await repository.borrarPais(id)
    return pais
}