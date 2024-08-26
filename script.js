// Elementos del DOM
const imagenMuneco = document.getElementById('imagenMuneco');
const textArea = document.getElementById('textArea');
const textoOriginal = document.getElementById('texto');
const textoEncriptado = document.getElementById('textoEncriptado');
const copyButton = document.getElementById('copyButton');
const loader = document.getElementById('loader');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// Diferentees combinaciones de colores para los temas
const colorSchemes = {
    1: {
        // Opción 1: Tonos oscuros y elegantes
        '--background-color': '#2E2E2E',
        '--primary-color': '#1C4E80',
        '--secondary-color': '#A0A0A0',
        '--text-color': '#FFFFFF',
        '--footer-bg-color': '#1C1C1C',
        '--footer-text-color': '#C0C0C0',
        '--link-hover-color': '#1FA1A1',
    },
    2: {
        // Opción 2: Colores cálidos
        '--background-color': '#FFF5E1',
        '--primary-color': '#D9534F',
        '--secondary-color': '#FAD02E',
        '--text-color': '#6D2C2C',
        '--footer-bg-color': '#B85C38',
        '--footer-text-color': '#FFFFFF',
        '--link-hover-color': '#FBD3A4',
    },
    3: {
        // Opción 3: Tonos fríos y modernos
        '--background-color': '#E3F2FD',
        '--primary-color': '#1565C0',
        '--secondary-color': '#BBDEFB',
        '--text-color': '#0D47A1',
        '--footer-bg-color': '#1E88E5',
        '--footer-text-color': '#FFFFFF',
        '--link-hover-color': '#B3E5FC',
    },
    default: {
        // Valores por defecto
        '--background-color': '#E5E5E5',
        '--primary-color': '#0A3871',
        '--secondary-color': '#D8DFE8',
        '--text-color': '#0A3871',
        '--footer-bg-color': '#333',
        '--footer-text-color': '#fff',
        '--link-hover-color': '#32c2ae',
    }
};

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


function encriptarTexto() {
    const texto = textoOriginal.value;

    if (!/[aeiou]/i.test(texto)) {
        mostrarMensajeTemporal("Oops. No se pudo encriptar tu mensaje 😔", textoOriginal);
        return;
    }

    // Mostrar el loader
    loader.style.display = 'inline-block';
    header.style.filter = 'blur(5px)';
    main.style.filter = 'blur(5px)';
  

    // Oculta el loader después de 3 segundos   
    setTimeout(() => {
        textoOriginal.value = "";
        textoEncriptado.value = encriptar(texto);
        actualizarVisibilidad(true);
        textoEncriptado.focus();
        loader.style.display = "none";
        header.style.filter = 'none';
        main.style.filter = 'none';
        
    }, 3000); // 3000 milisegundos = 3 segundos
}



// Desencriptar texto
function desencriptarTexto() {
    const texto = textoOriginal.value;

    if (!/(enter|imes|ai|ober|ufat)/.test(texto)) {
        mostrarMensajeTemporal("Oops. No se pudo desencriptar tu mensaje 😔", textoOriginal);
        return;
    }

    loader.style.setProperty('--loader-content', '"Desencriptando..."');
      // Mostrar el loader
      loader.style.display = 'inline-block';
      header.style.filter = 'blur(5px)';
      main.style.filter = 'blur(5px)';

     // Oculta el loader después de 3 segundos   
     setTimeout(() => {
        textoOriginal.value = "";
        textoEncriptado.value = desencriptar(texto);
        actualizarVisibilidad(true);
        textoEncriptado.focus();
        loader.style.display = "none";
        header.style.filter = 'none';
        main.style.filter = 'none';
        loader.style.setProperty('--loader-content', '"Encriptando..."');
    }, 3000); // 3000 milisegundos = 3 segundos

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

function changeColorScheme(option) {
    const selectedScheme = colorSchemes[option] || colorSchemes['default'];

    Object.keys(selectedScheme).forEach(key => {
        document.documentElement.style.setProperty(key, selectedScheme[key]);
    });
}


function validarTexto(event) {
    // Obtiene el valor del evento
    const charCode = event.charCode || event.keyCode;
    const char = String.fromCharCode(charCode);

    // Solo permite letras minusculas y puntos y comas
    const regex = /^[a-z.,]+$/;

    // Si el carácter no coincide con la expresión regular, se previene su entrada
    if (!regex.test(char)) {
        event.preventDefault();
    }
}
// Limpia el textarea al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (textoOriginal) {
        textoOriginal.value = ""; 
    }
});

