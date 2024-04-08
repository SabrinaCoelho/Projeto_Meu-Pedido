import styled from "@emotion/styled"

const DivEstilizada = styled.div`
    padding: ${props => props.theme.espacamentos.l};
    background: ${props => props.theme.cores.secundaria.a};
    border: 1px solid ;
    border-color: ${props => props.theme.cores.primarias.a};
    border-radius: ${props => props.theme.espacamentos.s};
`

export const WrapperConteudo = ({children}) => {
    return (
        <DivEstilizada>
            {children}
        </DivEstilizada>
    )
}