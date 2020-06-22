import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './municipios.jpg';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Extractor from './components/Extractor';
import axios from 'axios';



const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media(min-width:992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`;

const Imagen = styled.img`
max-width: 100%;
width: 70%;
`;

const Heading = styled.h1`
font-family: 'Franklin Gothic Medium'
color: #FFF;
text-align: center;
font-weight: 700px;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;


`;



function App() {
  const [provincia, guardarProvincia] = useState('');
  const [municipio, guardarMunicipio] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect (()=>{
    const extraerMunicipio = async () =>{
      //Evitamos la ejecución la primera vez
      if(provincia === '') return;
      //Consultar la API para obtener info del Municipio
      const url = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&id=${municipio}`
      const resultado = await axios.get(url);
            
      //Mostrar el spinner
      guardarCargando(true);
      //Ocultar el spinner y mostrar el resultado
      setTimeout(()=>{
        guardarCargando(false)
        
      //Guardar la info
      guardarResultado(resultado.data.municipios[0]);
         
      },3000);     
}
extraerMunicipio();
}, [provincia,municipio]);

 //Mostrar el Spinner o resultado
 const componente = (cargando) ? <Spinner/> : <Extractor resultado={resultado}/> 
return (
  <div>
  <Contenedor>
    <div>
      <center>
      <Imagen
      src={imagen}
      alt= "imagen municipios"
      />
      
      
    
    <div>
      <Heading>Municipios de Argentina</Heading>
      <Formulario
      guardarProvincia={guardarProvincia}
      guardarMunicipio={guardarMunicipio}
      />
     {componente}
    </div>
    </center>
    </div>
  </Contenedor>
  
  
  </div>
  );

}

export default App;