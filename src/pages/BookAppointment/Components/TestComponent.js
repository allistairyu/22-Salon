import React from 'react'

import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'

const TestComponent = ({ nextStep, handleChange, values }) => {
    // for continue event listener
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    return (
        <Container  component="main" maxWidth="xs">
        <div>
            <Typography  component="h1" variant="h5">
            Sign up
            </Typography>
            <form>
            <Grid container spacing={2}>
                {/* email address */}
                <Grid item xs={12}>
                    <TextField 
                    placeholder="firstName"
                    label="firstName"
                    onChange={handleChange('firstName')}
                    defaultValue={values.firstName}
                    // variant="outlined"
                    autoComplete="firstName"
                    fullWidth
                    />
                </Grid>
                <br />
                {/* username */}
                <Grid item xs={12}>
                    <TextField 
                    placeholder="lastName"
                    label="lastName"
                    onChange={handleChange('lastName')}
                    defaultValue={values.lastName}
                    // variant="outlined"
                    autoComplete="lastName"
                    fullWidth
                    />
                </Grid>
                <br />
                {/* password */}
                <Grid item xs={12}>
                    <TextField 
                    placeholder="email"
                    label="email"
                    onChange={handleChange('email')}
                    defaultValue={values.password}
                    // variant="outlined"
                    autoComplete="email"
                    fullWidth
                    type="email"
                    />
                </Grid>
            </Grid>
            <br />
            <Button 
                onClick={ Continue }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Next
            </Button>
            </form>
        </div>
        </Container>
    )
}

export default TestComponent