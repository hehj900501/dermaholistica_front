import React from "react"
import { createMuiTheme, Button, ThemeProvider } from "@material-ui/core"
import { colorBase } from "../../utils/constants"

const theme = createMuiTheme({
	palette: {
		primary: { main: colorBase },
	}
})

export const ButtonCustom = (props) => {

    const {
        className,
        type,
        color,
        variant,
        onClick,
        disabled,
        text
    } = props

    return (
        <ThemeProvider theme={theme}>
            <Button
                className={className}
                type={type}
                color={color}
                variant={variant}
                onClick={onClick}
                disabled={disabled} >
                {text}
            </Button>
        </ThemeProvider>
    )
}