import { ErrorOutline } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notFound">
    <div className="notFoundContainer">
      <ErrorOutline />
      <Typography variant="h2" style={{ padding: "2vmax" }}>
        Page Not Found
      </Typography>

      <Link to="/account">
        <Typography variant="h5">Go to Your Account</Typography>
      </Link>
    </div>
  </div>
  )
}

export default NotFound
