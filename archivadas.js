document.addEventListener("DOMContentLoaded", cargarArchivadas);

function cargarArchivadas() {
    const listaArchivadas = document.getElementById("listaArchivadas");
    const consolasArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];
    
    listaArchivadas.innerHTML = ""; 
    
    consolasArchivadas.forEach((html, index) => {
        const li = document.createElement("li");
        li.innerHTML = html;
        
        li.querySelectorAll("button").forEach(boton => {
            if (boton.innerText === "Entregado" || boton.innerText === "Cambiar Estado") {
                boton.remove();
            }
        });
        
        const estadoParrafo = li.querySelector(".estado");
        if (estadoParrafo) {
            estadoParrafo.remove();
        }
        
        const borrarBtn = li.querySelector(".borrar-btn");
        if (borrarBtn) {
            borrarBtn.onclick = function() {
                borrarConsolaArchivada(index);
            };
        }
        
        const editarBtn = li.querySelector(".editar-btn");
        if (editarBtn) {
            editarBtn.onclick = function() {
                editarConsolaArchivada(index);
            };
        }
        
        listaArchivadas.appendChild(li);
    });
}

function borrarConsolaArchivada(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta consola del archivo?")) {
        let consolasArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];
        consolasArchivadas.splice(index, 1); 
        localStorage.setItem("archivadas", JSON.stringify(consolasArchivadas));
        cargarArchivadas(); 
    }
}

function editarConsolaArchivada(index) {
    let consolasArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];
    const li = document.querySelectorAll("#listaArchivadas li")[index];
    const detalles = li.querySelector("span");
    
    if (detalles) {
        const nuevoTexto = prompt("Editar información:", detalles.innerText);
        if (nuevoTexto) {
            detalles.innerText = nuevoTexto;
            
            const htmlActualizado = li.innerHTML;
            consolasArchivadas[index] = htmlActualizado;
            localStorage.setItem("archivadas", JSON.stringify(consolasArchivadas));
        }
    }
}