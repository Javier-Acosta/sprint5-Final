import express from 'express'
import { connectDB } from './src/config/dbConfig.mjs'
import router from './src/routes/paisesRoutes.mjs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import expreLayouts from 'express-ejs-layouts';

const app = express()
const PORT = 3500


// Simular __dirname en ES Modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// Configurar carpeta estática
app.use(express.static(join(__dirname, 'public')));

// Configurar directorio de vistas y motor de plantillas
app.set('views', join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


// configure express latouts
app.use(expreLayouts);
app.set('layouts', 'layout');


app.use(express.json())

connectDB()

app.use('/', router)

app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})