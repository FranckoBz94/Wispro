import { Container, CssBaseline } from "@material-ui/core"
import React from "react"
import Dashboard from "../Dashboard"
import { useStyles } from "./styles"
import { Bar } from "react-chartjs-2"
import Cookies from "universal-cookie"

export function UserRegister() {
  const classes = useStyles()
  const cookie = new Cookies()
  const dataUserRegistered = cookie.get("dataUser")
  let days: any = []
  let cantUsers: any = []

  function completeArray() {
    let contador = 0
    //let fechaRegister: any = ""
    let fechasRegistro: any = []
    let cantidadUsers = 0
    dataUserRegistered.map(() => {
      fechasRegistro = dataUserRegistered[contador].fechaRegister
      cantidadUsers = 0
      //fechaRegister = user[contador].fechaRegister
      let existDateInArray: boolean = false
      existDateInArray = days.some((user) => user === fechasRegistro)
      if (!existDateInArray) {
        dataUserRegistered.map((user: any) => {
          if (user.fechaRegister === fechasRegistro) {
            cantidadUsers = cantidadUsers + 1
          }
        })
        cantUsers.push(cantidadUsers)
        days.push(fechasRegistro)
      }

      contador++
    })
  }

  completeArray()

  const data = {
    labels: days,
    datasets: [
      {
        label: "Usuarios Registrados",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cantUsers,
      },
    ],
  }

  const contenido = (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Bar data={data} />
      </div>
    </Container>
  )
  return (
    <>
      <Dashboard children={contenido} />
    </>
  )
}

export default UserRegister
