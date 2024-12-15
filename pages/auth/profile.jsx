// import { profile_pic } from '@/api/axios/axios';
import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, Profile } from '@/redux/authSlice';
import { profile_pic } from '@/api/axios';

const ProfileDetails = () => {
    const [loading, setLoading] = useState(false);
    const { userProfile } = useSelector((x) => x?.Auth);
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  console.log(userProfile, 'userProfile');

  return (
    <Container maxWidth="md" sx={{ height: '100vh' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"  // Center the card vertically
        style={{ height: '100%' }}  // Ensure the Grid container takes up the full height
      >
        <Card
          sx={{
            maxWidth: 400,
            padding: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          {/* <img src={profile_pic(user.profile_picture)}/>  */}
          <Avatar
            src={profile_pic(userProfile.profile_pic) || '/default-avatar.png'} // Show default avatar if user data is unavailable
            alt={loading ? 'Loading...' : `${userProfile?.first_name} ${userProfile?.last_name}`} // Corrected template literal
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto 16px auto',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />

            {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"}}>
           
              <Avatar alt="Remy Sharp" src={profile_pic(user.profile_pic)} />

            </div> */}
          <CardContent>
          
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
               {userProfile.first_name} {userProfile.last_name}
            </Typography>
            <Typography
              variant="body1"
              // color="text.secondary"
              sx={{ marginBottom: '8px', fontStyle: 'italic', color: '#333' }}
            >
               Email: {userProfile.email}
            </Typography>
            <Typography
              variant="body1"
              // color="text.secondary"
              sx={{ marginBottom: '16px', fontStyle: 'italic', color: '#333' }}
            >
              Role: {userProfile.role_data?.roleDisplayName || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default ProfileDetails