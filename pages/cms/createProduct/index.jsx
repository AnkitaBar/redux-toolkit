import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {createProduct} from '@/redux/cmsSlice'

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

const create = () => {

      const { register, handleSubmit, formState: { errors } } = useForm();
        const dispatch = useDispatch();
        const [profilePreview, setProfilePreview] = useState(null);
    
        const onSubmit = (data) => {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
        
            if (data.image.length > 0) {
                formData.append('image', data.image[0]);
            }
            dispatch(createProduct(formData)); 
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
                Create Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('title', { required: 'title name is required' })}
                    label="title Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <TextField
                    {...register('description', { required: 'description is required' })}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            

                <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                    <Grid item xs={3}>
                        <Avatar
                            src={profilePreview || ''}
                            alt="image Preview"
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
                                {...register('image')}
                                onChange={(e) => {
                                    register('image').onChange(e);
                                    handleProfilePicChange(e);
                                }}
                            />
                        </Button>
                        {errors.image && (
                            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                                {errors.image.message}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                <StyledButton
                    type="submit"
                    fullWidth
                    size="large"
                >
                    Create Product
                </StyledButton>
            </form>
        </StyledForm>
    </StyledContainer>
</Container>
  )
}

export default create
