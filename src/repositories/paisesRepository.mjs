import pais from "../models/pais.mjs";
import IRepository from "./IRepository.mjs";

class PaisesRepository extends IRepository {
    // se obtiene todos los paises

    async obtenerPorId(id) {
        try {
            return await pais.findById(id).lean()

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }


    async obtenerTodos() {
        return await pais.find({ creador: 'Javier Acosta', 'name.nativeName.spa.official': { $exists: true } }).lean() //trea unicamente los documentos creados por mi
    }


    async borrarTodos() {
        return await pais.deleteMany({ creador: 'Javier Acosta', 'name.nativeName.spa.official': { $exists: true } }).lean() //borra unicamente los documentos dreados por mi
    }


    // agregar pais manualmente
    async agregarPais(data) {
        const nuevoPais = await pais.create(data)
        return nuevoPais;
    }

    async actualizarPaisPorId(id, data) {

        try {
            const paisActualizado = await pais.findByIdAndUpdate(id, { $set: data }, { new: true, upsert: true }).lean();
            return paisActualizado;

        } catch (error) {
            throw ('se produjo un error al intentar actualizar: ', error)
        }
    }

    async borrarPaisPorId(id) {
        const paisBorrado = await pais.findByIdAndDelete(id).lean();
        return paisBorrado
    }



}
export default new PaisesRepository();