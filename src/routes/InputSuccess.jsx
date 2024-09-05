import { useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState} from "react";

function InputSuccess() {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', m:2 }}>
            <Paper sx={{width:'80%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:5}}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/input')}
                >
                    再输一个
                </Button>
            </Paper>
        </Container>
    );
}

export default InputSuccess;