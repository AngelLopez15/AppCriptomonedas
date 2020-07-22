import React, { useState, Fragment } from 'react'

export const useMoneda = () => {
    // State de nuestro customhook
    const [state, actualizarState] = useState('')

    const Seleccionar = () => (
        <Fragment>
            <label>Moneda</label>
            <select>
                <option value="MXN">Peso Méxicano</option>
            </select>
        </Fragment>
    )

    // Retornar state, interfaz y funcion que modifica el state
    return [state, Seleccionar, actualizarState]
}
