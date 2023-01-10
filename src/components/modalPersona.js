import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

export const ModalPersona = (props) => {
    const [show, setShow] = useState(props.mostrar);

    const [mostrarToast, setMostrarToast] = useState(false)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [estatura, setEstatura] = useState(0)
    const [fechaNacimiento, setFechaNacimiento] = useState('2000-01-01')

    const loadPersona = (id) => {
        axios.get(`http://apitest.beatlech.com/public/api/persona/${id}`)
            .then((response) => {
                setNombre(response.data.nombre)
                setApellido(response.data.apellido)
                setEstatura(response.data.estatura)
                setFechaNacimiento(response.data.fecha_nacimiento)
            })
    }
    useEffect(() => {
        props.mostrar ? handleShow() : handleClose()
        if (props.mostrar) {
            if (props.idPersona != 0 && props.idPersona != null) {
                limpiar()
                loadPersona(props.idPersona);
            }
            else {
                limpiar()
            }
        }
    }, [props.mostrar])


    const handleClose = () => {
        limpiar();
        setShow(false);
        props.onCambia()
    };

    const limpiar = () => {
        setNombre('')
        setApellido('')
        setEstatura(0)
        setFechaNacimiento('2000-01-01')
    }

    const handleShow = () => { setShow(true) };
    const grabar = () => {
        (props.idPersona == 0 ?
            axios.post("http://apitest.beatlech.com/public/api/persona", {
                nombre: nombre,
                apellido: apellido,
                fecha_nacimiento: fechaNacimiento,
                estatura: estatura
            }) :
            axios.put(`http://apitest.beatlech.com/public/api/persona/${props.idPersona}`, {
                nombre: nombre,
                apellido: apellido,
                fecha_nacimiento: fechaNacimiento,
                estatura: estatura
            })
        )
            .then(() => {

            }).catch((e) => {
                console.log("error", e)
                setMostrarToast(true)

            })
            .finally(() => {
                handleClose();
            })
    }

    return (
        <>
            <ToastContainer position="top-end" className="p-3">
                <Toast show={mostrarToast} position="top-end"
                    bg="danger" onClose={() => setMostrarToast(false)} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Alerta</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Hubo un error al cargar los datos</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Personas</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese nombre"
                                onChange={(e) => { setNombre(e.target.value) }}
                                value={nombre} />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese apellido"
                                onChange={(e) => { setApellido(e.target.value) }}
                                value={apellido} />
                            <Form.Text className="text-muted" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Estatura</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese estatura"
                                step="0.1"
                                onChange={(e) => { setEstatura(e.target.value) }}
                                value={estatura} />
                            <Form.Text className="text-muted" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Ingrese Fecha de nacimiento"
                                onChange={(e) => { setFechaNacimiento(e.target.value) }}
                                value={fechaNacimiento} />
                            <Form.Text className="text-muted" />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={grabar}>
                        Grabar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}