import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api/ticket'
const ModalCreateTicket = ({getAllTickets}) => {

    const [title, setTitle] = useState('')
    const [text_Description, setText_Description] = useState('')
    const [id_Priority, setId_Priority] = useState(0)
    const [id_Status, setId_Status] = useState(0)

    const [files, setFiles] = useState([]);


    const handleFileChange = (event) => {
      const fileList = event.target.files;
      setFiles([...files, ...fileList]);
    };
    const navigate = useNavigate()

    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
  
    const getAllPriorities = async () =>{
      try {
        const response = await axios.get(`${endpoint}/priorities`)
        setPriorities(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  
    const getAllStatuses = async () =>{
      try {
        const response = await axios.get(`${endpoint}/statuses`)
        setStatuses(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect ( ()=>{
        getAllPriorities();
        getAllStatuses();
    }, [])
  
  const store = async (e) =>{
    e.preventDefault()
    const formData = new FormData();
    files.forEach((file) => formData.append('file[]', file));
    formData.append('title', title); 
    formData.append('text_Description', text_Description);
    formData.append('id_Priority', id_Priority); 
    formData.append('id_Status', id_Status); 
  
    await axios.post(`${endpoint}/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    handleClose();
    getAllTickets();
    setFiles([]);
    setTitle('');
    setText_Description('');
    setId_Priority(0);
    setId_Status(0);
    navigate('/')

  }
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Crear Ticket
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={store}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formText">
    <Form.Label>Título</Form.Label>
    <Form.Control
      type="text"
      value={title}
      onChange={e => setTitle(e.target.value)}
      required
    />
  </Form.Group>
  <Form.Group controlId="formPriority">
    <Form.Label>Selecciona una prioridad</Form.Label>
    <Form.Control as="select" value={id_Priority} onChange={e => setId_Priority(e.target.value)} required >
      <option value="">Seleccionar</option>
      {priorities.map(priority => (
        <option key={priority.id} value={priority.id}>
          {priority.type}
        </option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formStatus">
    <Form.Label>Selecciona un estado</Form.Label>
    <Form.Control as="select" value={id_Status} onChange={e => setId_Status(e.target.value)} required >
      <option value="">Seleccionar</option>
      {statuses.map(status => (
        <option key={status.id} value={status.id}>
          {status.status}
        </option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="formDescription">
    <Form.Label>Descripción</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={text_Description}
      onChange={e => setText_Description(e.target.value)}
      required 
    />
  </Form.Group>
  <Form.Group controlId="formFile">
        <Form.Label>Seleccionar archivo</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileChange}  />
</Form.Group>
<Form.Group controlId="formTag">

</Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" >
            Crear
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>

  </>
  )
}

export default ModalCreateTicket