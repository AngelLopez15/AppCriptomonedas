import React, { useState, Fragment } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    font-size:2.4rem;
    margin-top:2rem;
    display:block;
` 

const Select = styled.select`
    width: 100%;
    display: block;
    padding:1rem;
    border-radius:10px;
    border:none;
    font-size:1.2rem;
`

export const useCriptoMoneda = (label,stateInicial, opciones) => {
    // State de nuestro customhook
    const [state, actualizarState] = useState(stateInicial)

    const SeleccionarCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e=>actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-Seleccione-</option>
                {opciones.map(opcion=>(
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))
                }
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y funcion que modifica el state
    return [state, SeleccionarCripto, actualizarState]
}
