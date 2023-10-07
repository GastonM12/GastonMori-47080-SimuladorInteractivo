class Calendario {
  constructor(anio, mes, dias) {
    this.anio = anio;
    this.mes = mes;
    this.dias = dias;
  }
}
let anio = 2023;
let meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
let horarios = [8, 9, 10, 11, 12, 16, 17, 18, 19, 20];
let semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

let calendarioAnual = [
  (Enero = new Calendario(anio, meses[0], calculadorDeDias(meses[0]))),
  (Febrero = new Calendario(anio, meses[1], calculadorDeDias(meses[1]))),
  (Marzo = new Calendario(anio, meses[2], calculadorDeDias(meses[2]))),
  (Abril = new Calendario(anio, meses[3], calculadorDeDias(meses[3]))),
  (Mayo = new Calendario(anio, meses[4], calculadorDeDias(meses[4]))),
  (Junio = new Calendario(anio, meses[5], calculadorDeDias(meses[5]))),
  (Julio = new Calendario(anio, meses[6], calculadorDeDias(meses[6]))),
  (Agosto = new Calendario(anio, meses[7], calculadorDeDias(meses[7]))),
  (Septiembre = new Calendario(anio, meses[8], calculadorDeDias(meses[8]))),
  (Octubre = new Calendario(anio, meses[9], calculadorDeDias(meses[9]))),
  (Noviembre = new Calendario(anio, meses[10], calculadorDeDias(meses[10]))),
  (Diciembre = new Calendario(anio, meses[11], calculadorDeDias(meses[11]))),
];
function calculadorDeDias(valor) {
  let cantidadDeDias = [
    { dia: 1, horasLaborales: horarios },
    { dia: 2, horasLaborales: horarios },
    { dia: 3, horasLaborales: horarios },
    { dia: 4, horasLaborales: horarios },
    { dia: 5, horasLaborales: horarios },
    { dia: 6, horasLaborales: horarios },
    { dia: 7, horasLaborales: horarios },
    { dia: 8, horasLaborales: horarios },
    { dia: 9, horasLaborales: horarios },
    { dia: 10, horasLaborales: horarios },
    { dia: 11, horasLaborales: horarios },
    { dia: 12, horasLaborales: horarios },
    { dia: 13, horasLaborales: horarios },
    { dia: 14, horasLaborales: horarios },
    { dia: 15, horasLaborales: horarios },
    { dia: 16, horasLaborales: horarios },
    { dia: 17, horasLaborales: horarios },
    { dia: 18, horasLaborales: horarios },
    { dia: 19, horasLaborales: horarios },
    { dia: 20, horasLaborales: horarios },
    { dia: 21, horasLaborales: horarios },
    { dia: 22, horasLaborales: horarios },
    { dia: 23, horasLaborales: horarios },
    { dia: 24, horasLaborales: horarios },
    { dia: 25, horasLaborales: horarios },
    { dia: 26, horasLaborales: horarios },
    { dia: 27, horasLaborales: horarios },
    { dia: 28, horasLaborales: horarios },
    { dia: 29, horasLaborales: horarios },
    { dia: 30, horasLaborales: horarios },
    { dia: 31, horasLaborales: horarios },
  ];
  if (valor === "febrero") {
    cantidadDeDias.splice(28, 3);
    return cantidadDeDias;
  } else if (
    valor === "abril" ||
    valor === "junio" ||
    valor === "septiembre" ||
    valor === "noviembre"
  ) {
    cantidadDeDias.pop();
    return cantidadDeDias;
  } else {
    return cantidadDeDias;
  }
}

function calcualdorDeHoras(diaDeLaSemana) {
  if (diaDeLaSemana === "Sabado") {
    horarios.splice(5, 5);
    return horarios;
  } else if (diaDeLaSemana === "Domingo") {
    return " los domingo permanecemos cerrado";
  } else {
    return horarios;
  }
}

function reserva() {
  let seleccionDeTurno = prompt(
    `Eliga el mes que desea solicitar el turno ${meses}`
  ).toLowerCase();

  while (seleccionDeTurno.toUpperCase() != "ESC") {
    let diasDelMesElegido = [];
    calculadorDeDias(meses[meses.indexOf(seleccionDeTurno)]).forEach(
      (element) => diasDelMesElegido.push(element.dia)
    );
    if (calendarioAnual.some((e) => e.mes == seleccionDeTurno)) {
      let objetoMes = calendarioAnual.find((e) => e.mes === seleccionDeTurno);
      let seleccionDeDia = Number(
        prompt(`Seleccione uno de los dias disponibles ${diasDelMesElegido}`)
      );

      if (objetoMes.dias.some((e) => e.dia === seleccionDeDia)) {
        let fechaDelTurno = new Date(
          anio,
          meses.indexOf(seleccionDeTurno),
          seleccionDeDia
        );
        let diaDeLaSemana = semana[fechaDelTurno.getDay()];
        if (diaDeLaSemana === "Domingo") {
          alert(calcualdorDeHoras(diaDeLaSemana));
        }
        if (diaDeLaSemana !== "Domingo") {
          let seleccionDeHora = Number(
            prompt(
              `Los horarios que estan disponibles para es dia son: ${calcualdorDeHoras(
                diaDeLaSemana
              )}`
            )
          );
          if (calcualdorDeHoras(diaDeLaSemana).includes(seleccionDeHora)) {
            let indiceDeHorario = horarios.indexOf(seleccionDeHora);
            let indiceFecha = objetoMes.dias.indexOf(
              objetoMes.dias.find((e) => e.dia === seleccionDeDia)
            );
            objetoMes.dias[indiceFecha].horasLaborales.splice(
              indiceDeHorario,
              1
            );
            alert(
              `El turno ah sido confirmado para el ${fechaDelTurno.toLocaleDateString()} a las ${seleccionDeHora}hs Los proximos turnos disponibles para el dia ${fechaDelTurno.toLocaleDateString()} son ${
                objetoMes.dias[indiceFecha].horasLaborales
              } `
            );
          }
        }
      } else {
        alert(`La fecha del turno seleccionado no existe`);
      }
    } else {
      alert(`La fecha del turno seleccionado no existe`);
    }
    seleccionDeTurno = prompt(
      `Si desea volver a reservar otro turno por favor selecciones el mes que desar reservar ${meses} De lo contrario escriba ESC`
    ).toLowerCase();
  }
}
reserva();
