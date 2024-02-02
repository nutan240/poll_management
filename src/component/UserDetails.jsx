import React from 'react'
import Table from './Table'
import { Button, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'

function UserDetails() {
  return (
    <>
    <Stack   >
    
    <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={"/admin"}
            >
              <Button
           
                sx={{ my: 2, color: "#8C7569", display: "block"  }}
              >
               go back
              </Button>
            </NavLink>
            <Table/>
    </Stack>
    
        
    </>
  )
}

export default UserDetails