// clubs = treboles
// diamonds = diamantes
// hearts = corazones
// spades = picas

let deck = [];
const palos = ["C", "D", "H", "S"];
const figuras = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosBanca = 0;

//Rutas
const rutaPuntosSmall = document.querySelectorAll("small");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");
const cartasJugador = document.querySelector("#jugador-cartas");
const cartasBanca = document.querySelector("#banca-cartas");

//Estas rutas de aqui hacen referencia los small pero no se usan para probar lo de los [].
// const rutaPuntosJugador = document.querySelector('#playerpoints');
// const rutaPuntosBanca = document.querySelector('#bankpoints');

// function crearDeck() {
// Esto es lo mismo que la funcion flecha.
// }

const crearDeck = () => {
  // bucle for pero en vez de decirle i=0 pues empieza en 2 porque en la baraja el 1 es el AS.
  for (let i = 2; i <= 10; i++) {
    // dentro del for añado un for of( que por lo que vi es parecido al for each) palo es lo mismo que i, se puede llamar como uno quiera, solo que por coherencia lo llamo en singular
    // si el array se llama palos (esta creado arriba al principio) pues el iterador lo llamo palo en singular porque va a ir mirando uno por uno
    for (let palo of palos) {
      deck.push(i + palo);

      //con cada vuelta con el push añade la i del for primero +  el palo, por lo que en la primera vuelta el i=2 luego entra dentro del for of y lo que hace es mete i+c, luego C+D+H+S
      // por lo que en esta vuelta interna del for of añadiria en el array 2C, 2D, 2H, 2S acabaria con los palos, saldria fuera y volveria a empezar
    }
    // la i valdria ahora 3 y volveria a entrar dentro del for of, y con la i valiendo 3, meteria  3C, 3D, 3H, 3S y asi sucesivamente hasta que el primer for se cumpla que seria cuando i valga 10
  }

  // esto es lo mismo que el anterior pero en vex de numeros lo hace con las figuras J, Q, K, A y los palos C, D, H, S.
  for (let palo of palos) {
    for (let fig of figuras) {
      deck.push(fig + palo);
    }
  }
  return deck;
};
// console.log(deck);
crearDeck();

// Esto es lo de underscore.js se llama asi porque todos los metodos se hacen con la barra baja que se llama underscore en ingles (lo digo como apunte porque no lo sabia)
// Este metodo en particular ordena aleatoriamente un array.
deck = _.shuffle(deck);

console.log(deck);

const pedirCarta = () => {
  if (deck.length === 0) {
    // si el tamaño de deck vale 0 pues no saca mas cartas y manda un error con throw de no hay cartas
    throw "No hay cartas en el deck";
  }

  // con pop pillamos la ultima carta y la guardamos en la constante carta, despues la borra
  const carta = deck.pop();

  return carta;
  // aleatorio = Math.floor(Math.random()*(deck.length)-1);
  // const carta = deck[aleatorio];
  // console.warn('Baraja modificada.')
  // console.log(deck);
  // console.log(carta);
};

const valorCarta = (carta) => {
  // aqui queremos sacar el valor numerico de una carta, por lo que guardamos en valor lo que esta delante del palo, ejemplo 10H pues desde la posicion 0 hasta la -1 por lo que el -1 ignora la H y se queda con 10.
  const valor = carta.substring(0, carta.length - 1);

  // esto es lo mismo que un if else pero esta muy cerdaco y hay metidos 2 uno dentro de otro
  //(condicion)? siSeCumpleHaceEsto : siNoHaceEsto; pero luego dentro de lo primero meti otro es un poco asquerosillo pero era para mi.
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : (puntos = valor * 1);

  // console.log({valor});

  // let puntos = 0;

  // if ( isNaN(valor)){
  //     puntos = (valor ==='A') ? 11 : 10;
  // }else{
  //     console.log('Es un numero');
  //     puntos = valor*1;
  // }
};

//Eventos
btnPedir.addEventListener("click", () => {
  // pide una carta con la funcion que hay arriba y almacena el valor
  const carta = pedirCarta();

  // pilla los puntos y le suma el valor de carta que lo saca con la otra funcion
  puntosJugador = puntosJugador + valorCarta(carta);

  // aqui lo que decia de practicar el referirse a los small sin ponerles ID
  rutaPuntosSmall[0].innerText = puntosJugador;

  //creamos una img, en esta parte me puse nervioso, la crea y la guarda ahi en imgCarta, pero esta en el aire aun no esta colocada en ningun sitio
  const imgCarta = document.createElement("img");

  // le añade src a la imagen porque te la crea sin ruta de donde esta la imagen ni nada
  // esto es lo mismo que imgCarta.src = "./assets/cartas/" + carta + ".png"; obtiene el valor de carta por ejemplo 2H y si os fijais en la carpeta cartas tienen el mismo nombre asi que al añadirle .png pues ya esta la ruta completa.
  imgCarta.src = `./assets/cartas/${carta}.png`;

  // con esto al igual que con la ruta se le crea una clase, con esto obtiene las propiedades del css para que no salgan gigantes
  imgCarta.classList.add("carta");

  // y aqui por fin añadimos imgCarta que la llevamos creando aqui atras cosa por cosa, src class. y la mete en cartasJugador que si mirais arriba en rutas se refiere con un querySelector a la id #jugador-cartas
  cartasJugador.append(imgCarta);

  if (puntosJugador > 21) {

    // con estos if hago que entre el turno del rival, esta primera opcion si te pasas de 21 y pierdes
    console.warn("Palmaste el coche");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoBanca(puntosJugador);
  } else if (puntosJugador === 21) {

    // esta segunda opcion si sacas 21 o BlackJack que se llama asi sacar 21 tambien entra el rival aunque en verdad ganarias directamente pero era por añadir mas cosas
    console.warn("21!!! Genial!!");

    // deshabilitamos botones para no pinchar cosas raras cuando no se deberia
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoBanca(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {

  // el boton detener llama al turno del rival y deshabilita los otros botones para evitar hacer cosas raras,
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoBanca(puntosJugador);
});



// fijarse al jugar que hay veces, que no dice bien el ganador, eso es que hay alguna condicion que esta mal.
const turnoBanca = (puntosMinimos) => {
  // aqui aunque ponga puntosMinimos realmente cuando llamamos la funcion, le metemos los puntos del jugador asi que puntosMinimos es igual que puntosJugador
  // cuando entra el turno rival con el do, garantizamos que salga una carta, el codigo es muy similar al de nuestro turno
  do {

    const carta = pedirCarta();
    puntosBanca = puntosBanca + valorCarta(carta);

    // aqui nos referimos al segundo small que es la puntuacion de la banca, ya que en un array la primera posicion es 0, aqui el 1 seria el segundo small
    rutaPuntosSmall[1].innerText = puntosBanca;
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasBanca.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
      // si puntos minimos supera 21 con el break le decimos que no siga por lo que no entra en el while y solo haria lo que esta dentro del do
    }
  } while (puntosBanca < puntosMinimos && puntosMinimos <= 21){
// mientras puntosBanca menor que los del jugador y a la vez menor o igual que 21 pues ejecuta lo de abajo, el setTimeout solo sirve para que salgan antes las imagenes de que se anuncie el ganador.
  setTimeout(() => {
    if (puntosBanca === puntosMinimos) {
      // si se cumple esta condicion empate
      alert("Nadie gana");
    } else if (
      (puntosBanca > puntosJugador && puntosBanca < 21) ||
      puntosJugador > 21
    ) {
      alert("La Banca Gana!!!!");
    } else {
      alert("El Señor Gana!!!");
    }
    //   const ganador =
    //     puntosMinimos <= 21 && (puntosBanca < puntosMinimos || puntosBanca > 21)
    //       ? alert("Jugador Gana!!")
    //       : alert("Banca Gana!!!");
  }, 100);
}
};


// aqui basicamente se resetea todo, se crea una nueva baraja, y se "baraja" para que no este ordenada
btnNuevoJuego.addEventListener("click", () => {
  console.clear();
  rutaPuntosSmall[0].innerText = 0;
  rutaPuntosSmall[1].innerText = 0;
  puntosBanca = 0;
  puntosJugador = 0;
  crearDeck();
  deck = _.shuffle(deck);
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  cartasBanca.innerHTML = "";
  cartasJugador.innerHTML = "";

  // aqui tenia puesto la opcion que nos enseño fran pero preferia hacerlo de la otra manera porque asi, en un futuro le puedo agregar un marcador y saber cuantas partidas llevo ganadas y perdidas, si usamos el reload se pierde todo
  //   location.reload();
});

//Turno Banca
