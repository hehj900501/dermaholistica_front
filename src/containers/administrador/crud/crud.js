import React from 'react'
import { Fragment } from 'react'
import { FormControl, Grid, TextField } from '@material-ui/core'
import { ButtonCustom } from '../../../components/basic/ButtonCustom'
import TableComponent from '../../../components/table/TableComponent'
import myStyles from '../../../css'
import { ComboCustom } from '../../../components/basic/ComboCustom'
// import ModalItemCatalogo from '../../../../components/modales/item_catalogo'
// import ItemServicio from '../../../../components/modales/item_catalogo/servicios'

export const CrudContainer = props => {
	const {
		catalogo,
		data,
		newItem,
		onChangeComboLaboratorio,
		onChangeComboTipoMedicamento,
		onChange,
		laboratorios,
		tipoMedicamentos,
		onGuardarItem,
		// TABLE PROPERTIES
		columns,
		actions,
		options,
		components,
	} = props

	const classes = myStyles()

	const getOptions = (collection) => {
		switch (collection) {
			case 'laboratorios':
				return laboratorios
			case 'tipomedicamentos':
				return tipoMedicamentos
		}
	}

	const styles = {
		button: {
            width: '100%',
            color: 'white',
            backgroundColor: 'blue',
        }
	}
	return (
		<Fragment >
			{/* {
				openModal ?
					<ModalItemCatalogo
						open={openModal}
						onClose={onCloseModal}
						loadCatalogos={loadCatalogos}
						empleado={empleado}
						item={item}
						catalogo={catalogo}
						setMessage={setMessage}
						setSeverity={setSeverity}
						setOpenAlert={setOpenAlert}
					/>
					: ''
			} */}
			{/* {
				openModalServicios ?
					<ItemServicio
						open={openModalServicios}
						onClose={onCloseModal}
						item={item}
						catalogo={catalogo}
						setMessage={setMessage}
						setSeverity={setSeverity}
						setOpenAlert={setOpenAlert}
					/>
					: ''
			} */
		}
			<Grid container spacing={3} className={`${classes.container_main}, ${classes.ajuste}`}>
				{
					catalogo.columns.map(column => {
						switch (column.type) {
							case 'text':
								return <Fragment>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											name={column.field}
											label={column.title}
											value={newItem[column.field]}
											onChange={onChange}
											variant="outlined" />
									</Grid>

								</Fragment>
							// case 'bool':
							// 	return <Fragment>
							// 		<Grid item xs={6}>
							// 			<FormControl variant="outlined" className={classes.formControl}>
							// 				<InputLabel id="simple-select-outlined">{column.title}</InputLabel>
							// 				<Select
							// 					labelId={column.field}
							// 					id={column.field}
							// 					name={column.field}
							// 					value={values[column.field]}
							// 					onChange={onChangeSelect}
							// 					label={column.title} >
							// 					{booleanObjects.sort().map((item, index) => <MenuItem key={index} value={item.value}>{item.descripcion}</MenuItem>)}
							// 				</Select>
							// 			</FormControl>
							// 		</Grid>
							// 	</Fragment>
							// case 'text_date':
							// 	return <Fragment>
							// 		<Grid item xs={12}>
							// 			<TextField
							// 				className={classes.textField}
							// 				name={column.field}
							// 				label={column.title}
							// 				value={values[column.field]}
							// 				onChange={onChange}
							// 				inputProps={{
							// 					maxLength: "10",
							// 					placeholder: "dd/mm/aaaa"
							// 				}}
							// 				variant="outlined" />
							// 		</Grid>
							// 	</Fragment>
							// case 'date':
							// 	return <Fragment>
							// 		<Grid item xs={6}>
							// 			<MuiPickersUtilsProvider utils={DateFnsUtils}>
							// 				<Grid
							// 					container
							// 					justify="center"
							// 					alignItems="center" >
							// 					<KeyboardDatePicker
							// 						className={classes.formControl}
							// 						autoOk
							// 						variant="inline"
							// 						format="dd/MM/yyyy"
							// 						margin="normal"
							// 						id="date-picker-inline"
							// 						label={column.title}
							// 						value={values[column.field]}
							// 						onChange={(date, show) => onChangeDate(date, show, column.field)}
							// 						KeyboardButtonProps={{
							// 							'aria-label': 'change date',
							// 						}}
							// 						invalidDateMessage='SELECCIONA UNA FECHA' />
							// 				</Grid>
							// 			</MuiPickersUtilsProvider>
							// 		</Grid>
							// 	</Fragment>
							case 'autocompleteLaboratorios':
								return <Fragment>
									<Grid item xs={12}>
										<FormControl variant="outlined" className={`${classes.margin}, ${classes.textField}`}>
											<ComboCustom
												label={column.title}
												value={newItem.laboratorio}
												onChange={onChangeComboLaboratorio}
												options={getOptions(column.collection)} />
										</FormControl>
									</Grid>
								</Fragment>
							case 'autocompleteTipoMedicamentos':
								return <Fragment>
									<Grid item xs={12}>
										<FormControl variant="outlined" className={`${classes.margin}, ${classes.textField}`}>
											<ComboCustom
												label={column.title}
												value={newItem.tipo_medicamento}
												onChange={onChangeComboTipoMedicamento}
												options={getOptions(column.collection)} />
										</FormControl>
									</Grid>
								</Fragment>

							// case 'porcentaje':
							// 	return <Fragment>
							// 		<Grid item xs={12}>
							// 			<TextField
							// 				className={classes.textField}
							// 				name={column.field}
							// 				label={column.title}
							// 				value={values[column.field]}
							// 				onChange={onChange}
							// 				type='Number'
							// 				onInput={(e) => {
							// 					e.target.value = e.target.value > 100 ? 100 : e.target.value;
							// 					e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 3)
							// 				}}
							// 				variant="outlined" />
							// 		</Grid>

							// 	</Fragment>
						}

					})
				}
				<Grid item xs={12}>
				<ButtonCustom
                  className={classes.button}
                  onClick={onGuardarItem}
                  text='GUARDAR' />
				</Grid>
				<Grid item xs={12}>
					<TableComponent
						titulo={catalogo._id ? catalogo.nombre : 'SELECCIONA UN CATÁLOGO'}
						columns={columns}
						data={data}
						actions={actions}
						options={options}
						components={components} />
				</Grid>
			</Grid>
		</Fragment>
	)
}
