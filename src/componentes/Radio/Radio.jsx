import styled from "@emotion/styled";


const LabelEstilizada = styled.label`
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-left: ${props => props.theme.espacamentos.xs};
    margin-bottom: ${props => props.theme.espacamentos.m};
    cursor: pointer;
    padding: ${props => props.theme.espacamentos.xs};
    &:hover {
        &:before {
            border-color: ${props => (props.theme.cores.focus)};
        }
    }
    &:before {
        content: '';
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid ${props => props.theme.cores.neutras.a};
        border-color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        cursor: pointer;
        background-color: ${props => (props.checked ? props.theme.cores.dark.b : props.theme.cores.primarias.b)};
        border-color: ${props => (props.checked ? props.theme.cores.preto : 'inherit')};
    }
`;

const InputEscondido = styled.input`
    appearance: none;
    opacity: 0;
    &:focus + label {
        border-radius: 16px;
        border: 1px solid;
        border-color: blue;
    }
`

export const Radio = ({ valor, label, checked, onClick }) => (
    <>
        <InputEscondido type="radio" valor={valor} checked={checked} onChange={onClick} id={`radio-customizado-${valor}`}/>
        <LabelEstilizada htmlFor={`radio-customizado-${valor}`} checked={checked}>
            {label}
        </LabelEstilizada>
    </>
);