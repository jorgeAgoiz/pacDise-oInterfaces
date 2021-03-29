const containerOne = document.querySelector(".container");

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
  let playersArray = [];
  for (let x = 0; x < players; x++) {
    let position = document.createElement("div");
    position.classList.add("road");
    let car = document.createElement("img");
    car.className = "vehicles";
    car.src = `./img/car${x + 1}.png`;
    playersArray.push(car);
    position.appendChild(car);
    containerOne.appendChild(position);
    //Nos quedamos aqui para añadir estilos a cada coche
    //Añadirlos a un array

  }

  console.log(playersArray)
};

mainMenu();
