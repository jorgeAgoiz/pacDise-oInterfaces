// Elementos HTML
const containerOne = document.querySelector(".container");
const iniciar = document.createElement('button');
const reiniciar = document.createElement('button');
const sendNumber = document.createElement("button");
const changeCars = document.createElement("button");
const menu = document.createElement("div");

// Arays donde guardamos los DOM elements y las posiciones finales
let playersArray = [];
let positionsArray = [];
let finalResults = [];

//Funcion del menu principal
const mainMenu = () => {
  // Titulo
  menu.classList.add("menu");
  menu.innerHTML = "<h1>Menu</h1>";

  // Seleccionamos el numero de corredores
  const selectPlayers = document.createElement("div");
  selectPlayers.innerHTML = `
                            <h2>Selecciona el numero de corredores:</h2>
                                <select class="selector" id="jugadores" name="jugadores">
                                    <!-- Opciones de la lista -->
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            `;
  // Button para iniciar el juego
  sendNumber.innerText = "Jugar";
  sendNumber.classList.add("btn-send");

  // Event Listener para el boton de Jugar
  sendNumber.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    menu.style.display = "none";//Escondemos el menu principal
    return startRace(prueba);// Llamamos a la funcion principal
  });

  //Añadimos elementos al container principal
  menu.appendChild(selectPlayers);
  menu.appendChild(sendNumber);
  containerOne.appendChild(menu);
};

const startRace = (players) => {//Funcion principal (Carrera)
  //Creamos un nuevo elemento para colocar los elementos de la carrera
  const menuCarrera = document.createElement('div');

  //Con este loop creamos el numero de elementos de corredor que hayamos seleccionado
  for (let x = 0; x < players; x++) {
    let dorsal = document.createElement("div");
    dorsal.innerHTML = `<p>${x + 1}</p>`;
    dorsal.classList.add("dorsal");
    // La carretera
    let position = document.createElement("div");
    position.classList.add("road");
    // Los coches
    let car = document.createElement("img");
    car.className = "vehicles";
    car.src = `./img/car${x + 1}.png`;
    car.name = x + 1;// Añadimos una propiedad para identificarlo mas facilmente
    playersArray.push(car);
    //Añadimos el coche dentro de la carretera

    position.appendChild(car);
    containerOne.appendChild(dorsal);
    containerOne.appendChild(position);
  }
  //Iniciar Button => estilos y ventos
  iniciar.classList.add('btn-send');
  iniciar.innerText = "Iniciar";
  iniciar.style.display = "initial";
  iniciar.onclick = () => { correr() };
  //Numero de coches Button => estilos y eventos
  changeCars.classList.add('btn-send');
  changeCars.innerText = "Menu";
  changeCars.style.display = "initial";
  changeCars.onclick = () => location.reload();

  //Reiniciar button => estilos y eventos
  reiniciar.classList.add('btn-send');
  reiniciar.innerText = "Reiniciar";
  reiniciar.onclick = () => { restartRace() };
  reiniciar.style.display = "none";
  // Elemento donde colocar los buttons
  menuCarrera.classList.add('menu-carrera');
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  menuCarrera.appendChild(changeCars);
  //Añadimos al container principal el elemento
  containerOne.appendChild(menuCarrera);
};

//Evento para el boton reiniciar
const restartRace = () => {
  playersArray.map(car => {
    car.classList.remove("vehicles-racing")
  })
  reiniciar.style.display = "none";
  iniciar.style.display = "initial";
  changeCars.style.display = "initial";

}
//Eento para el boton iniciar
const correr = () => {
  /* Escondemos el boton iniciar y mostramos el de reiniciar una vez 
  comienza la carrera */
  setTimeout(() => {
    iniciar.style.display = "none";
    changeCars.style.display = "none";
    reiniciar.style.display = "initial";
  }, 100)
  //Creamos el elemento donde mostrar las posiciones finales
  const tablePositions = document.createElement("div");
  // A cada elemento del array le asignamos una velocidad y la clase .vehicles-racing
  playersArray.map(car => {
    let duration = Math.random() * (10 - 1) + 1;
    duration = Math.round(duration);
    car.classList.add("vehicles-racing");
    car.style.animationDuration = `${duration}s`;
    // Evento que se dispara al terminar la animacion
    car.onanimationend = () => {
      positionsArray.push(car.name);//Conforme vayan llegando los coches los añadimos a un array
      if (positionsArray.length == playersArray.length) {
        //Esta condicion se ejecuta cuando hayan llegado todos a meta
        reiniciar.style.display = "none";
        iniciar.style.display = "initial";
        //Pasamos las posiciones al array final donde los mostraremos
        finalResults = positionsArray;
        //Y limpiamos el array para la siguiente partida
        positionsArray = [];
        playersArray.map(vehicle => {
          vehicle.classList.remove("vehicles-racing");
        })
        //Ocultamos los coches y la pista para mostrar los resultados
        let coches = document.querySelectorAll(".road");
        let dorsales = document.querySelectorAll(".dorsal");
        coches.forEach(coche => {
          coche.style.display = "none";

        })
        //Ocultamos tambien los numeros dorsales
        dorsales.forEach(drsl => {
          drsl.style.display = "none";
        })
        //Aqui construimos la lista de posiciones
        for (let x = 0; x < finalResults.length; x++) {
          let pos = document.createElement("div");
          pos.classList.add("posiciones");
          pos.innerHTML = `<p><u>Posicion ${x + 1} :</u> Coche ${finalResults[x]}</p></br>`;
          tablePositions.appendChild(pos);
        }
        iniciar.style.display = "none";//Ocultamos el boton en los resultados
        containerOne.appendChild(tablePositions);//Los mostramos por pantalla

        //Esta funcion mostrar los resultados 3 segundos y luego volvera a la pantalla de juego
        // mostrando de nuevo los coches y los botones
        setTimeout(() => {
          tablePositions.remove();
          coches.forEach(coche => {
            coche.style.display = "initial";
          })
          dorsales.forEach(drsl => {
            drsl.style.display = "initial";
          })
          iniciar.style.display = "initial";
          changeCars.style.display = "initial";
        }, 3000);

      }
    }
  })
}
//Ejecutamos la funcion al cargar el archivo javascript
mainMenu();