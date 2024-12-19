import PaisesRepository from "../repositories/paisesRepository.mjs";
import pais from "../models/pais.mjs"; 

const API_URL = 'https://restcountries.com/v3.1/all';


export async function obtenerPaises (){
    try {
        const response= await axios.get (API_URL);
        return response.data;
    }catch (error){
        console.log(`Error, no se pudo obtner resultado ${API_URL}`);
        throw error;
    }
}