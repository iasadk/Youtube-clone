import React from 'react'
import loader from "../assests/loader.gif"
import {Box} from"@mui/material"
const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={4}>
        <img src={loader} alt="Loader" width="80px"/>
    </Box>
  )
}

export default Loader