import { Card, CardContent, Divider, Paper, Typography, Avatar, Box, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ClimbingStyleCardProfile from "./climbingStyleCardProfile";
import { useCheckAuthentication, loginMessage } from "../../../Auth/auth";
import React, { useState, useEffect } from 'react';

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}




const UserProfileCard = ( ) => {
  const [user, setUser] = useState({});
  const [preferences, setPreferences] = useState({});
  const [firstRender, setFirstRender] = useState(true)
  const [loading, setLoading] = useState(true);
  const userBirthday = preferences.birthday;
  const userAge = calculateAge(userBirthday)
 

  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  useEffect(() => {
    if (firstRender) {
    if (isAuthenticated) {
      fetch("http://localhost:3001/show-profile", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error('Server response is not JSON');
        }
      })
      .then(data => {
        console.log('Data received from server:', data);
        setUser(data.user);
        setPreferences(data.preferences);
        setFirstRender(false)
        setLoading(false)

      })
      .catch(err => {
        console.error("Error:", err);
      });
    }
   }}, [isAuthenticated, firstRender]);
    
   useEffect(() => {
    console.log('User:', user);
    console.log('Preferences:', preferences);
  }, [user, preferences]);
  


   if (loading) {
    return <div>Loading...</div>;
   }
   
       return (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar 
  alt="User" 
  src={"https://i.ibb.co/6BM48Gb/profile-picture.jpg"} 
  sx={{ 
    width: 150, 
    height: 150, 
    bgcolor: 'grey.300' 
  }}
/>
            </Box>
            <Typography variant="h5" component="h2">
              {user.name} {user.last_name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Professional Climber
            </Typography>
            <Divider />
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Bio
        </Typography>
        {preferences.bio ? preferences.bio : 'Add a bio so people can get to know you better!'}
            <Typography variant="body2" component="p">
            {preferences.climbing_grades_boulder}{preferences.climbing_grades_climbing}
            </Typography>
            <Divider />
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
        General
        </Typography>
            <Typography variant="body" component="p">
             <span className="font-bold "> Preferred Location:  </span> {preferences.location} 📌
            </Typography>
            <Typography variant="body" component="p">
            <span className="font-bold  ">  Age:  </span>{userAge} 🎂
            </Typography>
             <Typography variant="body" component="p" sx={{mb: 2 }}>
             <span className="font-bold  ">  Gender:  </span>{preferences.gender} ⚥
            </Typography>
            <Divider />
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Climbing Style
        </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
  {preferences.climbing_style.map((style, index) => (
    <ClimbingStyleCardProfile key={index} climbingStyle={style} />
  ))}
</Box>
<Divider />
<Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Type of climber: 
        </Typography>
              <Typography variant="body2" component="p">
              <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
              <Chip label={preferences.type_of_climber} />
              </Box>
              </Typography> 
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Climbing Equipment: 
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
  {preferences.climbing_equipment.map((equipment, index) => (
    <Chip key={index} label={equipment} />
  ))}
</Box>
<Divider sx={{ p: 2, mb: 2 }} />
<Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Prefered Belay Device
        </Typography>
        <div className="flex justify-center">
              <Chip /* icon={<BelayIcon />} */ label={preferences.preferred_belayer_device} />
              </div>
            </Paper>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Others: 
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Level - Climbing Grades:  </span> {preferences.climbing_grades_boulder}{preferences.climbing_grades_climbing}
    {preferences.climbing_grades_boulder ? preferences.climbing_grades_boulder: 'No information yet. Where do you love to climb? '}
    {preferences.climbing_grades_boulder ? preferences.climbing_grades_boulder: 'No information yet. Where do you love to climb? '}
    🤯 📈 </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Favorite Climbing destinations:  </span> {
 (preferences.climbing_grades_boulder || preferences.climbing_grades_climbing) 
   ? `${preferences.climbing_grades_boulder}${preferences.climbing_grades_climbing}` 
   : 'There is no information about which grades you climb. Start adding one!'
}🏔️</Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Route Preferences:  </span>  {preferences.route_preferences ? preferences.route_preferences: 'No information yet. Add which routes you enjoy the most! '}
    🧗</Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Climbing philosophy:   </span>  {preferences.climbing_philosophy ? preferences.climbing_philosophy: 'No information yet. Add information about your Climbing Philosphy '}
    🤔💭 </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
  <span className="font-bold"> Route Whislist:  </span>  {preferences.route_whis_list ? preferences.route_whis_list : 'No information yet. Add some routes to your wishlist! '}
  ✍️✨ </Typography>
</Paper>

            <Box display="flex" justifyContent="flex-end" >
     <Button 
       component={Link} 
       to="/edit-profile"
       variant="contained" 
       className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
       >
       Edit Profile
     </Button>
   </Box>
          </CardContent>
        </Card>
      );
     };
     
     export default UserProfileCard;
     