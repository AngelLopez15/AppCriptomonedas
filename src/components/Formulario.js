import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useMoneda } from '../hooks/useMoneda'
import { useCriptoMoneda } from '../hooks/useCriptomoneda'
import { Error } from './Error'
import axios from 'axios'

const Boton = styled.button`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width: 100%;
    border-radius:10px;
    color:#fff;
    transition:background-color .3s ease;
    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`

export const Formulario = ({setMoneda, setCriptomoneda}) => {

    // state del listado de criptomonedas
    const[listaCripto, guardarCriptomonedas] = useState([])

    const [error, setError] = useState(false)

    const monedas = [
        {codigo:'USD', nombre:'USA Dolar'},
        {codigo:'MXN', nombre:'Peso Méxicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '',monedas)

    // Utizando useCriptoMoneda
    const [criptomoneda, SelectCripto] = useCriptoMoneda('Elige tu cripto moneda', '', listaCripto) 

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    // Cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault()
        // validar si ambos campos estan llenos
        if (moneda==='' || criptomoneda === '') {
            setError(true)
            return
        } else {
            // pasar los datos al componenete principal
            setError(false)
            setMoneda(moneda)
            setCriptomoneda(criptomoneda)
        }
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >   
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            >
                Calcular
            </Boton>
        </form>
    )
}
