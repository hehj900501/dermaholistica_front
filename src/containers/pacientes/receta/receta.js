import React from "react";
import {
	makeStyles,
	Paper,
	Grid,
	TextField,
	FormControl,
} from "@material-ui/core";

import { Fragment } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ButtonCustom } from "../../../components/basic/ButtonCustom";
import TableComponent from "../../../components/table/TableComponent";
import myStyles from "../../../css";
import { ComboCustom } from "../../../components/basic/ComboCustom";

export const RecetaContainer = (props) => {

	const {
		productos,
		onChange,
		onChangeProducto,
		productoSeleccionado,
		onClickGuardarProducto,
		dataComplete,
		// MODAL IMPRIMIR RECETA
		onClickImprimirRecetaAntibioticos,
		onClickImprimirRecetaControlados,
		onClickImprimirReceta,
		receta,
		// TABLE DATA
		tituloNormal,
		tituloAntibioticos,
		tituloControlados,
		tituloEstudios,
		columns,
		columnsEstudio,
		productosNormales,
		productosAntibioticos,
		productosControlados,
		analisismedicos,
		actions,
		actionsEstudios,
		actions_controlados,
		options,
		components,
	} = props;

	console.log("KAOZ", productosAntibioticos)
	console.log("KAOZ", productosControlados)
	console.log("KAOZ", productosNormales)

	const classes = myStyles()

	return (
		<Fragment>

			<Grid container spacing={1} className={classes.container_main}>

				<Grid item xs={12}>
					<Paper>
						<Fragment>
							<Grid container>
								<Grid item xs={true}>
									<h1>{receta && receta.paciente ? `PACIENTE: ${receta.paciente.nombres} ${receta.paciente.apellidos}` : `SIN PACIENTE`}</h1>
								</Grid>
							</Grid>
						</Fragment>
					</Paper>
				</Grid>

				<Grid item xs={12} className={classes.label}>
					<h1 className={classes.label}>{`PRODUCTO`}</h1>
				</Grid>

				<Grid item xs={7} >
					<FormControl variant="outlined" className={classes.formControl}>
						<ComboCustom
							label='PRODUCTO'
							value={productoSeleccionado._id}
							onChange={onChangeProducto}
							options={productos}
							/>
					</FormControl>
				</Grid>

				<Grid item xs={5} className={classes.label}>
					<h2 className={classes.label}>{`LABORATORIO: ${productoSeleccionado ? productoSeleccionado.laboratorio : "-"}`}</h2>
				</Grid>

				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						name="recomendacion"
						label="RECOMENDACIÓN"
						value={productoSeleccionado.recomendacion}
						onChange={onChange}
						variant="outlined" />
				</Grid>
				<Grid item xs={12}>
					<ButtonCustom
						className={classes.button}
						color="primary"
						variant="contained"
						onClick={onClickGuardarProducto}
						disabled={dataComplete}
						text={'GURDAR'} />
				</Grid>

				<Grid item xs={12}>
					<Paper>
						{
							productosNormales && productosNormales.length > 0 ?
								<Fragment>
									<Grid item xs={12}>
										<TableComponent
											titulo={tituloNormal}
											columns={columns}
											data={productosNormales}
											actions={actions}
											options={options}
											components={components} />
									</Grid>

									<Grid item xs={12}>
										<ButtonCustom
											className={classes.button}
											color="primary"
											variant="contained"
											onClick={() => onClickImprimirReceta()}
											text={'IMPRIMIR RECETA'} />
									</Grid>

									<Grid item xs={12}>
										<br></br>
									</Grid>
								</Fragment>
								: ''
						}

						{
							productosAntibioticos && productosAntibioticos.length > 0 ?
								<Fragment>
									<Grid item xs={12}>
										<TableComponent
											titulo={tituloAntibioticos}
											columns={columns}
											data={productosAntibioticos}
											actions={actions}
											options={options}
											components={components} />
									</Grid>

									<Grid item xs={12}>
										<ButtonCustom
											className={classes.button}
											color="primary"
											variant="contained"
											onClick={() => onClickImprimirRecetaAntibioticos()}
											text={'IMPRIMIR ANTIBIÓTICOS'} />
									</Grid>

									<Grid item xs={12}>
										<br></br>
									</Grid>
								</Fragment>
								: ''
						}

						{
							productosControlados && productosControlados.length > 0 ?
								<Fragment>
									<Grid item xs={12}>
										<TableComponent
											titulo={tituloControlados}
											columns={columns}
											data={productosControlados}
											actions={actions_controlados}
											options={options}
											components={components} />
									</Grid>

									<Grid item xs={12}>
										<ButtonCustom
											className={classes.button}
											color="primary"
											variant="contained"
											onClick={() => onClickImprimirRecetaControlados()}
											text={'IMPRIMIR CONTROLADOS'} />
									</Grid>

									<Grid item xs={12}>
										<br></br>
									</Grid>
								</Fragment>
								: ''
						}
					</Paper>
				</Grid>
			</Grid>
		</Fragment>
	);
};
