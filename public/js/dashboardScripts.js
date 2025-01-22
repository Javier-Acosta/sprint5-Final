window.addEventListener("load", () => {



    // Obtener solo inputs de tipo button editar

    const inputsButtonEditar = document.querySelectorAll('.button-editar');
    const inputsButtonEliminar = document.querySelectorAll('.button-eliminar');


    inputsButtonEditar.forEach(input => {
        input.addEventListener('click', () => {
            //alert(input.id)
            let pais = {}

            fetch(`/paises/id/${input.value}`)
                .then(response => response.json())
                .then(response => pais = JSON.stringify(response))
                //  .then(response => console.log(pais))
                .then(response => window.location.href = `paises/editar?id=${input.value}&pais=${pais}`)

            .catch(error => {
                console.error('Error:', error);
            });
        })
    });

    //// boton Eliminar
    inputsButtonEliminar.forEach(input => {

        input.addEventListener('click', () => {
            const respuesta = confirm('esta seguro que quiere eliminar el país')
            if (respuesta) {
                let pais = {}

                fetch(`/paises/borrar/${input.value}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(response => pais = JSON.stringify(response))
                    .then(response => {
                        //alert(`se elimino correctamente a ${response.Nombre}`)
                        location.reload();
                    })

                .catch(error => {
                    console.error('Error:', error);
                });
            }
        })
    });


})