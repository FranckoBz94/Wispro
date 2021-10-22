import React, { useState } from "react"
import Dashboard from "../Dashboard"
import Paper from "@material-ui/core/Paper"
import { useStyles } from "./styles"
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"
import { paginationOption } from "../../../contants"
import SortIcon from "@material-ui/icons/ArrowDownward"
import { Button, Container, Grid, Modal, TextField } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { useFormik } from "formik"
import Alert from "@material-ui/lab/Alert"
import Cookies from "universal-cookie"
import { useHistory } from "react-router-dom"

export function UserTable() {
  const classes = useStyles()
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalDeleteMyUser, setOpenModalDeleteMyUser] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState("")
  const [id, setId] = useState(0)
  const [alta, setAlta] = useState(false)
  const [sendFromUpdate, setSendFromUpdate] = useState(false)
  const cookie = new Cookies()
  let [data, setData]: any = useState([])
  const dataTable: any = []
  const dataUser = cookie.get("dataUser")
  let idGenerado = id + 1
  const history = useHistory()

  if (dataUser !== undefined) {
    if (dataUser.length > 0) {
      data = dataUser
      idGenerado = data.length + 1
    } else {
      data = []
    }
  }
  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastname: "",
      email: "",
      fechaRegister: "",
    },
    onSubmit: (values: any) => {
      const json = {
        id: idGenerado,
        firstName: values.firstName,
        lastname: values.lastname,
        email: values.email,
        fechaRegister: values.fechaRegister,
      }
      dataTable.push(json)
      setId(idGenerado)
      setData([...data, dataTable[0]])
      cookie.set("dataUser", [...data, dataTable[0]])
    },
  })

  const clearForm = () => {
    formik.values.id = ""
    formik.values.firstName = ""
    formik.values.lastname = ""
    formik.values.email = ""
    formik.values.fechaRegister = ""
  }

  const columns = [
    {
      name: "Id",
      selector: (row: any) => row.id,
    },
    {
      name: "Nombre",
      selector: (row: any) => row.firstName,
    },
    {
      name: "Apellido",
      selector: (row: any) => row.lastname,
    },
    {
      name: "Fecha Registro",
      selector: (row: any) => row.fechaRegister,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Contraseña",
      selector: (row: any) => row.password,
    },
    {
      name: "Acción",
      sortable: false,
      //selector: "null",
      cell: (d) => [
        <Button
          key={1}
          variant="contained"
          //type="button"
          className={classes.btnTable}
          title="Editar Socio"
          startIcon={<EditIcon />}
          color="primary"
          onClick={() => seleccionarSocio(d, "Editar")}
        ></Button>,
        <Button
          key={2}
          variant="contained"
          className={classes.btnTable}
          //type="button"
          color="secondary"
          title="Eliminar Socio"
          startIcon={<DeleteIcon />}
          onClick={() => seleccionarSocio(d, "Eliminar")}
        ></Button>,
      ],
      grow: 2,
      center: true,
    },
  ]

  const seleccionarSocio = (rowData: any, caso: any) => {
    clearForm()
    if (caso === "Editar") {
      setAlta(false)
      setOpenModalEdit(!openModalEdit)
      formik.values.id = rowData.id
      formik.values.firstName = rowData.firstName
      formik.values.lastname = rowData.lastname
      formik.values.email = rowData.email
      formik.values.fechaRegister = formatFechaInput(rowData.fechaRegister)
      setUserName(rowData.firstName)
    }
    if (caso === "Eliminar") {
      if (
        rowData.email === cookie.get("email") &&
        rowData.firstName === cookie.get("nameUser")
      ) {
        setOpenModalDeleteMyUser(!openModalDeleteMyUser)
      } else {
        setOpenModalDelete(!openModalDelete)
      }
      setUserName(rowData.firstName)
      setUserId(rowData.id)
    }
  }

  const tableSocios = {
    columns: columns,
    data: data,
    print: false,
    export: false,
    filterPlaceholder: "Ingrese una palabra",
  }

  const abrirCerrarModalDelete = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const abrirCerrarModalDeleteMyUser = () => {
    setOpenModalDeleteMyUser(!openModalDeleteMyUser)
  }

  const abrirCerrarModalEditar = () => {
    setOpenModalEdit(!openModalEdit)
  }

  const formatFechaInput = (fecha: any) => {
    const [year, month, day] = fecha ? fecha.split("/") : ""
    const fechaInput = `${day}-${month}-${year}`
    return fechaInput
  }

  const formatFechaSave = (fecha: any) => {
    const [year, month, day] = fecha ? fecha.split("-") : ""
    const fechaGuardar = `${day}/${month}/${year}`
    return fechaGuardar
  }

  const updateUser = (values) => {
    let contador = 0
    data.map((user) => {
      if (user.id === values.id) {
        data[contador].firstName = values.firstName
        cookie.set("nameUser", values.firstName)
        data[contador].lastname = values.lastname
        data[contador].email = values.email
        cookie.set("email", values.email)
        data[contador].fechaRegister = formatFechaSave(values.fechaRegister)
      }
      contador++
    })
    cookie.set("dataUser", data)
    setSendFromUpdate(true)
    setTimeout(() => {
      setSendFromUpdate(false)
      setOpenModalEdit(!openModalEdit)
    }, 2000)
  }

  const deleteUser = () => {
    let contador = 0
    data.map((user) => {
      if (user.id === userId) {
        data.splice(contador, 1)
      }
      contador++
    })
    cookie.set("dataUser", data)
    abrirCerrarModalDelete()
  }

  const deleteMyUser = () => {
    let contador = 0
    data.map((user) => {
      if (user.id === userId) {
        data.splice(contador, 1)
      }
      contador++
    })
    cookie.set("dataUser", data)
    abrirCerrarModalDeleteMyUser()
    cookie.set("email", "")
    cookie.set("nameUser", "")
    history.push("./Login")
  }

  const bodyModal = (title: string) => (
    <div className={classes.paperModal}>
      <h2>{title}</h2>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} key={1}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Nombre"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} key={2}>
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
          <Grid item xs={12} key={3}>
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
          <Grid item xs={12} key={4}>
            <TextField
              variant="outlined"
              type="date"
              required
              fullWidth
              id="fechaRegister"
              label="Fecha Registro"
              name="fechaRegister"
              value={formik.values.fechaRegister}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} key={1}>
            {alta ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Guardar
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
                onClick={() => updateUser(formik.values)}
              >
                Actualizar
              </Button>
            )}
          </Grid>
          <Grid item xs={6} key={2}>
            <Button
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={() => {
                setOpenModalEdit(!openModalEdit)
              }}
              key={33}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
        {sendFromUpdate && (
          <Alert
            variant="filled"
            severity="success"
            className={classes.sendRta}
          >
            Actualizado correctamente
          </Alert>
        )}
      </form>
    </div>
  )

  const contenido = (
    <Container component="main" maxWidth="lg">
      <Paper>
        <div className={classes.tableContainer}>
          <DataTableExtensions {...tableSocios}>
            <DataTable
              columns={columns}
              data={data}
              sortIcon={<SortIcon />}
              defaultSortAsc={true}
              title="Listado de Usuarios"
              pagination
              highlightOnHover
              striped={true}
              dense
              paginationComponentOptions={paginationOption}
              noDataComponent="No hay datos para mostrar"
            />
          </DataTableExtensions>
        </div>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalDelete}
        onClose={abrirCerrarModalDelete}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.containerEliminar}>
          <h2>¿Desea eliminar a {userName}?</h2>
          <Grid container spacing={3} className={classes.footerModal}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnModal}
                startIcon={<DeleteIcon />}
                onClick={deleteUser}
              >
                Eliminar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={abrirCerrarModalDelete}
                className={classes.btnModal}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalDeleteMyUser}
        onClose={abrirCerrarModalDeleteMyUser}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.containerEliminar}>
          <h2>Si elimina su usuario se cerrara la sesion. ¿Desea borrarlo?</h2>
          <Grid container spacing={3} className={classes.footerModal}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnModal}
                startIcon={<DeleteIcon />}
                onClick={deleteMyUser}
              >
                Eliminar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={abrirCerrarModalDeleteMyUser}
                className={classes.btnModal}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalEdit}
        onClose={abrirCerrarModalEditar}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {alta ? bodyModal("Alta Usuario") : bodyModal("Editar Usuario")}
      </Modal>
    </Container>
  )
  return (
    <>
      <Dashboard children={contenido} />
    </>
  )
}

export default UserTable
