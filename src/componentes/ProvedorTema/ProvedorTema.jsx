import {ThemeProvider} from "@emotion/react"
export const ProvedorTema = ({children}) => {
    const tema = {
        cores: {
            branco: "#FFFFFF",
            preto: "#000000",
            atencao: "red",
            focus: "",
            primarias: {
                a: "#000000",
                b: "#FFFFFF",
                c: ""
            },
            secundaria: {
                a: "#F8F8FD",
                b: "",
                c: ""
            },
            neutras: {
                a: "#373737",
                b: "",
                c: "",
                d: ""
            },
            dark: {
                a: "",
                b: "deeppink"
            }
        },
        espacamentos:{
            xxs: "4px",
            xs: "8px",
            s: "16px",
            m: "24px",
            l: "32px",
            xl: "48px",
            xxl: "64px"
        },
        fontFamily: "'Montserrat', sans-serif"
    }
    return(
        <ThemeProvider theme={tema}>
            {children}
        </ThemeProvider>
    )
}