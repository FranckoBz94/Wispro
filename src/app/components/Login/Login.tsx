import React, { useState } from "react"
import Dashboard from "../Dashboard"
import { useStyles } from "./styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Cookies from "universal-cookie"
import { useHistory } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fechaObtenida } from "../../../contants"

export function Login() {
  const classes = useStyles()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const cookie = new Cookies()
  const history = useHistory()
  let [data]: any = useState([])

  const dataUser = cookie.get("dataUser")
  if (dataUser !== undefined) {
    if (dataUser.length > 0) {
      data = dataUser
    } else {
      data = []
    }
  }

  const notify: (text: string, type: string) => void = (
    text: string,
    type: string
  ) => {
    if (type === "success") {
      toast.success(text, {
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-center",
        progress: undefined,
        theme: "colored",
      })
    } else {
      toast.error(text, {
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-center",
        progress: undefined,
        theme: "colored",
      })
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (buscarUsuario().length !== 0) {
      notify("Bienvenido " + cookie.get("nameUser"), "success")
      setTimeout(() => {
        history.push("./User")
      }, 2000)
    } else {
      notify("Usuario o contraseña incorrecta", "error")
    }
  }

  function buscarUsuario() {
    let usuario = []
    let fechasLogueadas: any = []
    data.map((user) => {
      if (user.email === userName && user.password === password) {
        fechasLogueadas = user.loginFecha
        let contador = 0
        fechasLogueadas.map((diaFecha) => {
          if (diaFecha.fecha === fechaObtenida) {
            fechasLogueadas[contador].cantLogueos =
              fechasLogueadas[contador].cantLogueos + 1
          }
          contador++
        })
        usuario = user
        cookie.set("email", user.email, { path: "/" })
        cookie.set("nameUser", user.firstName)
      }
    })
    cookie.set("dataUser", data)
    return usuario
  }

  const contenido = (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={userName}
            autoComplete="email"
            onChange={({ target }) => {
              setUserName(target.value)
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            value={password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesion
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./Registro" variant="body2">
                {"¿No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ToastContainer />
    </Container>
  )
  return (
    <>
      <Dashboard children={contenido} />
    </>
  )
}

export default Login
