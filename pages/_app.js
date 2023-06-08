import '../styles/globals.css'

import React, { useState, createContext } from 'react'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
    const [modal, setModal] = useState(false)
    const [projectNum, setProjectNum] = useState(-1)

    const value = {
        modal,
        setModal,
        projectNum,
        setProjectNum
    }

    return (
        <GlobalContext.Provider value={value}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    )
}

export default MyApp
