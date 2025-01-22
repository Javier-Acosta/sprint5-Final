import IRepository from "./IRepository.mjs";
import paisModel from "../models/paisModel.mjs"

class PaisesRepository extends IRepository {
    async obtenerPorId(id) {
        try {
            return await paisModel.findById(id).lean()

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }

    async agregarPais(datos) {
        const pais = await paisModel.create(datos)
        return pais
    }

    async obtenerTodos() {
        return await paisModel.find({ creador: 'Javier Acosta', 'name.nativeName.spa.official': { $exists: true } }).lean() //trea unicamente los documentos creados por mi, y que tengan un nombre de pais
    }


    async borrarTodos() {
        return await paisModel.deleteMany({ creador: 'Javier Acosta', 'name.nativeName.spa.official': { $exists: true } }).lean() //borra unicamente los documentos dreados por mi, y que tengan un nombre de pais
    }


    async actualizarPais(id, datos) {

        try {
            const pais = await paisModel.findByIdAndUpdate(id, { $set: datos }, { new: true, upsert: true }).lean()
            return pais

        } catch (error) {
            throw ('se produjo un error al intentar actualizar: ', error)
        }
    }


    async borrarPais(id) {
        const pais = await paisModel.findByIdAndDelete(id).lean()
        return pais
    }
}

export default new PaisesRepository()