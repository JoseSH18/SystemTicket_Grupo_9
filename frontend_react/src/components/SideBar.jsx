import React from 'react'
import {Offcanvas, Button} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const role = localStorage.getItem('role')
const SideBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = async (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
          try {

            navigate('/login');
          } catch (error) {
            console.error(error);
          }
  };
  return (
    <div>
    <Button onClick={handleShow} className='d-flex me-5' variant="outline-success">
    Menu
  </Button>
    <Offcanvas show={show} onHide={handleClose} className="bg-light bg-gradient" style={{ width: '250px' }}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>{role}</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body className='align-items-center'>

      <Button variant="outline-danger" onClick={logout} style={{ width: '100px' }}>Logout</Button>
      <Link onClick={handleClose} to={`/`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Tickets</Link>
      {role === "Admin"? (
          <Link onClick={handleClose} to={`/categories`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Categorías</Link>
      ) : null}
      {role === "Admin"? (
          <Link onClick={handleClose} to={`/tags`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Etiquetas</Link>
      ) : null}
        {role === "Admin"? (
          <Link onClick={handleClose} to={`/priorities`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Prioridades</Link>
      ) : null}
      {role === "Admin"? (
          <Link onClick={handleClose} to={`/statuses`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Estados</Link>
      ) : null}
      {role === "Admin"? (
          <Link onClick={handleClose} to={`/logs`}  className='btn btn-outline-info d-flex mt-2'style={{ width: '100px' }}>Logs</Link>
      ) : null}
    </Offcanvas.Body>
  </Offcanvas>
  </div>
  )
}

export default SideBar