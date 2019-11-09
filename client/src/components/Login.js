import React, { useState } from "react";
import api from '../utils/api'
import styled from 'styled-components'

const LoginDiv = styled.form`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 5rem auto;
`
const Input = styled.input`
    height: 2rem;
    width: 80%;
    margin: 1rem auto;
`
const Button = styled.button`
    width: 20%;
    margin: auto;
`

const Login = props => {
    const [error, setError] = useState()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        api()
            .post('/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/bubble-page')
            })
            .catch(err => {
                setError(err.response.data.message)
            })
    }

    return (
        <LoginDiv onSubmit={handleSubmit}>
            {error && <div className='error'>{error}</div>}

            <Input type='text' name='username' placeholder='username' value={user.username} onChange={handleChange} />
            <Input type='password' name='password' placeholder='password' value={user.password} onChange={handleChange} />

            <Button type='submit'>Login</Button>
        </LoginDiv>
    )
}

export default Login