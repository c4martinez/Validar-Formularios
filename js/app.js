import { valida } from "./validaciones.js";
const inputs = document.querySelectorAll("input");  // Regresa siempre un arreglo

inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});