import logo from '../logo.svg';
import '../App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ModalPersona } from '../components/modalPersona';

import Modal from 'react-bootstrap/Modal';
//////////////////SE AGREGA LA FUNCION EDITAR, CARGANDO DINAMICAMENTE LOS VALORES 

function ListadoPersona() {
  const [data, setData] = useState([]);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
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
    console.log(e.target)
    SetIdPersona(e.target.getAttribute("idpersona"))
    setMostrarModal(true)
  }


  const eliminar = async (e) => {
    await axios.delete(`http://apitest.beatlech.com/public/api/persona/${idPersona}`);
    setShowModalEliminar(false)
    fetchDataPersona();
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

      <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el registro seleccionado?
          IdPersona= {idPersona}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowModalEliminar(false)
            SetIdPersona(0)
          }}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={eliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>

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
                        <Button variant="danger"
                          idpersona={item.id}
                          onClick={() => {
                            SetIdPersona(item.id);
                            setShowModalEliminar(true)
                          }}>Eliminar</Button>
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

export default ListadoPersona;
