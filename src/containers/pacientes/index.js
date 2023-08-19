import React, { useState, Fragment } from "react"
import { MainContainer } from "./main"
import { tabRecetaId } from "../../utils/constants"

const MainPacientes = () => {

    const [value, setValue] = useState(0)
    const [recetaId, setRecetaId] = useState({})

    const handleChangeTab = (event, newValue) => {
        setValue(newValue)
    }

    const handleClickGenerarReceta = (rowData) => {
        setRecetaId(rowData)
        setValue(Number(tabRecetaId))
    }

    return (
        <Fragment>
            <MainContainer
                onChangeTab={handleChangeTab}
                value={value}
                recetaId={recetaId}
                onClickGenerarReceta={handleClickGenerarReceta} />
        </Fragment>
    )
}

export default MainPacientes