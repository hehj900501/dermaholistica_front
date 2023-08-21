import React from 'react';
import { Fragment } from 'react';
import { Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import Crud from './crud';
import { ListItemButton } from '@mui/material';
import myStyles from '../../css';

export const AdministradorContainer = props => {
	const {
		onClickCatalogo,
		catalogos,
		catalogo,
		loadCatalogos,
		data,
		empleado,
		setMessage,
		setSeverity,
		setOpenAlert,
		setIsLoading,
		selectedIndex,
		laboratorios,
		tipoMedicamentos,
	} = props;

	const classes = myStyles();

	return (
		<Fragment >
			<Grid container spacing={3} className={classes.container_main}>
				<Grid item xs={12} sm={3}>
					<Paper>
						<h1>CATÁLOGOS</h1>
						<List component='nav' aria-label='menu-catalogos'>
							{
								catalogos.map((catalogoItem, index) => {
									return (
										<Fragment>
											<ListItem disablePadding>
												<ListItemButton
													selected={selectedIndex === index}
													onClick={() => onClickCatalogo(catalogoItem, index)}>
													<ListItemText primary={`${catalogoItem.nombre}`} />
												</ListItemButton>
											</ListItem>
										</Fragment>
									)
								})
							}
						</List>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={9} className={classes.container_child}>
					<Paper>
						<Crud
							catalogo={catalogo}
							loadCatalogos={loadCatalogos}
							data={data}
							empleado={empleado}
							setMessage={setMessage}
							setSeverity={setSeverity}
							setOpenAlert={setOpenAlert}
							laboratorios={laboratorios}
							setIsLoading={setIsLoading}
							tipoMedicamentos={tipoMedicamentos}
						/>
					</Paper>
				</Grid>
			</Grid>
		</Fragment>
	);
}
