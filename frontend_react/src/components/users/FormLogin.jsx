import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/style.css"; 



const endpoint = 'http://localhost:8000/api/login'
const FormLogin = () => {
  const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(endpoint, {
          email: email,
          password: password,
        });
  
        const token = response.data.token;
        const role = response.data.role;
  
        // Aquí puedes guardar el token de acceso en el almacenamiento local o en las cookies
        // Ejemplo utilizando el almacenamiento local:
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  

        // Redireccionar al usuario a la página deseada después del inicio de sesión exitoso
        navigate('/');
        window.location.reload();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
        } else {
          // Manejo de otros tipos de errores, como credenciales incorrectas
          console.error(error);
        }
      }
    };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="mr-auto">Inicio de Sesión</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/register">Registrar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="background">
      <Col xs={12} sm={8} md={6} lg={4} xl={3} className="mx-auto">
        <Container className="form-container">
       
          <h2>Inicio de Sesión</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
             {errors.email && <Form.Text className="text-danger">{errors.email[0]}</Form.Text>}
            </Form.Group>

            <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {errors.password && <Form.Text className="text-danger">{errors.password[0]}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit"  className='mt-2'>
              Iniciar sesión
            </Button>

          </Form>

        </Container>
        </Col>
      </div>
    </div>
  )
}

export default FormLogin