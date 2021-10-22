import { Container, CssBaseline } from "@material-ui/core"
import React from "react"
import Dashboard from "../Dashboard"
import { useStyles } from "./styles"
import { Bar } from "react-chartjs-2"
import Cookies from "universal-cookie"

export function UserLoggedDay() {
  const classes = useStyles()
  const cookie = new Cookies()
  const dataUserLogged = cookie.get("dataUser")

  let days: any = []
  let cantLogin: any = []
  let fechasLogueadas: any = []
  dataUserLogged.map((user: any) => {
    if (user.email === cookie.get("email")) {
      fechasLogueadas = user.loginFecha
      let contador = 0
      fechasLogueadas.map((diaFecha) => {
        days.push(fechasLogueadas[contador].fecha)
        cantLogin.push(fechasLogueadas[contador].cantLogueos)
        contador++
      })
    }
  })

  const data = {
    labels: days,
    datasets: [
      {
        label: "Cantidad de logueos por dia del ultimo mes",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgb(77 75 192 / 40%)",
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
        data: cantLogin,
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

export default UserLoggedDay
