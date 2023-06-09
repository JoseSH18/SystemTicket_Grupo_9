import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Modal} from 'react-bootstrap';



const endpoint = 'http://localhost:8000/api'
const ModalEditCategory = ({EditObjects}) => {
  const [errors, setErrors] = useState({});
    const { id, getAllCategories } = EditObjects;
    const [category, setCategory] = useState('')

    const navigate = useNavigate()

    const getCategoryById = async () =>{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/category/get/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCategory(response.data.category)
    }
    useEffect( () =>{
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const update = async (e) =>{
    const token = localStorage.getItem('token');
    e.preventDefault()
    const formData = new FormData();
    formData.append('category', category); 

    await axios.post(`${endpoint}/category/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getAllCategories();
      closeModal();
    }).catch(error => {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        setErrors(errors);
      } else {
        // Manejo de otros tipos de errores
      }
    });

  }
  const closeModal = () => {
    handleClose();
    setCategory('');
    navigate('/categories')
  };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="link" className="dropdown-item" onClick={() => {
  getCategoryById(id);
  handleShow();}}>
      Editar
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form onSubmit={update}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
  <Form.Group controlId="formCategory">
    <Form.Label>Nombre de Categoría</Form.Label>
    <Form.Control
      type="text"
      value={category}
      onChange={e => setCategory(e.target.value)}
      required
    />
     {errors.category && <span className="error text-danger">{errors.category[0]}</span>}
  </Form.Group>
</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit" >
            Editar
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>

  </>
  )
}

export default ModalEditCategory