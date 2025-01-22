export function renderizarPais(pais) {
    return {
        Nombre: pais.name.nativeName.spa.official,
        capital: pais.capital.join(', '),
        fronteras: pais.borders.join(', '),
        area: pais.area,
        poblacion: pais.population,
        // aniogini: pais.gini.
        timezones: pais.timezones.join(', ')
    }

}