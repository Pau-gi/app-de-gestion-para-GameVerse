document.addEventListener("DOMContentLoaded", cargarArchivadas);

function cargarArchivadas() {
    const listaArchivadas = document.getElementById("listaArchivadas");
    const consolasArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];

    consolasArchivadas.forEach(html => {
        const li = document.createElement("li");
        li.innerHTML = html;

        li.querySelectorAll("button").forEach(boton => {
            if (boton.innerText === "Entregado") {
                boton.remove();
            }
        });

        li.querySelectorAll("button").forEach(boton => {
            if (boton.innerText === "Cambiar Estado") {
                boton.remove();
            }
        });

        li.querySelectorAll("text").forEach(boton => {
            if (boton.innerText === "Cambiar Estado") {
                boton.remove();
            }
        });

        listaArchivadas.appendChild(li);
    });
}

function borrarConsolaArchivada(boton) {
    const li = boton.parentElement;
    li.remove();

    let consolasArchivadas = JSON.parse(localStorage.getItem("archivadas")) || [];
    consolasArchivadas = consolasArchivadas.filter(texto => texto !== li.querySelector("span").innerText);
    localStorage.setItem("archivadas", JSON.stringify(consolasArchivadas));
}
