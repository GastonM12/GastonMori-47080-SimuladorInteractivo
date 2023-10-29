let $inputMes = document.getElementById("seleccionDeTurno");
let $inputDia = document.getElementById("seleccionDeDia");
let $inputHora = document.getElementById("seleccionDeHora");
let $inputFecha = document.getElementById("inputFecha");
let $miForm = document.getElementById("formulario");
let tarjeta = document.getElementById("tarjeta");
let crearItems = document.createElement("p");
let $inputRadio = document.getElementsByName("hora");

$miForm.addEventListener("submit", reserva);

//FUNCION RESETEAR Y VALIDAR CHECK INPUT

function inputRadio(accion) {
  if (accion === "validar")
    for (let radio of $inputRadio) {
      if (radio.checked) {
        return radio.value;
      }
    }
  else if (accion === "resetear") {
    for (i = 0; i < $inputRadio.length; i++) {
      $inputRadio[i].checked = false;
    }
  }
}

//CREA UNA TARJETA DE RECORDATORIO CON DATOS EXTRAIDOS DEL LOCALSTORAGE DEPENDIENDO SI FUE AGENDADO CORRECTAMENTE O NO

function creadorDeTarjeta(frase, clase) {
  let listaDeTurnoLocal = JSON.parse(localStorage.getItem("listaTurnos"));

  let ultimoTurnoSeleccionado = listaDeTurnoLocal[listaDeTurnoLocal.length - 1];

  //desestructuracion
  let {
    mes: mesTurno,
    dia: diaTurno,
    hora: horaTurno,
  } = ultimoTurnoSeleccionado;

  let div = document.createElement("div");

  let nuevoItems = document.createElement("p");

  if (clase === "verde") {
    div.innerHTML = `<i class="fa-solid fa-check"style="color: #4cf71d;"></i>`;
    nuevoItems.textContent = `El turno se confirmo para el ${diaTurno} de ${mesTurno} a las ${horaTurno}hs`;
    div.classList.add(clase);
    div.append(nuevoItems);
    tarjeta.append(div);
  }
  if (clase === "rojo") {
    div.innerHTML = `<i class="fa-solid fa-x" style="color: #f50505;"></i>`;
    nuevoItems.textContent = frase;
    div.classList.add(clase);
    div.append(nuevoItems);
    tarjeta.append(div);
  }
}

//AGREGA LOS TURNOS SELECCIONADOS A UN ARRAY PARA LUEGO AGREGARLO AL STORAGE

let listaDeTurno = [];

function agregarTurno(mes, dia, hora) {
  let obj = {
    mes,
    dia,
    hora,
  };
  listaDeTurno.push(obj);
}

//FUNCION EVENTO
function reserva(event) {
  event.preventDefault();

  let hora = inputRadio("validar");

  let formulario = event.target.children;

  let infoFecha = formulario[1].value;

  let fecha = infoFecha.split("-");

  let seleccionDeTurno = meses[fecha[1] - 1];

  let seleccionDeDia = fecha[2];

  let seleccionDeHora = Number(hora);
  //Agrega el turno al un array
  agregarTurno(seleccionDeTurno, seleccionDeDia, seleccionDeHora);

  //Verifica si el mes seleccionado existe dentro del calendario
  if (calendarioAnual.some((e) => e.mes == seleccionDeTurno)) {
    // trae el objeto del mes selecionado
    let objetoMes = calendarioAnual.find((e) => e.mes === seleccionDeTurno);

    //compara si el dia seleccionado existe dentro del objeto mes
    if (objetoMes.dias.some((e) => e.dia === seleccionDeDia)) {
      //Se crea una fecha con el objeto Date para verificar que dia de la semana es
      let fechaDelTurno = new Date(
        anio,
        meses.indexOf(seleccionDeTurno),
        seleccionDeDia
      );

      let diaDeLaSemana = semana[fechaDelTurno.getDay()];

      //verifica que dia de la semana es para saber cuantas horas se trabajan
      if (diaDeLaSemana === "Domingo") {
        calcualdorDeHoras(diaDeLaSemana);
      }
      if (diaDeLaSemana !== "Domingo") {
        //Verifica si el horario seleccionado existe dentro de las horas laborales
        if (calcualdorDeHoras(diaDeLaSemana).includes(seleccionDeHora)) {
          localStorage.setItem("listaTurnos", JSON.stringify(listaDeTurno));

          let fraseDeTarjeta = `El turno ah sido confirmado para el ${fechaDelTurno.toLocaleDateString()} a las ${hora}hs`;

          creadorDeTarjeta(fraseDeTarjeta, "verde");
        } else {
          let fraseDeTarjeta = `El horario del turno seleccionado no se encuentra disponible`;
          creadorDeTarjeta(fraseDeTarjeta, "rojo");
        }
      }
    } else {
      let fraseDeTarjeta = `La fecha del turno seleccionado no se encuentra disponible`;
      creadorDeTarjeta(fraseDeTarjeta, "rojo");
    }
  } else {
    let fraseDeTarjeta = `La fecha del turno seleccionado no se encuentra disponible`;
    creadorDeTarjeta(fraseDeTarjeta, "rojo");
  }

  $inputRadio.checked = inputRadio("resetear");
  $inputFecha.value = "";
}
