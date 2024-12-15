import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {registration} from '@/redux/authSlice'

const StyledContainer = styled(Grid)({
    minHeight: '100vh',
    background: 'linear-gradient(135deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
});

const StyledForm = styled(Grid)({
    maxWidth: 400,
    width: '100%',
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
    marginTop: '20px',
    background: 'linear-gradient(135deg, #1976d2 30%, #64b5f6)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px',
    '&:hover': {
        background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
    },
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [profilePreview, setProfilePreview] = useState(null);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.profilePic.length > 0) {
            formData.append('profilePic', data.profilePic[0]);
        }
        dispatch(registration(formData)); // Replace with actual dispatch action
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Container>
            <StyledContainer container spacing={2}>
                <StyledForm item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('first_name', { required: 'First name is required' })}
                            label="First Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                        />
                        <TextField
                            {...register('last_name', { required: 'Last name is required' })}
                            label="Last Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        <TextField
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Invalid email format',
                                },
                            })}
                            label="Email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            {...register('password', { required: 'Password is required' })}
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                            <Grid item xs={3}>
                                <Avatar
                                    src={profilePreview || ''}
                                    alt="Profile Preview"
                                    sx={{ width: 60, height: 60 }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Profile Picture
                                    <input
                                        type="file"
                                        hidden
                                        {...register('profilePic')}
                                        onChange={(e) => {
                                            register('profilePic').onChange(e);
                                            handleProfilePicChange(e);
                                        }}
                                    />
                                </Button>
                                {errors.profilePic && (
                                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                                        {errors.profilePic.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <StyledButton
                            type="submit"
                            fullWidth
                            size="large"
                        >
                            Register
                        </StyledButton>
                    </form>
                </StyledForm>
            </StyledContainer>
        </Container>
    );
};

export default Register;
