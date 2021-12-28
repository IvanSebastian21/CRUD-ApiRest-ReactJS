import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';

const data = [
  { id: 1, nombre: "Cemento Negro", descripcion: "40kg", precio: "700" },
  { id: 2, nombre: "Placa de Yeso", descripcion: "12.5 Mm", precio: "837" },
  { id: 3, nombre: "Hidrófugo Ceresita", descripcion: "10kg", precio: "1200" },
  { id: 4, nombre: "Bolson de Piedras", descripcion: "Grande", precio: "5700" },
  { id: 5, nombre: "Ladrillo Hueco x Unidad", descripcion: "12x18x33", precio: "60" },
  { id: 6, nombre: "Arena Fina", descripcion: "60kg", precio: "800" },
];

class App extends React.Component {
  state = {
    data,
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      precio: ''
    },
    modalInsert: false,
    modalEditar: false,
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModal = () => {
    this.setState({ modalInsert: true })
  }

  ocultarModal = () => {
    this.setState({ modalInsert: false })
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro })
  }

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false })
  }

  insert = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsert: false })
  }

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id === registro.id) {
        lista[contador].nombre = dato.nombre;
        lista[contador].descripcion = dato.descripcion;
        lista[contador].precio = dato.precio;
      }
      return contador++;
    });
    this.setState({ data: lista, modalEditar: false });
  }

  eliminar = (dato) => {
    var opcion = window.confirm("¿Esta seguro que desea eliminar el producto nro " + dato.id + "?");
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id === dato.id) {
          lista.splice(contador, 1);
        }
        return contador++;
      });
      this.setState({ data: lista });
    }
  }

  render() {
    const modalStyles = {
      position: "relative",
      top: "45%",
      left: "20%",
      transform: "translate(-50%, -50%)"
    }
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModal()}>Agregar nuevo producto</Button>
          <br /><br />
        </Container>
        <Table className='table table-hover table-dark'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento) => (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.descripcion}</td>
                <td>{elemento.precio}</td>
                <td>
                  <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>
                  {"  "}
                  <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={this.state.modalInsert} className="special_modal" style={modalStyles}>
          <ModalHeader>
            <div>
              <h3>Insertar Producto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className='form-control' name='nombre' type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input className='form-control' name='descripcion' type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Precio:</label>
              <input className='form-control' name='precio' type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='success' onClick={() => this.insert()}>Insertar</Button>
            <Button color='danger' onClick={() => this.ocultarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar} className="special_modal" style={modalStyles}>
          <ModalHeader>
            <div>
              <h3>Editar Producto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className='form-control' name='nombre' type="text" onChange={this.handleChange} value={this.state.form.nombre} />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input className='form-control' name='descripcion' type="text" onChange={this.handleChange} value={this.state.form.descripcion} />
            </FormGroup>

            <FormGroup>
              <label>Precio:</label>
              <input className='form-control' name='precio' type="text" onChange={this.handleChange} value={this.state.form.precio} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='success' onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color='danger' onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}

export default App;
