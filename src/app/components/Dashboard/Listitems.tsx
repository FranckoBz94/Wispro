import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import * as React from "react"
import { NavLink } from "react-router-dom"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import ListAltIcon from "@material-ui/icons/ListAlt"
import EventNoteIcon from "@material-ui/icons/EventNote"
export const mainListItems = (
  <div>
    <NavLink
      exact
      to="/Login"
      title="Login"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem button key={2}>
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </NavLink>
    <NavLink
      exact
      to="/Registro"
      title="Registro"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem button key={3}>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Registro" />
      </ListItem>
    </NavLink>
  </div>
)

export const mainListItemsLogged = (
  <div>
    <NavLink
      exact
      to="/User"
      title="Usuarios"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem button key={1}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </NavLink>
    <NavLink
      exact
      to="/logueos_dia"
      title="Logueos Por Día"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem button key={1}>
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Logueos por día" />
      </ListItem>
    </NavLink>
    <NavLink
      exact
      to="/usuarios_registrados"
      title="Usuarios Registrados por Día"
      style={{ textDecoration: "none", color: "#000" }}
    >
      <ListItem button key={1}>
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios Registrados" />
      </ListItem>
    </NavLink>
  </div>
)
