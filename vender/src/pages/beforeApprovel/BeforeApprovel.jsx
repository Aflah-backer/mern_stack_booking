import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext '
import "./beforeApprovel.scss"

function BeforeApprovel() {
  const navigate = useNavigate()
  const { dispatch, vender } = useContext(AuthContext)
  const handleClick =(e)=>{
    dispatch ({type: "LOGOUT"})
    navigate("/login")
  }
  return (
    <div className="container">
        <div className="navBar">
          <h4 className='textName'>WELCOME {vender.name}</h4>
          <button className='navButton' onClick={handleClick}>logout</button>
        </div>
            <h1 className='oneText'>waiting for admin approval</h1>  
        <div className="footer"></div>
    </div>
  )
}

export default BeforeApprovel