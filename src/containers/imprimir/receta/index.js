import React, { useState, Fragment } from 'react';
import FormImprimirReceta from './FormImprimirReceta';
import { culcularEdad } from '../../../utils/utils';
import { useLocation, useNavigate } from "react-router-dom";

const ImprimirReceta = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    receta,
    productos,
  } = location.state;
  
  console.log("KAOZ", receta);


  const [show, setShow] = useState(true);

  const edad = culcularEdad(receta.paciente.fecha_nacimiento);

  const handleClickImprimir = (e) => {
    setShow(false);
    setTimeout(() => {
      window.print();
    }, 0);
    setTimeout(() => { setShow(true); }, 15);
  }

  const handleReturn = () => {
    navigate(-1);
  }

  return (
    <Fragment>
      <FormImprimirReceta
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        receta={receta}
        productos={productos}
        edad={edad}
        onReturn={handleReturn}
        onClickImprimir={handleClickImprimir}
        show={show}
          /> 
    </Fragment>

  );
}

export default ImprimirReceta;