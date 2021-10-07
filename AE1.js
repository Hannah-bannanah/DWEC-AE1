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
  const suma = numeros.reduce((total, num) => {
    return total + num;
  });
  return suma / numeros.length;
}

/**
 * Devuelve la moda de un array de numeros.
 * La moda es el valor del array que más veces se repite.
 *
 * Si hay mas de una opcion para la moda, devuelve la opcion
 * cuya ultima ocurrencia aparece antes en el array.
 * Por ejemplo, dado un array formado por [0, 2, 1, 2, 1, 1, 2],
 * el valor devuelto es 1 porque es el primer valor que alcanza la máxima ocurrencia.
 *
 * Esta funcion siempre devuelve un valor, que por defecto,
 * es el primer elemento del array y el valor 1.
 *
 * @param numeros array de numeros validados
 *
 * @return moda de los numeros del array
 */
function calcularModa(numeros) {
  /**
   * Objeto que mapea los numeros que componen el array y su frecuencia de repetición
   *
   * @param num clave del mapa. Es un valor único, no se puede repetir
   *
   * @param repeticiones número de veces que un num se repite en el array
   */
  const repeticiones = new Map();
  //Inicializamos la variable que representa la frecuencia máxima con
  //el par: valor del primer indice del array y frecuencia 1
  let maxCount = [numeros[0], 1];

  //El método forEach ejecuta la funcion una vez por cada elemento del array
  numeros.forEach((num) => {
    //El método has() devuelve un boolean indicando si un elemento con dicha clave existe o no.
    //Con ello conseguimos que la clave sea única.
    //Si ya existe una clave con el valor del elemento del array, el valor de repeticiones para esa clave aumenta en 1.
    if (repeticiones.has(num)) {
      const aux = repeticiones.get(num); //Utilizamos una variable auxiliar para almacenar la frecuencia del valor del array (clave).
      repeticiones.set(num, aux + 1); //Asignamos como par de valores: el valor del array, y un incremento de 1 en su frecuencia.

      //Si la frecuencia de esta clave es mayor que la anterior, el valor de la variable maxCount (moda) cambia por este par.
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
 *
 * Para el array de longitud par, la mediana es la media de los dos valores centrales.
 * Para el array de longitud impar, la mediana es el valor que ocupa la posición central.
 */
function calcularMediana(numeros) {
  const sortedNumeros = [...numeros].sort(); //Almacenamos el array ordenado en una constante (sortedNumeros)
  if (sortedNumeros.length % 2 == 0) {
    //Calculamos la mediana para un array de longitud par
    const mitad = sortedNumeros.length / 2; //Obtenemos la posición de la mitad del array
    return (sortedNumeros[mitad - 1] + sortedNumeros[mitad]) / 2; //Media de los valores en la posición central y anterior
  }
  return sortedNumeros[(sortedNumeros.length - 1) / 2]; //Calculamos la mediana para un array de longitud impar
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
