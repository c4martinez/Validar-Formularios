export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = monstrarMensajeError(tipoInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener minuscula y mayuscula, numeros, no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido  es +56912345678"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Debe contener minimo 10 caracteres y un maximo de 40, permite caracteres especiales"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function monstrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]){
            mensaje = mensajesError[tipoInput][error];
        }
    })

    return mensaje;
}
function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    };

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}