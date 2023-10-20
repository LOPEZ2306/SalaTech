(function () {
	'use strict'

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			}, false)
		})
})()

async function iniciarSesion() {

	const email = document.getElementById('txtEmail').value;
	const contrasena = document.getElementById('txtPassword').value;

	const response = await fetch("/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			contrasena: contrasena
		})
	});

	if (!(response.ok)) {
		swal.fire({
			title: "Usuario o contraseña incorrectos",
			text: "Intente de nuevo",
			icon: "question",
			showConfirmButton: false,
			timer: 1500
		})
	} else {
		swal.fire({
			title: "Bienvenido",
			icon: "success",
			showConfirmButton: false,
			timer: 1500
		}).then(function () {
			location.href = "index.html";
		});
	}
}