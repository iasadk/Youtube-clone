import React from 'react'
import { Typography, Box } from '@mui/material'
const apiError = () => {
  return (
    <Box minHeight="95vh" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h3" color="#fff">Key Expire/Invalid. Contact owner</Typography>
    </Box>
  )
}

export default apiError