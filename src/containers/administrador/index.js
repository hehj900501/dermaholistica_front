import React, { useState, Fragment, useEffect } from "react"
import { AdministradorContainer } from "./administrador"
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'
import { showAllCatalogos } from "../../services/catalogos"
import { catalogoLaboratoriosId, catalogoProductoComercialId } from "../../utils/constants"
import { showAllLaboratorios } from "../../services/laboratorios"
import { showAllProductoComercials } from "../../services/productos_comerciales"
import myStyles from "../../css"
import { showAllTipoMedicamentos } from "../../services/tipo_medicamentos"
// import { showAllLaboratorios } from "../../../services/laboratorios"
// import { showAllProductoComercials } from "../../../services/productos_comerciales"
// import { showAllOcupacions } from "../../../services/ocupacion"
// import { showAllEspecialidades } from "../../../services/especialidades"
// import { addZero, getToken } from "../../../utils/utils"
// import { getAllServices } from "../../../services/servicios"
// import { getAllTreatments } from "../../../services/tratamientos"
// import { findEmployeesByRolIdAvailable } from "../../../services/empleados"
// import { showAllEsquemas } from "../../../services/esquemas"

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Administrador = (props) => {

    // const laboratoriosCatalogoId = process.env.REACT_APP_LABORATORIOS_CATALOGO_ID
    // const productoComercialCatalogoId = process.env.REACT_APP_PRODUCTO_COMERCIAL_CATALOGO_ID
    // const ocupacionCatalogoId = process.env.REACT_APP_OCUPACION_CATALOGO_ID
    // const especialidadCatalogoId = process.env.REACT_APP_ESPECIALIDAD_CATALOGO_ID
    // const dermatologosCatalogoId = process.env.REACT_APP_DERMATOLOGOS_CATALOGO_ID
    // const serviciosCatalogoId = process.env.REACT_APP_SERVICIOS_CATALOGO_ID
    // const tratamientosCatalogoId = process.env.REACT_APP_TRATAMIENTOS_CATALOGO_ID
    // const esquemassCatalogoId = process.env.REACT_APP_ESQUEMAS_CATALOGO_ID

    // const dermatologoRolId = process.env.REACT_APP_DERMATOLOGO_ROL_ID

    const [catalogos, setCatalogos] = useState([])
    const [selectedIndex, setSelectedIndex] = useState()
    const [data, setData] = useState([])
    const [catalogo, setCatalogo] = useState({})
    const [laboratorios, setLaboratorios] = useState([])
    const [tipoMedicamentos, setTipoMedicamentos] = useState([])
    // const [openAlert, setOpenAlert] = useState(false)
    // const [message, setMessage] = useState('')
    // const [severity, setSeverity] = useState('success')
    const [isLoading, setIsLoading] = useState(true)

    // const {
    //     sucursal,
    //     empleado,
    //     colorBase,
    // } = props

    // const token = getToken(empleado)
    const classes = myStyles()

    const loadLaboratorios = async () => {
        const response = await showAllLaboratorios()
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data)
            setLaboratorios(response.data)
        }
    }

    const loadProductosComerciales = async () => {
        const response = await showAllProductoComercials()
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const responseTipoMedicamentos = await showAllTipoMedicamentos()
            if (`${responseTipoMedicamentos.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
                setTipoMedicamentos(responseTipoMedicamentos.data)
                setData(response.data)
            }
        }
    }

    const searchData = async (catalogo) => {
        setIsLoading(true)
        switch (catalogo._id) {
            case catalogoLaboratoriosId:
                await loadLaboratorios()
                break
            case catalogoProductoComercialId:
                await loadProductosComerciales()
                break
        }
        setIsLoading(false)
    }

    const handleClickCatalogo = (catalogoItem, index) => {
        setSelectedIndex(index)
        searchData(catalogoItem)
        setCatalogo(catalogoItem)
    }

    // const handleCloseAlert = () => {
    //     setOpenAlert(false)
    // }

    const loadCatalogos = async () => {
        const response = await showAllCatalogos()
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const resCatalogos = response.data
            setCatalogos(resCatalogos)
            handleClickCatalogo(resCatalogos[0], 0)
        }
    }

    const loadAll = async () => {
        setIsLoading(true)
        await loadCatalogos()
        setIsLoading(false)
    }

    useEffect(() => {
        loadAll()
    }, [])

    return (
        <Fragment>
            {
                !isLoading ?
                    <AdministradorContainer
                        setIsLoading={setIsLoading}
                        laboratorios={laboratorios}
                        onClickCatalogo={handleClickCatalogo}
                        loadCatalogos={loadCatalogos}
                        selectedIndex={selectedIndex}
                        catalogos={catalogos}
                        catalogo={catalogo}
                        data={data}
                        tipoMedicamentos={tipoMedicamentos}
                        // setMessage={setMessage}
                        // setSeverity={setSeverity}
                        // setOpenAlert={setOpenAlert} 
                        />
                    : <Backdrop className={classes.backdrop} open={isLoading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
            }

        </Fragment>
    )
}

export default Administrador