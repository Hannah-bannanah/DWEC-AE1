/* algoritmo que ejecuta las funciones listadas en la AE1 de DWEC */

/**
 * Funcion que calcula la media, mediana y moda sobre
 * una serie de numeros entre 0 y 100 (ambos incluidos)
 * Si el array contiene numeros fuera del rango establecido o
 * elementos no numericos, estos seran ignorados a la hora
 * de realizar los calculos
 * @param {*} arr array de numeros
 * @returns {media, moda, mediana} la media, moda y mediana de los numeros validos
 */
function realizarCalculos(arr) {
  const numeros = validarArray(arr);
  if (numeros.length == 0) return { NaN, NaN, NaN };
  const media = calcularMedia(numeros);
  const moda = calcularModa(numeros);
  const mediana = calcularMediana(numeros);
  return { media, moda, mediana };
}

/**
 * Funcion que filtra un array manteniendo solo aquellos
 * elementos que sean numeros dentro del rango [0, 100]
 * @param {*} arr array de numeros
 * @returns numerosValidos, subarray de arr
 */
function validarArray(arr) {
  const numerosValidos = arr.filter(
    (num) => typeof num == "number" && num <= 100 && num >= 0
  );
  console.log(`Numeros validos: ${numerosValidos}`);
  return numerosValidos;
}

/**
 * Funcion que calcula la media de un array de numeros
 * @param {*} numeros array de numeros
 * @returns la media de los numeros del array
 */
function calcularMedia(numeros) {
  const sum = numeros.reduce((total, num) => {
    return total + num;
  });
  return sum / numeros.length;
}

/**
 * Funcion que calcula la moda de un array de numeros.
 * Si hay mas de una opcion para la moda, devuelve la opcion
 * cuya ultima ocurrencia aparece antes en el array
 * @param {*} numeros array de numeros
 * @returns la moda de los numeros del array
 */
function calcularModa(numeros) {
  const repeticiones = new Map();
  let maxCount = [numeros[0], 1];
  numeros.forEach((num) => {
    if (repeticiones.has(num)) {
      const aux = repeticiones.get(num);
      repeticiones.set(num, aux + 1);
      if (aux + 1 > maxCount[1]) maxCount = [num, aux + 1];
    } else {
      repeticiones.set(num, 1);
    }
  });
  return maxCount[0];
}

/**
 * Funcion que calcula la mediana de un array de numeros
 * @param {*} numeros array de numeros
 * @returns la mediana de los numeros del array
 */
function calcularMediana(numeros) {
  const sortedNumeros = [...numeros].sort();
  if (sortedNumeros.length % 2 == 0) {
    const mitad = sortedNumeros.length / 2;
    return (sortedNumeros[mitad - 1] + sortedNumeros[mitad]) / 2;
  }
  return sortedNumeros[(sortedNumeros.length - 1) / 2];
}

/*--------------------------------------------------------*/

/*
 Hay dos opciones para comprobar el correcto funcionamiento del algoritmo:
 Opcion A: array prepopulado por nosotras
 Opcion B: recogiendo input del usuario
*/

/*
  Opcion A: array prepopulado por nosotras.
  Se puede ejecutar por terminal; tambien se ejecuta
  automaticamente al abrir index.html en el explorador y
  devuelve los resultados en la consola del explorador
*/
const numerosPredefinidos = ["uno", 1, 101, 100, 99.9, 1, 0, -1, "one", 100];
console.log(`Numeros prededifinidos: ${numerosPredefinidos}`);
let { media, moda, mediana } = realizarCalculos(numerosPredefinidos);
console.log(`Resultados sobre los numeros predefinidos:`);
console.log(`media: ${media}
mediana: ${mediana}
moda: ${moda}`);

/*
  Opcion B: recoger input del usuario mediante un prompt
  Para ejecutar, abrir la pagina index.html y hacer click 
  sobre el boton "Ejecutar pruebas"
*/

/**
 * Funcion que rellena un array con numeros introducidos
 * por el usuario
 */
function pruebasUsuario() {
  const numerosUsuario = []; //array a rellenar con el input del usuario
  console.log("Input del usuario:");
  //recoger input del usuario y llamar a la funcion
  do {
    let inputUsuario = prompt("Introduzca un numero");
    if (inputUsuario == null) break; //si el usuario cancela, salimos del bucle
    console.log(inputUsuario);
    let num = parseFloat(inputUsuario);
    if (num) numerosUsuario.push(num); //(num) se procesa como false si es NaN, undefined o null
  } while (true); //el bucle se repite hasta que en entre en la clausula de break
  confirm(`Numeros introducidos:
${numerosUsuario}`);

  let { media, moda, mediana } = realizarCalculos(numerosUsuario);
  if (media || moda || mediana) {
    confirm(`media: ${media}
    mediana: ${mediana}
    moda: ${moda}`);
  } else {
    alert(`No se ha introducido ningun numero valido`);
  }
}
