export const options = {
  actionsCellStyle: {
    backgroundColor: "#fadb5761",
    color: "#000",
  },
  actionsColumnIndex: -1,
  headerStyle: {
    backgroundColor: "rgb(3 101 36)",
    color: "white",
  },
}
export const localization = {
  toolbar: {
    searchPlaceholder: "Buscar",
  },
  header: {
    actions: "Accion",
  },
  pagination: {
    firstTooltip: "Primera Página",
    previousTooltip: "Página Anterior",
    nextTooltip: "Página Siguiente",
    lastTooltip: "Última Página",
    labelRowsSelect: "Filas",
  },
}

export const paginationOption = {
  rowsPerPageText: "Filas por Página:",
  rangeSeparatorText: "de",
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos",
}

export let fechaObtenida = ""
const date = new Date()
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
if (month < 10 && day < 10) {
  fechaObtenida = `${day}/0${month}/0${year}`
} else if (month < 10) {
  fechaObtenida = `${day}/0${month}/${year}`
} else if (day < 10) {
  fechaObtenida = `${day}/${month}/0${year}`
} else {
  fechaObtenida = `${day}/${month}/${year}`
}
