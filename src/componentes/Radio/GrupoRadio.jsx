/* import {Radio} from "./Radio";

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
}; */
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const GrupoRadio = ({ opcoes, valor, onChange }) => {
  
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {opcoes.map((option) => (
          <FormControlLabel 
            key={option.valor} 
            value={option.valor} 
            control={<Radio />} 
            label={option.label} 
            onClick={(event) => {
              console.log(event.target.value);//NAO MEXER NESSE TRECHO
              onChange(option.valor)}
            }
          />
      ))}
      </RadioGroup>
    </FormControl>
  );
}