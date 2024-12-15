import { showProductFn, singleProductDetails, updateProductsFn } from '@/redux/cmsSlice';
import { Avatar, Button, Container, Grid, Input, Paper, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
    const [image, setImage] = useState();
  
    const router = useRouter();
    const { slug } = router.query;

    const { showProducts } = useSelector((x) => x?.Cms);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(showProductFn(slug));
    },[slug])

    
const onSubmit = async (data) => {
    // setLoading(true);
    const formData = new FormData();
    formData.append('id', slug);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", productDetails.image);
    }

    dispatch(updateProductsFn(formData));
  };


useEffect(()=>{
    if (showProducts) {
        setValue("title", showProducts.title);
        setValue("description", showProducts.description);
        setValue("image", showProducts.image);
        // setValue("brand", showProducts.brand);
    }
},[showProducts])

//   console.log(productDetails, "productDetails");
  return (
    <Container maxWidth="sm" sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}>
        <Paper elevation={3} sx={{
          padding: 4,
          marginTop: 4,
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#3f51b5' }}>
            Update Product
          </Typography>
          <form 
          onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  // label="Title"
                  name="title"
                  required
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 3 characters',
                    },
                  })}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                  sx={{
                    '& .MuiInputBase-root': { color: '#000' },
                    '& .MuiFormLabel-root': { color: '#000' },
                  }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  // label="Description"
                  name="description"
                  type="text"
                  required
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 3,
                      message: 'Description must be at least 3 characters',
                    },
                  })}
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ''}
                  sx={{
                    '& .MuiInputBase-root': { color: '#000' },
                    '& .MuiFormLabel-root': { color: '#000' },
                  }}
                />
              </Grid>
  
              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
                <Avatar
                  alt="Product Picture"
                  src={
                    image 
                      ? URL.createObjectURL(image) 
                      : showProducts?.image 
                        ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${showProducts.image}`
                        : ''
                  }
                  sx={{ width: 90, height: 90 }}
                />
                <label htmlFor="product-pic-upload">
                  <Input
                    accept="image/*"
                    id="product-pic-upload"
                    type="file"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <Button variant="contained" component="span" sx={{
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#303f9f',
                    },
                  }}>
                    Upload Product Pic
                  </Button>
                </label>
              </Stack>
  
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                }}>
                   {/* {loading ? 'Updating...' : 'Update Product'}  */}
                   update
                  
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
  )
}

export default ProductDetails