import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b30e0e',
        },
        secondary: {
            main: '#D9D223',
        },
    },
});

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <ThemeProvider theme={theme}>
            <Grid 
                container 
                justifyContent= 'center'
                alignItems= "center"
                spacing={1}
                >
                <Grid item xs={4} theme={theme}>
                    <FormControl fullWidth>
                        <Input color="secondary" id="login_nome" aria-describedby="login_nome_helper_text" value={login} onChange={e => { setLogin(e.target.value) }} />
                        <FormHelperText color="primary" id="login_nome_helper_text">Login</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4} theme={theme}>
                    <FormControl fullWidth>
                        <Input color="secondary" id="senha_nome" aria-describedby="senha_nome_helper_text" value={senha} onChange={e => { setSenha(e.target.value) }} />
                        <FormHelperText color="primary" id="senha_nome_helper_text">Senha</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            
        </ThemeProvider>
    );
}

export default Login;
