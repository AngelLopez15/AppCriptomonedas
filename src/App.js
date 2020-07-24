import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import axios from 'axios';

// para importar imagene en React
import imagen from './criptomonedas.svg'
import { Formulario } from './components/Formulario';
import { Cotizacion } from './components/Cotizacion';
import { Spinner } from './components/Spinner';

// styled componenets
const Contenedor = styled.div`
  max-width:900px;
  margin:0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns:repeat(2,1fr);
    grid-gap:2rem;
  }
`
const Footer = styled.footer`
  max-width:100%;
  margin:40px auto;
  text-align:center;
  color: #fff;
  margin-top:5rem;
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top:5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color:#fff;
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;

  &::after{
    content:'';
    width:100px;
    height: 6px;
    background-color:#66A2FE;
    display:block;
  }
`

function App() {

  const [moneda, setMoneda] = useState('')

  const [criptomoneda, setCriptomoneda] = useState('')

  const [resultado, setResultado] = useState({})

  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const  cotizarCriptomoneda = async() =>{
      // evitamos la ejecucion por primera vez al cargar el componenete
      if (moneda==='') {
        return
      }
      // consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
      const resultado = await axios.get(url)

      // mostar el Spinner
      setCargando(true)

      // Ocultar el Spinner y mostar el resultado
      setTimeout(() => {
        // cambiar el estado de cargando
        setCargando(false)
        // ocupamos la forma de corchetes [ ] para acceder al resultado de la API de forma dinamica
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 1500);
    }
    cotizarCriptomoneda()
  }, [moneda, criptomoneda])

  // Mostar el spinner o el resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="bitcoin"
        />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas
        </Heading>
        <Formulario 
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />
        {componente}
        <Footer>
          <p>Hecho por Angel López con la tutoria de Juan Pablo de la Torre  | 2020</p>
        </Footer>
      </div>
    </Contenedor>
  );
}

export default App;
