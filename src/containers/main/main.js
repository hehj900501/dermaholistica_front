import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import myStyles from '../../css'
import { colorBase } from '../../utils/constants'
import MainPacientes from '../pacientes'
import Administrador from '../administrador'

const TabPanel = (props) => {
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
			{value === index && <Box>{children}</Box>}
		</Typography>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

export const MainContainer = props => {

	const {
		onChangeTab,
		value,
		empleado,
	} = props

	const classes = myStyles()
	const theme = useTheme()
	const [openDrawer, setOpenDrawer] = useState(false)

	const handleDrawerOpen = () => {
		setOpenDrawer(true)
	}

	const handleDrawerClose = () => {
		setOpenDrawer(false)
	}

	return (
		<div className={classes.root}>
			
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: openDrawer,
				})} >
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: openDrawer,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{`DERMAHOLISTICA`}
					</Typography>

				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={openDrawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button key={'PACIENTES'} onClick={(e) => onChangeTab(e, 0, handleDrawerClose)}>
						<ListItemText primary={'PACIENTES'} />
					</ListItem>

					<ListItem button key={'ADMINISTRADOR'} onClick={(e) => onChangeTab(e, 1, handleDrawerClose)}>
						<ListItemText primary={'ADMINISTRADOR'} />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: openDrawer,
				})}
			>
				<div className={classes.drawerHeader} />
				<Fragment className={classes.fragment}>
					<TabPanel value={value} index={0}>
						<MainPacientes
							empleado={empleado} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Administrador
							empleado={empleado} />
					</TabPanel>
				</Fragment>
			</main>
		</div>
	)
}