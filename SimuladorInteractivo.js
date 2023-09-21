function reserva() {
    let horarioDisponible = ["12", "13", "14", "15", "16","17"];
    let turnoAReservar = prompt(`selecciona un horario disponible ${ horarioDisponible}`);
   
    while (turnoAReservar != "ESC"  ) {
      switch (parseInt(turnoAReservar)) {
        case 12:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        case 13:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        case 14:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        case 15:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        case 16:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        case 17:
          horarioDisponible.splice(horarioDisponible.lastIndexOf(turnoAReservar), 1);
          alert(`El turno ha sido confirmado a las ${turnoAReservar}hs`);
          break;
        default:
          alert("El horario que solicitaste no se encuentra disponible");
          break;
      }
      turnoAReservar = prompt(`Desea elegir otro turno? Los proximos horarios disponibles son ${horarioDisponible} .    
        De lo contrario escriba ESC`);
    }
  }
  
  reserva();