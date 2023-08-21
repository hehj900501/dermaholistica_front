import { Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, TablePagination } from "@material-ui/core"
import React, { Fragment, useState } from "react"
import { CrudContainer } from "./crud"
import EditIcon from '@material-ui/icons/Edit'
import myStyles from "../../../css"
import { catalogoLaboratoriosId, catalogoProductoComercialId, colorBase } from "../../../utils/constants"
import { createLaboratorio, updateLaboratorio } from "../../../services/laboratorios"
import { createProductoComercial, updateProductoComercial } from "../../../services/productos_comerciales"

const Crud = (props) => {
    const serviciosCatalogoId = process.env.REACT_APP_SERVICIOS_CATALOGO_ID

    const {
        catalogo,
        data,
        loadCatalogos,
        empleado,
        setMessage,
        setSeverity,
        setOpenAlert,
        setIsLoading,
        laboratorios,
        tipoMedicamentos,
    } = props

    const classes = myStyles()

    const [openModal, setOpenModal] = useState(false)
    const [openModalServicios, setOpenModalServicios] = useState(false)
    const [newItem, setNewItem] = useState({})

    const handleClicKNuevo = () => {
        switch (catalogo._id) {
            case serviciosCatalogoId:
                setOpenModalServicios(true)
                break
            default:
                setOpenModal(true)
        }
    }

    const handleClicKEditar = (event, rowData) => {
        setNewItem(rowData)
    }

    const { columns } = catalogo

    const actions = [
        {
            icon: EditIcon,
            tooltip: 'EDITAR',
            onclick: handleClicKEditar,
        },
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
        paging: true,
    }

    const onChangeActions = (e, rowData) => {
        const action = e.target.value
        switch (action) {
            case 'EDITAR':
                handleClicKEditar(e, rowData)
                break

        }
    }

    const components = {
        Pagination: props => {
            return <TablePagination
                {...props}
                rowsPerPageOptions={[5, 10, 20, 30, data.length]}
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

    const handleChange = (event) => {
        setNewItem({
            ...newItem,
            [event.target.name]: event.target.value.toUpperCase()
        })
    }

    const handleChangeComboLaboratorio = (event, newValue) => {
        setIsLoading(true)
        setNewItem({
            ...newItem,
            laboratorio: newValue ? newValue._id : newValue,
        })
        setIsLoading(false)
    }

    const handleChangeComboTipoMedicamento = (event, newValue) => {
        setIsLoading(true)
        setNewItem({
            ...newItem,
            tipo_medicamento: newValue ? newValue._id : newValue,
        })
        setIsLoading(false)
    }

    const handleGuardarItem = async (event) => {
        setIsLoading(true)
        let response
        switch (catalogo._id) {
            case catalogoLaboratoriosId:
                response = newItem._id ? await updateLaboratorio(newItem._id, newItem) : await createLaboratorio(newItem)
                break
            case catalogoProductoComercialId:
                response = newItem._id ? await updateProductoComercial(newItem._id, newItem) : await createProductoComercial(newItem)
                break
        }

        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK
            || `${response.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
            // setSeverity('success')
            // setOpenAlert(true)
            // setMessage(newItem._id ? 'REGISTRO ACTUALIZADO CORRECTAMENTE' : 'REGISTRO CREADO CORRECTAMENTE')
            loadCatalogos()
        }

    }

    return (
        <Fragment>
            <CrudContainer
                catalogo={catalogo}
                data={data}
                newItem={newItem}
                loadCatalogos={loadCatalogos}
                empleado={empleado}
                onClicKNuevo={handleClicKNuevo}
                onChange={handleChange}
                onChangeComboLaboratorio={handleChangeComboLaboratorio}
                onChangeComboTipoMedicamento={handleChangeComboTipoMedicamento}
                onGuardarItem={handleGuardarItem}
                columns={columns}
                actions={actions}
                options={options}
                components={components}
                openModal={openModal}
                openModalServicios={openModalServicios}
                setMessage={setMessage}
                setSeverity={setSeverity}
                setOpenAlert={setOpenAlert}
                laboratorios={laboratorios}
                tipoMedicamentos={tipoMedicamentos}
            />
        </Fragment>
    )
}

export default Crud