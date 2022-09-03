import React from 'react'
import "../index.css"
import { Paper, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      navigate(`/search/${searchTerm}`, { replace: true })

    }
  }
  return (
    <Paper elevation={0} component="form"
      sx={{
        borderRadius: 20,
        pl: 2,
        border: "1px solid #e3e3e3",
        boxShadow: "none",
        mr: {
          sm: 2
        },
        display: "flex",
        flexDirection: "row"

      }}
      onSubmit={(e) => {handleSubmit(e)}}>
      <input className="search-bar" type="text" placeholder='Search' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
      <IconButton aria-label="submitBtn" type="submit" sx={{
        p: "10px",
        color: "red"
      }}>
        <Search />
      </IconButton>
    </Paper>
  )
}

export default SearchBar