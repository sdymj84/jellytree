import React, { createContext, useState, useEffect } from 'react'
import { getDb } from "../libs/getFbConfig";

export const DbContext = createContext()

const DbContextProvider = (props) => {
  const [db, setDb] = useState("")
  useEffect(() => {
    const getConfig = async () => {
      setDb(await getDb())
    }
    getConfig()
  }, [])

  return (
    <DbContext.Provider value={{ db }}>
      {props.children}
    </DbContext.Provider >
  )
}

export default DbContextProvider
