import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import myStyles from '../../css'
import Pacientes from './lista'
import Receta from './receta'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export const MainContainer = props => {

	const {
		onChangeTab,
		value,
		recetaId,
		onClickGenerarReceta,
	} = props

	const classes = myStyles()

	return (
		<div >
			<AppBar
				className={classes.bar}
				position="sticky" >
				<Tabs
					value={value}
					onChange={onChangeTab}
					aria-label="simple tabs"
					variant="scrollable"
					scrollButtons="on" >
					<Tab className={classes.tabs} label="PACIENTES" {...a11yProps(0)} />
					<Tab className={classes.tabs} label="RECETA" {...a11yProps(1)} />
				</Tabs>
				
			</AppBar>
			<TabPanel value={value} index={0}>
				<Pacientes
					onClickGenerarReceta={onClickGenerarReceta} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Receta 
					recetaId={recetaId} />
			</TabPanel>
			
		</div>
		
	)
}
