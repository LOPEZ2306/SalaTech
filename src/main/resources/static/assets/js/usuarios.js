function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

var currentPage = 1;
const usersPerPage = 6;
var totalPages = 1;
function cargarUsuarios() {
    return fetch(`getEstudiantes?page=${currentPage}&pageSize=${usersPerPage}`, {
        method: 'GET',
        headers: getHeaders()
    }).then((response)=> {
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar los usuarios',
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                location.href = "usuarios.html";
            });
        }
        // Actualizar el número de página actual
        document.querySelector("#currentPage").innerText = currentPage;

        // Obtener el número total de páginas del encabezado personalizado
        const lastPageHeader = response.headers.get('X-Last-Page');
        totalPages = parseInt(lastPageHeader);

        // Habilitar o deshabilitar los botones de paginación
        const prevButton = document.querySelector("#btn-prev");
        const nextButton = document.querySelector("#btn-next");
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        return response.json();
    }).then((usuarios) => {
        let listadoHtml = '';
        for (let usuario of usuarios) {

            let usuarioHtml = '<tr><td><div class="user-info"><div class="user-info__img">' +
                '<p class="text-muted mb-0">' + usuario.nombres + '</p></div></div>' +
                '</td><td>' + usuario.email + '</td><td>' + usuario.identificacion +
                '</td><td>' + usuario.grupo + '</td>' + '<td><div class="dropdown open">' +
                '<a href="#!" class="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<i class="fa fa-ellipsis-v"></i></a><div class="dropdown-menu" aria-labelledby="triggerId1">' +
                '<a class="dropdown-item" href="#" onclick="editarUsuario(' + usuario.id_estudiante + ')"><i class="fa fa-pencil mr-1"></i> Editar</a>' +
                '<a class="dropdown-item text-danger" href="#" onclick="eliminarUsuario(' + usuario.id_estudiante + ')">' +
                '<i class="fa fa-trash mr-1"></i> Eliminar</a></div></div></td></tr>';

            listadoHtml += usuarioHtml + '</tr>';
        }
        document.querySelector("#usuarios tbody").innerHTML = listadoHtml;

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        });

        Toast.fire({
            icon: 'success',
            html: '<h6>Usuarios cargados correctamente</h6>'
        });
    })
        .catch((error) => {
            console.error("Error al cargar las publicaciones:", error);
        });
}

cargarUsuarios()
    .then(() => {
    })
    .catch((error) => {
        console.error("Error en el manejo de la promesa cargarUsuarios():", error);
    });

function paginaAnterior() {
    if (currentPage > 1) {
        currentPage--;
        cargarUsuarios();
    }
}

function paginaSiguiente() {
    if (currentPage < totalPages) {
        currentPage++;
        cargarUsuarios();
    }
}

async function eliminarUsuario(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertirlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true,
        confirmButtonColor: '#50C878',
        cancelButtonColor: '#cf142b'
    }).then(async (result) => {
        if (result.isConfirmed) {

            const response = await fetch('/deleteEstudiante/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });

            swalWithBootstrapButtons.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
            ).then(() => {
                cargarUsuarios();
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu usuario está seguro :)',
                'error'
            )
        }
    })
}


async function editarUsuario(id) {
    // obtener información del usuario
    const request = await fetch('/getEstudianteById/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const usuario = await request.json();

    const {value: formValues} = await Swal.fire({
        title: 'Editar usuario',
        html:
            '<label for="swal-input1">Nombres:&#160 &#160 &#160 &#160</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + usuario.nombres + '">' +
            '<label for="swal-input2">Identificacion: </label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="identificacion" value="' + usuario.identificacion + '">' +
            '<label for="swal-input4">Grupo:&#160 &#160 &#160 &#160 &#160 &#160</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="grupo" value="' + usuario.grupo + '">' +
            '<label for="swal-input3">Email:&#160 &#160 &#160 &#160 &#160 &#160 &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + usuario.email + '">',

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
    });

    if (formValues) {
        const nombres = document.getElementById("swal-input1").value;
        const identificacion = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const grupo = document.getElementById("swal-input4").value;

        const nuevoUsuario = {
            nombres,
            identificacion,
            email,
            grupo,
        };

        // actualizar usuario
        const response = await fetch('/updateEstudiante/' + usuario.id_estudiante, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(nuevoUsuario)
        });

        if (response.ok) {
            // si la actualización fue exitosa, mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente'
            }).then(() => {
                cargarUsuarios();
            });
        } else {
            // si la actualización falló, mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar el usuario'
            });
        }
    }
}