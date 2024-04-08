import {Radio} from "./Radio";

export const GrupoRadio = ({ opcoes, valor, onChange }) => {
  console.log(opcoes, valor)
  return (
    <div>
      {opcoes.map((option) => (
        <Radio
          key={option.valor}
          valor={option.valor}
          label={option.label}
          checked={option.valor === valor}
          onClick={(event) => {console.log(event.target.value); onChange(option.valor)}}
        />
      ))}
    </div>
  );
};