document.addEventListener("DOMContentLoaded", cargarDatos);

const btnBuscar = document.getElementById("btnBuscar");

const lista = document.getElementById("lista");

let datosBase = [];
let listaParaMostrar = [];

btnBuscar.addEventListener("click",buscarPelis);

async function cargarDatos(){
    let response = await fetch("https://japceibal.github.io/japflix_api/movies-data.json");
    datosBase = await response.json();
}

function mostrarPelis(){
    lista.innerHTML = "";
    for (let i = 0; i < listaParaMostrar.length; i++) {
        let peliActual = listaParaMostrar[i];
        let puntuacion = Math.ceil(peliActual.vote_average / 2);
        let elementoDeLista = document.createElement("li");
        let nombrePeli = document.createElement("h3");
        let descPeli = document.createElement("p");

        let calificacion = document.createElement("div");
        for (let i = 0; i < 5; i++) {
            if((i++) === puntuacion){
                calificacion.innerHTML += "<span class='fa fa-star checked'></span>"
            }else{
                calificacion.innerHTML += "<span class='fa fa-star'></span>"
            }
            
            
        }

        nombrePeli.innerHTML = peliActual.title;
        descPeli.innerHTML = peliActual.tagline;

        elementoDeLista.appendChild(nombrePeli);
        elementoDeLista.appendChild(descPeli);
        elementoDeLista.appendChild(calificacion);
        elementoDeLista.classList.add("list-group-item");

        lista.appendChild(elementoDeLista);

        
    }
}
    function buscarPelis(){
    const buscador = document.getElementById("inputBuscar");
    let filtro = buscador.value.toLowerCase();
    listaParaMostrar = datosBase.filter(peliActual => {
        let title = peliActual.title.toLowerCase();
        let genres = peliActual.genres;
        let tagline = peliActual.tagline.toLowerCase();
        let overview = peliActual.overview.toLowerCase();

        let matchGenre = false;
        for (let i = 0; i < genres.length; i++) {
            const name = genres[i].name.toLowerCase();
            if(name.includes(filtro)){
                matchGenre = true;
            }
            
        }
        return title.includes(filtro) || tagline.includes(filtro) || overview.includes(filtro) || matchGenre;



    });
    mostrarPelis();
}