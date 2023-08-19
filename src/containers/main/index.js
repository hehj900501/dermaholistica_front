import React, { useState, Fragment } from "react"
import { MainContainer } from "./main"
import { Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

const MenuMain = () => {

	const [value, setValue] = useState(0)
	const [openAlert, setOpenAlert] = useState(false)
	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('success')

	const empleado = "EMPLEADO"

	const handleChangeTab = (event, newValue, close) => {
		setValue(newValue)
		close()
	}

	const handleCloseAlert = () => {
		setOpenAlert(false)
	}

	let fragment = <Fragment>
		<MainContainer
			onChangeTab={handleChangeTab}
			empleado={empleado}
			value={value}
			setMessage={setMessage}
			setSeverity={setSeverity}
			setOpenAlert={setOpenAlert} /> 	
	</Fragment>


	return (
		<Fragment>
			{fragment}
			<Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		</Fragment>
	)
}

export default MenuMain