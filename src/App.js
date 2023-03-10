import React from "react";
import ReactDOM from "react-dom/client";
import Container from 'react-bootstrap/Container';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListadoPersona from "./components/listadoPersona";
import Bienvenido from "./components/bienvenido";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListadoPersona></ListadoPersona>,
  },
  {
    path: "/bienvenido",
    element: <Bienvenido/>,
  },
]);

function App (){

return(
  <React.StrictMode>

<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
            <Nav.Link href={"/bienvenido"}>Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <RouterProvider router={router}/>
      </React.StrictMode>
      );
}

export default App;






/*import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ModalPersona } from './components/modalPersona';
import { FaEdit } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//////////////////SE AGREGA LA FUNCION EDITAR, CARGANDO DINAMICAMENTE LOS VALORES 

function App() {
  const [data, setData] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idPersona, SetIdPersona] = useState(0);

  const fetchDataPersona = () => {
    axios.get("http://apitest.beatlech.com/public/api/persona")
      .then((response) => {
        setData(response.data)
      })
  }

  const nuevoRegistro = () => {
    SetIdPersona(0)
    setMostrarModal(true)
  }

  const editar = (e) => {
    SetIdPersona(e.target.getAttribute("idpersona"))
    setMostrarModal(true)
  }

  useEffect(() => {
    fetchDataPersona();
  }, [])

  return (
    <>
      <ModalPersona mostrar={mostrarModal}
        idPersona={idPersona}
        onCambia={() => {
          setMostrarModal(false);
          fetchDataPersona();
        }}></ModalPersona>
      <Container>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
        <Row>
          <Col xs={2}><img width="75" src={logo}></img></Col>
          <Col><h1>Consulta de personas</h1></Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary"
              onClick={nuevoRegistro}>Nuevo</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) =>
                    <tr key={item.id}>
                      <td>
                        <Button variant="primary"
                          idpersona={item.id}
                          onClick={editar}>Editar</Button>
                      </td>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.apellido}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table> 
          </Col></Row>
      </Container>
    </>
  );
}

export default App;
*/