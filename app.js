document.addEventListener("DOMContentLoaded", cargarConsolas);

function agregarConsola() {
    const consola = document.getElementById("consola").value.trim();
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const cliente = document.getElementById("cliente").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!consola || !fechaIngreso || !cliente || !telefono) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const listaConsolas = document.getElementById("listaConsolas");

    const li = document.createElement("li");
    li.innerHTML = `
        <span><strong>${consola}</strong> - ${cliente} (${telefono}) - ${fechaIngreso}</span>
        <p class="estado">Estado: <span id="estadoTexto">Llegada</span></p>
        <div class="botones">
            <button class="estado-btn" onclick="cambiarEstado(this)">Cambiar Estado</button>
            <button class="editar-btn" onclick="editarConsola(this)">Editar</button>
            <button class="borrar-btn" onclick="borrarConsola(this)">Eliminar</button>
        </div>
    `;

    listaConsolas.appendChild(li);
    guardarConsolas();
}


function cambiarEstado(boton) {
    const estados = ["Llegada", "En revisión", "Esperando partes", "En arreglo", "Lista para entrega"];
    let estadoTexto = boton.parentElement.previousElementSibling.querySelector("#estadoTexto");
    let estadoActual = estadoTexto.innerText;
    let nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    estadoTexto.innerText = nuevoEstado;
    guardarConsolas();
}

function editarConsola(boton) {
    let detalles = boton.parentElement.previousElementSibling.previousElementSibling;
    let nuevoTexto = prompt("Editar información:", detalles.innerText);
    if (nuevoTexto) {
        detalles.innerText = nuevoTexto;
        guardarConsolas();
    }
}

function borrarConsola(boton) {
    boton.parentElement.parentElement.remove();
    guardarConsolas();
}

function archivarConsola(boton) {
    const consolaEntregada = boton.parentElement;
    const listaArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];

    listaArchivadas.push(consolaEntregada.innerHTML);
    localStorage.setItem("archivadas", JSON.stringify(listaArchivadas));

    consolaEntregada.remove();
    guardarConsolas();
}

function guardarConsolas() {
    const consolas = [];
    document.querySelectorAll("#listaConsolas li").forEach(li => {
        consolas.push(li.innerHTML);
    });

    localStorage.setItem("consolas", JSON.stringify(consolas));
}

function cargarConsolas() {
    const consolasGuardadas = JSON.parse(localStorage.getItem("consolas")) || [];
    const listaConsolas = document.getElementById("listaConsolas");

    consolasGuardadas.forEach(html => {
        const li = document.createElement("li");
        li.innerHTML = html;
        listaConsolas.appendChild(li);
    });
}
