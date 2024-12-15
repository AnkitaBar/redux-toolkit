import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  '&:hover': {
    color: '#f5ba13', // Optional hover effect
  },
});

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          My Website
        </Typography>
        <Button color="inherit">
          <StyledLink href="/">Home</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink href="/cms/createProduct">Create Product</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink href="/cms/allProducts">All Products</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink href="/auth/profile">Profile</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink href="/auth/login">Login</StyledLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
