import React, { Fragment } from 'react'
import myStyles from '../../../css'
import { FormControl, Grid, TextField } from '@material-ui/core'
import TableComponent from '../../../components/table/TableComponent'
import { ButtonCustom } from '../../../components/basic/ButtonCustom'
import { ComboCustom } from '../../../components/basic/ComboCustom'
import { baseUrl } from '../../../services'

export const PacientesContainer = (props) => {

  const classes = myStyles()

  const {
    nuevoPaciente,
    onChange,
    onChangeEmail,
    onChangeSexo,
    sexos,
    onClickGuardar,
    dataComplete,
    // PROPIEDADES DE LA TABLA
    titulo,
    columns,
    actions,
    components,
    options,
    allShrink,
  } = props

  const pacientes = query =>
    new Promise((resolve, reject) => {
      const url = `${baseUrl}/paciente/remote?per_page=${query.pageSize}&page=${query.page + 1}&search=${query.search}`
      fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${empleado.access_token}`
        // }
      })
        .then(response => response.json())
        .then(result => {
          resolve({
            data: result.data,
            page: result.page - 1,
            totalCount: result.total,
          })
        })
    })

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="nombres"
            label="NOMBRES"
            value={nuevoPaciente.nombres}
            onChange={onChange}
            variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="apellidos"
            label="APELLIDOS"
            value={nuevoPaciente.apellidos}
            onChange={onChange}
            variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="telefono"
            label="TELÉFONO"
            value={nuevoPaciente.telefono}
            onChange={onChange}
            inputProps={{
              maxLength: "10",
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="email"
            label="EMAIL"
            value={nuevoPaciente.email}
            onChange={onChangeEmail}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="fecha_nacimiento"
            label="FECHA DE NACIMIENTO"
            value={nuevoPaciente.fecha_nacimiento}
            onChange={onChange}
            inputProps={{
              maxLength: "10",
              placeholder: "dd/mm/aaaa"
            }}
            variant="outlined" />
        </Grid>
        <Grid item xs={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <ComboCustom
            InputLabelProps={{ shrink: allShrink }}
              label='SEXO'
              value={nuevoPaciente.sexo}
              onChange={(event, value) => onChangeSexo(event, value, 'sexo')}
              options={sexos} />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: allShrink }}
            name="diagnostico"
            label="DIAGNÓSTICO"
            value={nuevoPaciente.diagnostico}
            onChange={onChange}
            variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ButtonCustom
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={onClickGuardar}
            disabled={dataComplete}
            text='GUARDAR PACIENTE' />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <TableComponent
            titulo={titulo}
            columns={columns}
            data={pacientes}
            actions={actions}
            options={options}
            components={components} />
        </Grid>
      </Grid>
    </Fragment>
  )
}
