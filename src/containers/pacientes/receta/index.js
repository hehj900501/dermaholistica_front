import React, { Fragment, useEffect, useState } from "react"
import { createReceta, findRecetaByConsultaId, findRecetaById, updateReceta } from "../../../services/recetas"
import { Snackbar, Grid, Backdrop, CircularProgress, TablePagination, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'
import { findLaboratorioById } from "../../../services/laboratorios"
import { findProductoComercialById, showAllProductoComercials } from "../../../services/productos_comerciales"
import { colorBase, tipoMedicamentoAntibioticoId, tipoMedicamentoControladoId, tipoMedicamentoNormalId } from "../../../utils/constants"
import { useNavigate } from "react-router-dom"
import { RecetaContainer } from "./receta"

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Receta = (props) => {

  const navigate = useNavigate()

  const {
    recetaId
  } = props

  const [consultorio, setConsultorio] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [openModalPacienteDomicilio, setOpenModalPacienteDomicilio] = useState(false)
  const [openModalItemReceta, setOpenModalItemReceta] = useState(false)
  const [productos, setProductos] = useState([])
  const [productosNormales, setProductosNormales] = useState([])
  const [productosAntibioticos, setProductosAntibioticos] = useState([])
  const [productosControlados, setProductosControlados] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState({})
  const [receta, setReceta] = useState({})
  const [openModalItemEstudio, setOpenModalItemEstudio] = useState(false)
  const [analisismedicos, setAnalisisMedicos] = useState({})

  const classes = props

  const dataComplete = !productoSeleccionado.producto || !productoSeleccionado.laboratorio || !productoSeleccionado.recomendacion

  const tituloNormal = 'MEDICAMENTOS NORMALES'
  const tituloAntibioticos = 'ANTIBIÓTICOS'
  const tituloControlados = 'MEDICAMENTOS CONTROLADOS'
  const tituloEstudios = 'ESTUDIOS'

  const columns = [
    { title: 'LABORATORIO', field: 'laboratorio' },
    { title: 'PRODUCTO', field: 'producto' },
    { title: 'RECOMENDACIÓN', field: 'recomendacion' },
  ]

  const columnsEstudio = [
    { title: 'NOMBRE', field: 'nombre' },
  ]

  const loadProductosComerciales = async () => {
    const responseProductos = await showAllProductoComercials()
    if (`${responseProductos.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setProductos(responseProductos.data)
      //separarProductos()
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  const findReceta = async () => {
    const responseReceta = await findRecetaById(recetaId)
    if (responseReceta && `${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setReceta(responseReceta.data)
      loadProductosComerciales() 
    } else {
      setIsLoading(false)
    }
  }

  const handleOnClickEditarProducto = async (event, rowData) => {
    setIsLoading(true)
    setProductoSeleccionado(rowData)
    setOpenModalItemReceta(true)
    setIsLoading(false)
  }

  const handleOnClickEliminarItem = async (event, rowData) => {
    setIsLoading(true)
    let ind = -1
    receta.productos.forEach((product, index) => {
      if (product.nombre_producto === rowData.nombre_producto && product.recomendacion === rowData.recomendacion){
        ind = index
      } 
    })
    receta.productos.splice(ind, 1)
    const response = await updateReceta(receta._id, receta)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      findReceta()
    } else {
      setIsLoading(false)
    }
  }

  const actions = [
    {
      tooltip: 'ELIMINAR',
      onClick: handleOnClickEliminarItem
    }
  ]

  const options = {
    headerStyle: {
      backgroundColor: colorBase,
      color: '#FFF',
      fontWeight: 'bolder',
      fontSize: '18px',
      textAlign: 'center',
    },
    cellStyle: {
      fontWeight: 'bolder',
      fontSize: '16px',
      padding: '5px',
      textAlign: 'center',
    },
    paging: false,
  }

  const onChangeActions = (e, rowData) => {
    const action = e.target.value
    switch (action) {
      case 'EDITAR':
        handleOnClickEditarProducto(e, rowData)
        break
      case 'ELIMINAR':
        handleOnClickEliminarItem(e, rowData)
        break
      case 'IMPRIMIR':
        // handleClickImprimirUnProducto(e, rowData)
        break
    }
  }

  const components = {
    Pagination: props => {
      return <TablePagination
        {...props}
        rowsPerPageOptions={[5, 10, 20, 30]}
      />
    },
    Actions: props => {
      return props.actions.length > 0
        ? <Fragment>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="simple-select-outlined-hora"></InputLabel>
            <Select
              labelId="simple-select-outlined-actions"
              id="simple-select-outlined-actions"
              onChange={(e) => onChangeActions(e, props.data)}
              label="ACCIONES">
              {
                props.actions.map((item, index) => {
                  return <MenuItem
                    key={index}
                    value={item.tooltip}
                  >{item.tooltip}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Fragment>
        : ''
    }
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const separarProductos = () => {
    let productos = receta.productos
    if (productos) {
      let productosNormalesList = productos.filter(producto => {
        return producto.tipo_medicamento._id === tipoMedicamentoNormalId
      })
      setProductosNormales(productosNormalesList)
  
      let productosAntibioticosList = productos.filter(producto => {
        return producto.tipo_medicamento._id === tipoMedicamentoAntibioticoId
      })
      setProductosAntibioticos(productosAntibioticosList)
  
      let productosControladosList = productos.filter(producto => {
        return producto.tipo_medicamento._id === tipoMedicamentoControladoId
      })
      setProductosControlados(productosControladosList)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
    
    
  }

  const handleChangeProducto = async (event, newValue) => {
    setProductoSeleccionado({
      ...productoSeleccionado,
      producto: newValue.nombre,
      laboratorio: newValue.laboratorio.nombre,
      tipo_medicamento: newValue.tipo_medicamento
    })
  }

  const handleChange = (event) => {
    setProductoSeleccionado({
      ...productoSeleccionado,
      [event.target.name]: event.target.value.toUpperCase()
    })
  }

  const handleClickGuardarProducto = async() => {
    setIsLoading(true)
    receta.productos.push(productoSeleccionado)
    setProductoSeleccionado({})
    const responseReceta = await updateReceta(receta._id, receta)
    if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      findReceta()
    }

  }

  const abrirReceta = async (consultorio) => {
    setIsLoading(true)
    const response = await findRecetaByConsultaId(consultorio.consultaId)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      const receta = response.data
      if (receta) {
        setReceta(receta)
        setReceta({
          ...receta,
          fecha_proxima_consulta: receta.fecha_proxima_consulta ? receta.fecha_proxima_consulta : ""
        })
        

        // receta.productos.forEach(async (producto) => {
        //   const responseLaboratorio = await findLaboratorioById(producto.laboratorio._id)
        //   const responseProductoComercial = await findProductoComercialById(producto.producto._id)
        //   if (`${responseLaboratorio.status}` === process.env.REACT_APP_RESPONSE_CODE_OK &&
        //     `${responseProductoComercial.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
        //     producto.laboratorio = responseLaboratorio.data
        //     producto.producto = responseProductoComercial.data
        //     setIsLoading(false)
        //   }
        // })
      } else {
        const newReceta = {
          create_date: new Date(),
          consultaId: consultorio.consultaId,
          paciente: consultorio.paciente._id,
          dermatologo: consultorio.dermatologo._id,
          sucursal: consultorio.sucursal,
          productos: [],
          fecha_proxima_consulta: new Date(),
        }

        const responseReceta = await createReceta(newReceta)

        if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
          setSeverity('success')
          setOpenAlert(true)
          setMessage('RECETA CREADA CORRECTAMENTE')
          setReceta(responseReceta.data)
          setReceta({
            ...receta,
            fecha_proxima_consulta: receta.fecha_proxima_consulta ? receta.fecha_proxima_consulta : ""
          })
          findReceta()
          // responseReceta.data.productos.forEach(async (producto) => {
          //   const responseLaboratorio = await findLaboratorioById(producto.laboratorio._id)
          //   const responseProductoComercial = await findProductoComercialById(producto.producto._id)
          //   if (`${responseLaboratorio.status}` === process.env.REACT_APP_RESPONSE_CODE_OK &&
          //     `${responseProductoComercial.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
          //     producto.laboratorio = responseLaboratorio.data
          //     producto.producto = responseProductoComercial.data
          //   }
          // })
        }
      }
    }
  }

  const handleChangeProximaConsulta = (date) => {
    setReceta({
      ...receta,
      fecha_proxima_consulta: date
    })
  }

  const handleClickCompletarDatos = (i) => {
    setOpenModalPacienteDomicilio(true)
  }

  const handleClickItemReceta = () => {
    setOpenModalItemReceta(true)
  }

  const handleClickItemEstudio = () => {
    setOpenModalItemEstudio(true)
  }

  const handleClickImprimirReceta = async () => {
    const responseReceta = await updateReceta(receta._id, receta)
    if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      navigate('/imprimir/receta/normal',
      {
        state: {
          productos: productosNormales,
          receta: receta
        }
      })
    }   
  }

  const handleClickImprimirRecetaAntibioticos = async () => {
    const responseReceta = await updateReceta(receta._id, receta)
    if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      navigate('/imprimir/receta/antibioticos',
      {
        state: {
          productos: productosAntibioticos,
          receta: receta
        }
      })
    }   
  }

  const handleClickImprimirRecetaControlados = async () => {
    const responseReceta = await updateReceta(receta._id, receta)
    if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      navigate('/imprimir/receta/controlados',
      {
        state: {
          productos: productosControlados,
          receta: receta
        }
      })
    }   
  }
  
  const handleClosePacienteDomicilio = () => {
    setOpenModalPacienteDomicilio(false)
  }

  const handleCloseItemReceta = () => {
    setOpenModalItemReceta(false)
  }

  const handleCloseItemEstudio = () => {
    setOpenModalItemEstudio(false)
  }

  const handleAgregarProducto = async (event, newItem) => {
    const item = {
      nombre_laboratorio: newItem.laboratorio._id.nombre,
      nombre_producto: newItem.producto._id.nombre,
      recomendacion: newItem.recomendacion,
      producto_activo: newItem.producto._id.producto_activo ? newItem.producto._id.producto_activo : newItem.producto._id.nombre,
      tipo_medicamento: newItem.producto._id.tipo_medicamento
    }
    receta.productos = receta.productos ? receta.productos : []
    receta.productos.push(item)
    const response = await updateReceta(receta._id, receta)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      findReceta()
    }
  }

  useEffect(() => {
    setIsLoading(true)
    findReceta()
  }, [])

  return (
    <Fragment>
      {
        !isLoading ?
          <Fragment>
            <RecetaContainer
              //paciente={paciente}
              productos={productos}
              receta={receta}
              onChangeProducto={handleChangeProducto}
              productoSeleccionado={productoSeleccionado}
              onChange={handleChange}
              onClickGuardarProducto={handleClickGuardarProducto}
              dataComplete={dataComplete}
              // onAgregarProducto={handleAgregarProducto}
              // onClickCompletarDatos={handleClickCompletarDatos}
              // onClickItemReceta={handleClickItemReceta}
              // onClickItemEstudio={handleClickItemEstudio}
              onClickImprimirReceta={handleClickImprimirReceta}
              onClickImprimirRecetaAntibioticos={handleClickImprimirRecetaAntibioticos}
              onClickImprimirRecetaControlados={handleClickImprimirRecetaControlados}
              // onChangeProximaConsulta={(e) => handleChangeProximaConsulta(e)}
              // openModalPacienteDomicilio={openModalPacienteDomicilio}
              // onClosePacienteDomicilio={handleClosePacienteDomicilio}
              // openModalItemReceta={openModalItemReceta}
              // onCloseItemRecetar={handleCloseItemReceta}
              // openModalItemEstudio={openModalItemEstudio}
              // onCloseItemEstudio={handleCloseItemEstudio}
              // onClickAgregarEstudios={handleAgregarEstudio}
              // analisismedicos={analisismedicos}
              // setMessage={setMessage}
              // setSeverity={setSeverity}
              // setOpenAlert={setOpenAlert}
              // findReceta={findReceta}
              tituloNormal={tituloNormal}
              tituloAntibioticos={tituloAntibioticos}
              tituloControlados={tituloControlados}
              // tituloEstudios={tituloEstudios}
              columns={columns}
              // columnsEstudio={columnsEstudio}
              productosNormales={productosNormales}
              productosAntibioticos={productosAntibioticos}
              productosControlados={productosControlados}
              actions={actions}
              // actionsEstudios={actionsEstudios}
              // actions_controlados={actions_controlados}
              options={options}
              components={components}
               />
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          </Fragment> :
          <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
          </Backdrop>
      }
    </Fragment>
  )
}

export default Receta
