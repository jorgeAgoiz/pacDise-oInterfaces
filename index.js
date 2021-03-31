const containerOne = document.querySelector(".container");
let playersArray = [];
let positionsArray = [];
let finalResults = [];

const iniciar = document.createElement('button');
const reiniciar = document.createElement('button');


const mainMenu = () => {
  // Title
  const menu = document.createElement("div");
  menu.classList.add("menu");
  menu.innerHTML = "<h1>Menu</h1>";

  // Select players
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

  const sendNumber = document.createElement("button");
  sendNumber.innerText = "Jugar";
  sendNumber.classList.add("btn-send");

  sendNumber.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    console.log(prueba)
    const num = prueba;
    menu.remove();
    startRace(num);
    // Aqui le pasamos la funcion de comenzar carrera
  });
  menu.appendChild(selectPlayers);
  menu.appendChild(sendNumber);
  containerOne.appendChild(menu);
};

const startRace = (players) => {
  const menuCarrera = document.createElement('div');

  for (let x = 0; x < players; x++) {
    let position = document.createElement("div");
    position.classList.add("road");
    let car = document.createElement("img");
    car.className = "vehicles";
    car.src = `./img/car${x + 1}.png`;
    car.name = x + 1;
    playersArray.push(car);
    position.appendChild(car);
    containerOne.appendChild(position);
    //Nos quedamos aqui para añadir estilos a cada coche
    //Añadirlos a un array
  }
  iniciar.classList.add('btn-send');
  iniciar.innerText = "Iniciar";
  iniciar.style.style = "initial";
  iniciar.onclick = () => { correr() };
  reiniciar.classList.add('btn-send');
  reiniciar.innerText = "Reiniciar";
  reiniciar.onclick = () => { restartRace() };
  reiniciar.style.display = "none";

  menuCarrera.classList.add('menu-carrera');
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  containerOne.appendChild(menuCarrera);
};

const restartRace = () => {
  playersArray.map(car => {
    car.classList.remove("vehicles-racing")
  })
  reiniciar.style.display = "none";
  iniciar.style.display = "initial";

}

const correr = () => {
  setTimeout(() => {
    iniciar.style.display = "none";
    reiniciar.style.display = "initial";
  }, 150)


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
        console.log("hello world")
        playersArray.map(vehicle => {
          vehicle.classList.remove("vehicles-racing");
        })


      }
      console.log(positionsArray)
    }
  })
  /* Lo dejamos aqui, a falta de estudiar el transitioned
  para determinar cuando acaba la animacion */
}

mainMenu();
