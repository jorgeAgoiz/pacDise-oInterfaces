// HTML Elements
const containerOne = document.querySelector(".container");
const iniciar = document.createElement('button');
const reiniciar = document.createElement('button');
const sendNumber = document.createElement("button");
const menu = document.createElement("div");

// Arrays to store the car elements and final positions
let playersArray = [];
let positionsArray = [];
let finalResults = [];

//Main function
const mainMenu = () => {
  // Title
  menu.classList.add("menu");
  menu.innerHTML = "<h1>Menu</h1>";

  // Select players menu Element
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
  //Submit players button
  sendNumber.innerText = "Jugar";
  sendNumber.classList.add("btn-send");

  // Event Listener in submit players button
  sendNumber.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    const num = prueba;
    menu.style.display = "none";//main menu now is hidden
    startRace(num);//Call the race function
  });

  //Add the elements to the main container
  menu.appendChild(selectPlayers);
  menu.appendChild(sendNumber);
  containerOne.appendChild(menu);
};

const startRace = (players) => {//Race function
  //Create a new div element to store all race
  const menuCarrera = document.createElement('div');

  //In this for loop create the number of cars selected
  for (let x = 0; x < players; x++) {
    // The road
    let position = document.createElement("div");
    position.classList.add("road");
    //The cars
    let car = document.createElement("img");
    car.className = "vehicles";
    car.src = `./img/car${x + 1}.png`;
    car.name = x + 1;// Adding a new property to identify the cars
    playersArray.push(car);
    //Adding car inside the road and road & car inside the main element
    position.appendChild(car);
    containerOne.appendChild(position);
  }
  //Iniciar Button => styles and events
  iniciar.classList.add('btn-send');
  iniciar.innerText = "Iniciar";
  iniciar.style.style = "initial";
  iniciar.onclick = () => { correr() };
  //Reiniciar button => styles and events
  reiniciar.classList.add('btn-send');
  reiniciar.innerText = "Reiniciar";
  reiniciar.onclick = () => { restartRace() };
  reiniciar.style.display = "none";
  // Element to store the buttons
  menuCarrera.classList.add('menu-carrera');
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  //Adding element with buttons to main container
  containerOne.appendChild(menuCarrera);
};

//Event to Reiniciar button
const restartRace = () => {
  playersArray.map(car => {
    car.classList.remove("vehicles-racing")
  })
  reiniciar.style.display = "none";
  iniciar.style.display = "initial";

}
//Event to Iniciar button
const correr = () => {
  //Hide Iniciar button and show Reiniciar button when the race starts
  setTimeout(() => {
    iniciar.style.display = "none";
    reiniciar.style.display = "initial";
  }, 100)


  playersArray.map(car => {
    let duration = Math.random() * (10 - 1) + 1;
    duration = Math.round(duration);
    car.classList.add("vehicles-racing");
    car.style.animationDuration = `${duration}s`;

    car.onanimationend = () => {
      positionsArray.push(car.name);
      if (positionsArray.length == playersArray.length) {
        reiniciar.style.display = "none";
        iniciar.style.display = "initial";
        finalResults = positionsArray;
        positionsArray = [];
        playersArray.map(vehicle => {
          vehicle.classList.remove("vehicles-racing");
        })

      }
    }
    console.log(positionsArray)
  })
}

mainMenu();

/* Mostrar resultados de la carrera y boton para refrescar la aplicacion y volver
a elegir numero de coches  */