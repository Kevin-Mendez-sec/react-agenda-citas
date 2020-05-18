import React,{Fragment, useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
const Formulario = ({crearCita}) => {

//Crear State de citas 
    const[cita, actualizarCitas]= useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    const [error, actualizarError] = useState(false)
//Funcion que se ejecuta cuando el usuario escribe en un input 

    const actualizarState = e => {
        actualizarCitas({
            ...cita,
            [e.target.name]: e.target.value
        })
    }
    //Extraer los valores 
    const {mascota, propietario, fecha , hora , sintomas}= cita;
    // cuanto agrega una cita

    const submitCita = e => {
        e.preventDefault();
       //Validar 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        // Eliminar el mensaje 
        actualizarError(false);

       // Asignar un ID
       cita.id = uuid();
       //crear la cita 
        crearCita(cita);
       //Reiniciar el Form
       actualizarCitas({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
       })
    }


    return (
        <Fragment>
            <h2>Crear Cita </h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre de tu mascota "
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del Dueño </label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre del dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora de la cita</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
    
      );
}
Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
  }

export default Formulario;