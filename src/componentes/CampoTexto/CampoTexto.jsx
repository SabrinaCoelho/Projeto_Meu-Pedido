import styled from "@emotion/styled"
import { Tipografia } from "../Tipografia/Tipografia"

const LabelEstilizada = styled.label`
    display: block;
    width: 100%;
    margin: ${props => props.theme.espacamentos.xs};
    box-sizing: border-box;
    font-wright: 400;
    font-size: 20px;
    line-height: 24ps;
`
const InputEstilizado = styled.input`
    display: block;
    width: 100%;
    margin-top: ${props => props.theme.espacamentos.xs};
    margin-bottom: ${props => props.theme.espacamentos.s};
    box-sizing: border-box;
    background: ${props =>  props.theme.cores.branco};
    border: 1px solid;
    border-color: ${props => props.theme.cores.neutras.a};
    border-radius: ${props => props.theme.espacamentos.xs};
    height: 40px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
`

export const CampoTexto = ({ titulo, valor, onChange, tipo = "text", erro }) => {
    return (
    <LabelEstilizada>
        {titulo}
        <InputEstilizado 
            value={valor} 
            onChange={event => onChange(event.target.value)}
            type={tipo}
        />
        {erro &&  <Tipografia variante="legenda" componente="legenda" color="red">
            {erro}
        </Tipografia>}
    </LabelEstilizada>)
}