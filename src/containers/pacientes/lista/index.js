import React, { useState, Fragment, useEffect } from "react"
import { Backdrop, CircularProgress, Select, FormControl, MenuItem } from '@material-ui/core'
import { PacientesContainer } from './pacientes'
import {
	updatePatient,
	createPatient,
} from '../../../services/pacientes'
import EditIcon from '@material-ui/icons/Edit'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import TodayIcon from '@material-ui/icons/Today'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import myStyles from "../../../css"
import { useNavigate } from "react-router-dom"
import { colorBase } from "../../../utils/constants"
import { showAllSexos } from "../../../services"
import { createReceta } from "../../../services/recetas"

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Pacientes = (props) => {

	const classes = myStyles()

	const {
		onClickGenerarReceta,
	} = props

	const [sexos, setSexos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const [openAlert, setOpenAlert] = useState(false)
	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('success')

	const [nuevoPaciente, setNuevoPaciente] = useState({})

	const dataComplete = !nuevoPaciente.nombres || !nuevoPaciente.apellidos || !nuevoPaciente.telefono
		|| !nuevoPaciente.email || !nuevoPaciente.fecha_nacimiento || !nuevoPaciente.sexo

	const columns = [
		{ title: 'NOMBRES', field: 'nombres' },
		{ title: 'APELLIDOS', field: 'apellidos' },
		{ title: 'TELÉFONO', field: 'telefono' },
		{ title: 'EMAIL', field: 'email' },
		{ title: 'SEXO', field: 'sexo.nombre' },
		{ title: 'FECHA DE NACIMIENTO', field: 'fecha_nacimiento' },
		{ title: 'DIAGNÓSTICO', field: 'diagnostico' },
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
		exportAllData: true,
		exportDelimiter: ';',
	}

	const handleChange = (e) => {
		setNuevoPaciente({
			...nuevoPaciente,
			[e.target.name]: e.target.value.toUpperCase()
		})
	}

	const handleChangeSexo = (e, newValue, name) => {
		setNuevoPaciente({
			...nuevoPaciente,
			[name]: newValue
		})
	}

	const handleChangeEmail = (e) => {
		setNuevoPaciente({
			...nuevoPaciente,
			email: e.target.value
		})
	}

	// const handleCloseAlert = () => {
	// 	setOpenAlert(false)
	// }

	const handleOnClickGuardar = async () => {
		setIsLoading(true)
		const response = nuevoPaciente._id ? await updatePatient(nuevoPaciente._id, nuevoPaciente) : await createPatient(nuevoPaciente)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK
			|| `${response.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
			setSeverity('success')
			setOpenAlert(true)
			setMessage(nuevoPaciente._id ? 'PACIENTE ACTUALIZADO' : 'PACIENTE CREADO')
			setNuevoPaciente({})
		}

		setIsLoading(false)
	}

	const handleOnClickEditar = (event, rowData) => {
		setNuevoPaciente({...rowData})
	}

	const handleOnClickReceta = async (event, rowData) => {
		setIsLoading(true)
		const newReceta = {
			paciente: rowData._id,
			productos: []
		}

		const responseReceta = await createReceta(newReceta)
		if (`${responseReceta.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
			onClickGenerarReceta(responseReceta.data._id)
			setIsLoading(false)
		}
	}

	const actions = [
		{
			icon: EditIcon,
			tooltip: 'ACTUALIZAR REGISTRO',
			onClick: handleOnClickEditar
		},
		{
			icon: EditIcon,
			tooltip: 'GENERAR RECETA',
			onClick: handleOnClickReceta
		}
	]

	const onChangeActions = (e, rowData) => {
		const action = e.target.value
		switch (action) {
			case 'ACTUALIZAR REGISTRO':
				handleOnClickEditar(e, rowData)
				break
			case 'GENERAR RECETA':
				handleOnClickReceta(e, rowData)
				break
		}
	}

	const components = {
		Actions: props => {
			return props.actions.length > 0
				? <Fragment>
					<FormControl variant="outlined" className={classes.formControl}>
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

	const loadSexos = async () => {
		const response = await showAllSexos()
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setSexos(response.data)
		}
	}

	useEffect(() => {
		loadSexos()
	}, [])

	return (
		<Fragment>
			{
				!isLoading ?
					<PacientesContainer
						columns={columns}
						titulo='PACIENTES'
						actions={actions}
						components={components}
						options={options}
						nuevoPaciente={nuevoPaciente}
						sexos={sexos}
						onClickGuardar={handleOnClickGuardar}
						onChange={handleChange}
						onChangeSexo={handleChangeSexo}
						onChangeEmail={handleChangeEmail}
						dataComplete={dataComplete}
					// colorBase={colorBase}
					// setIsLoading={setIsLoading}
					/> :
					<Backdrop className={classes.backdrop} open={isLoading} >
						<CircularProgress color="inherit" />
					</Backdrop>
			}
		</Fragment>
	)
}

export default Pacientes