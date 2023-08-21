import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { addZero, dateToString } from '../../../utils/utils';
import { ButtonCustom } from '../../../components/basic/ButtonCustom';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 850,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  textField: {
    width: '100%',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
  button: {
    width: '100%',
    color: '#FFFFFF',
  },
  label: {
    marginTop: '0px',
    marginBottom: '0px',
    textAlign: 'center',
  },
  label_left: {
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '10px',
    textAlign: 'left',
  },
  label_left_mb10: {
    marginTop: '0px',
    marginBottom: '10px',
    marginLeft: '10px',
    textAlign: 'left',
  },
  label_left_60: {
    marginTop: '0px',
    marginBottom: '10px',
    marginLeft: '60px',
    textAlign: 'left',
  },
  label_right: {
    marginTop: '0px',
    marginBottom: '0px',
    marginRight: '10px',
    textAlign: 'right',
  },
  label_h: {
    marginTop: '0px',
    marginBottom: '28px',
    marginRight: '10px',
    textAlign: 'right',
  },
  label_foot: {
    fontSize: '11px',
    marginTop: '0px',
    marginRight: '10px',
    marginBottom: '10px',
    textAlign: 'right',
    fontWeight: 'bold',
  }
}));

const FormImprimirReceta = (props) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {
    receta,
    edad,
    onClickImprimir,
    onReturn,
    show,
    productos,
  } = props;

  return (
    <Fragment
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description" >

      <Grid container>
        {
          receta.productos.map((producto, index) => {
              {
                if ( index%5 === 0 ) {
                  return <Fragment>
                    <Grid container>
                      <Grid item xs={true} className={classes.label_right}>
                        <h3 className={classes.label_h}> { `DOCTORA` }</h3>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6} className={classes.label_right}>
                        <h3 className={classes.label_h}> {`${receta.paciente.nombres} ${receta.paciente.apellidos}`}</h3>
                      </Grid>
                      <Grid item xs={2} className={classes.label_right}>
                        <h3 className={classes.label_h}> {`${edad} `}</h3>
                      </Grid>
                    </Grid>
                    
                    <h1><br /></h1>
                    <Grid container>
                      <Grid item xs={12} className={classes.label_left}>
                        <h3 className={classes.label_left}>
                          {
                           `${producto.producto} - (${producto.laboratorio})`
                          }
                        </h3>
                      </Grid>
                      <Grid item xs={12} className={classes.label_left_60}>
                        {
                          `${producto.recomendacion}`
                        }
                      </Grid>
                    </Grid>
                  </Fragment>
                }
                return <Fragment>
                  <Grid container>
                    <Grid item xs={12} className={classes.label_left}>
                      <h3 className={classes.label_left}>
                        {
                         `${producto.producto} - (${producto.laboratorio})`
                        }
                      </h3>
                    </Grid>
                    <Grid item xs={12} className={classes.label_left_60}>
                      {
                        `${producto.recomendacion}`
                      }
                    </Grid>
                  </Grid>
                </Fragment> 
              }
          })          
        }
       
        {
          show ?
            <Fragment>
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                  onClick={onReturn}
                  text='REGRESAR' />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickImprimir}
                  text='IMPRIMIR' />
              </Grid>
            </Fragment> : ''

        }
      </Grid>
    </Fragment>
  );
}

export default FormImprimirReceta;