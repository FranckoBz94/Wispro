import React, { useState } from "react"
import Dashboard from "../Dashboard"
import { useStyles } from "./styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { useFormik } from "formik"
import Cookies from "universal-cookie"
import { Alert } from "@material-ui/lab"
import { fechaObtenida } from "../../../contants"

export function Register() {
  const classes = useStyles()
  const [id, setId] = useState(0)
  let idGenerado = id + 1
  const dataTable: any = []
  const cookie = new Cookies()
  let [data, setData]: any = useState([])
  const [sendFormAdd, setSendFormAdd] = useState(false)
  const dataUser = cookie.get("dataUser")
  console.log("dataUser", dataUser)
  console.log("fechaObtenida", fechaObtenida)
  if (dataUser !== undefined) {
    if (dataUser.length > 0) {
      data = dataUser
      console.log("len", data[data.length - 1].id)
      idGenerado = data[data.length - 1].id + 1
      console.log("idgene", idGenerado)
    } else {
      console.log("entr")
      data = []
    }
  }

  const clearForm = () => {
    formik.values.id = ""
    formik.values.firstName = ""
    formik.values.lastname = ""
    formik.values.email = ""
    formik.values.password = ""
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: (values: any) => {
      const json = {
        id: idGenerado,
        firstName: values.firstName,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        fechaRegister: fechaObtenida,
        loginFecha: [
          {
            fecha: fechaObtenida,
            cantLogueos: 0,
          },
        ],
      }
      dataTable.push(json)
      setId(idGenerado)
      setData([...data, dataTable[0]])
      cookie.set("dataUser", [...data, dataTable[0]])
      setSendFormAdd(true)
      setTimeout(() => {
        setSendFormAdd(false)
      }, 2000)
      clearForm()
    },
  })

  const register = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Apellido"
                name="lastname"
                autoComplete="lname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarte
          </Button>
          {sendFormAdd && (
            <Alert
              variant="filled"
              severity="success"
              className={classes.sendRta}
            >
              Guardado correctamente
            </Alert>
          )}
        </form>
      </div>
    </Container>
  )
  return (
    <>
      <Dashboard children={register} />
    </>
  )
}

export default Register
