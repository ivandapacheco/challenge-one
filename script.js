// Elementos del DOM
const imagenMuneco = document.getElementById('imagenMuneco');
const textArea = document.getElementById('textArea');
const textoOriginal = document.getElementById('texto');
const textoEncriptado = document.getElementById('textoEncriptado');
const copyButton = document.getElementById('copyButton');

// Funciones de encriptación y desencriptación
const encriptar = (texto) => {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
};

const desencriptar = (texto) => {
    return texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
};

// Mostrar mensaje temporal en un textarea específico
const mostrarMensajeTemporal = (mensaje, textarea) => {
    
    // Mostrar el mensaje temporal
    textarea.value = mensaje;
    setTimeout(() => {
        textoOriginal.value = ""; 
        textoOriginal.focus();
    }, 3000);
    
};

// Actualizar visibilidad de secciones
const actualizarVisibilidad = (mostrarResultado) => {
    if (mostrarResultado) {
        imagenMuneco.classList.add('display-none');
        textArea.classList.remove('display-none');
    } else {
        imagenMuneco.classList.remove('display-none');
        textArea.classList.add('display-none');
    }
};

// Encriptar texto
function encriptarTexto() {
    const texto = textoOriginal.value;

    if (!/[aeiou]/i.test(texto)) {
        mostrarMensajeTemporal("Oops. No se pudo encriptar tu mensaje 😔", textoOriginal);
        return;
    }

    textoOriginal.value = "";
    textoEncriptado.value = encriptar(texto);
    actualizarVisibilidad(true);

    textoEncriptado.focus();

}

// Desencriptar texto
function desencriptarTexto() {
    const texto = textoOriginal.value;

    if (!/(enter|imes|ai|ober|ufat)/.test(texto)) {
        mostrarMensajeTemporal("Oops. No se pudo desencriptar tu mensaje 😔", textoOriginal);
        return;
    }

    textoOriginal.value = "";
    textoEncriptado.value = desencriptar(texto);
    actualizarVisibilidad(true);

    textoEncriptado.focus();

}

// Copiar texto al portapapeles
function copiarTexto() {
    textoEncriptado.select();
    textoEncriptado.setSelectionRange(0, 99999); // Para dispositivos móviles

    navigator.clipboard.writeText(textoEncriptado.value).then(() => {
        const originalContent = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copiado';
        setTimeout(() => copyButton.innerHTML = originalContent, 3000);
    }).catch((err) => console.error('Error al copiar el texto: ', err));
}

function limpiarTextoEncriptado() {
    textoEncriptado.value = "";
    mostrarMensajeTemporal("Texto eliminado!✅", textoEncriptado);
    textoOriginal.focus();
    setTimeout(() => { actualizarVisibilidad(false)}, 3000);
    
}
