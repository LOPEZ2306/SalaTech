$(document).ready(function () {

});
async function registrarUsuario() {
    let datos = {};
    datos.identificacion = document.getElementById("txtIdentificacion").value;
    datos.nombres = document.getElementById("txtNombres").value;
    datos.email = document.getElementById("txtEmail").value;
    datos.grupo = document.getElementById("txtGrupo").value;
    datos.contrasena = document.getElementById("txtPassword").value;

    if (datos.identificacion == "" || datos.nombres == "" || datos.email == "" || datos.grupo == "" || datos.contrasena == "") {
        swal.fire({
            title: "Todos los campos son obligatorios",
            text: "Intente de nuevo",
            icon: "question",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }else{
        const response = await fetch('/createEstudiante', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        console.log(response);

        if (!(response.ok)) {
            swal.fire({
                title: "Error al crear el usuario",
                text: "Intente de nuevo",
                icon: "question",
                showConfirmButton: false,
                timer: 1500
            })
            console.log("Error al crear el usuario");
        } else {
            swal.fire({
                title: "Usuario creado exitosamente",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                location.href = "index.html";
            });
        }
    }
}