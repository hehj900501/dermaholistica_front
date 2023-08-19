import XLSX from 'xlsx'

export const toFormatterCurrency = (value) => {
  const formatterDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatterDolar.format(value);
}

export const addZero = (value) => {
  return value < 10 ? '0' + value : value;
}

export const getToken = (empleado) => {
  return empleado.access_token;
}

export const dateToString = (date) => {
  const parseDate = new Date(date);
  return `${addZero(parseDate.getDate())}/${addZero(parseDate.getMonth() + 1)}/${parseDate.getFullYear()}`;
}

export const culcularEdad = (fecha_nacimiento) => {
  const today = new Date();

  const fechaNacimiento = fecha_nacimiento.split('/');
  const anioNacimiento = Number(fechaNacimiento[2]);
  const mesNacimiento = Number(fechaNacimiento[1]);
  const diaNacimiento = Number(fechaNacimiento[0]);

  const edad = (today.getFullYear() - anioNacimiento) - (mesNacimiento >= (today.getMonth() + 1) ? 1 : 0);

  return edad;
}

export const redondearDecimales = (value) => {
  const porcentaje = value + '';
  if (porcentaje.includes(".")) {
    return porcentaje.substr(0, (porcentaje.indexOf(".") + 3));
  } else {
    return porcentaje;
  }
}

export const downloadExcel = (fileName, sheetName, data) => {
  const newData = data.map(row => {
    delete row.tableData
    return row
  })
  const workSheet = XLSX.utils.json_to_sheet(newData)
  const workBook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook, workSheet, sheetName)
  //Buffer
  let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
  //Binary string
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
  //Download
  XLSX.writeFile(workBook, `${fileName}.xlsx`)
}