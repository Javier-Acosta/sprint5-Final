import pais from "../models/pais.mjs";
import IRepository from "./IRepository.mjs";

class PaisesRepository extends IRepository {
    // se obtiene todos los paises

    async obtenerPorId(id) {
        try {
            return await pais.findById(id)

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }

    async obtenerTodos() {
        return await pais.find({creador:"Javier Acosta"});
    }

    

  

// agregar pais manualmente
    async agregarPais(data) {        
        const nuevoPais= await pais.create(data)        
        return nuevoPais;
    }

    async actualizarPaisPorId(id, data) {  
        
        try {   
            const paisActualizado= await pais.findByIdAndUpdate( id, { $set:data }, { new : true , upsert: true}) ;                       
            return paisActualizado;
            
        } catch (error) {
            throw('se produjo un error al intentar actualizar: ',error)
        }          
    }

    async borrarPaisPorId(id) {        
        const paisBorrado= await pais.findByIdAndDelete( id);      
        return paisBorrado
    }
    
    

}
export default new PaisesRepository();
