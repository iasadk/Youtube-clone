import React from 'react'
import { Stack } from "@mui/material"
import { logo } from '../Utils/Constants'
import { Link } from "react-router-dom"
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <Stack direction="row" justifyContent="space-between" p={2} sx={{
      position : "sticky",
      top : "0",
      background : "#181818",
      zIndex:"1000"
    }} alignItems="center">
      <Link to="/">
        <img src={`${logo}`} alt="Youtube-clone-logo" height="45px"/>
      </Link>
      <SearchBar/>
    </Stack>
  )
}

export default Navbar