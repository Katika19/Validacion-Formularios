export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]) {
        validadores[tipoInput](input);
    }
    console.log(input.parentElement);
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input)
    }
};

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesError ={
    nombre: {
        valueMissing: "El Campo Nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El Campo Email no puede estar vacío",
        typeMismatch: "Correo no valido",
    },
    password: {
        valueMissing: "El Campo password no puede estar vacío",
        patternMismatch: "Utilice mayúsculas, minúsculas y números; utilice entre 6 y 12 caracteres; no use caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El Campo nacimiento no puede estar vacío",
        customError: "Debes ser mayor de 18 años",
    },
    numero: {
        valueMissing: "El Campo teléfono no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 números",
    },
    direccion: {
        valueMissing: "El Campo Dirección no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El Campo Ciudad no puede estar vacío",
        patternMismatch: "El formato requerido es de 4 a 15 caracteres",
    },
    estado: {
        valueMissing: "El Campo Estado no puede estar vacío",
        patternMismatch: "El formato requerido es de 4 a 15 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input) {
    let mensaje ="";
    tipoErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error]);
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Debes ser mayor de 18 años";
    }
input.setCustomValidity(mensaje);
}
function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth (),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
