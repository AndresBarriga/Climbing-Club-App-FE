import { Card, CardContent, Divider, Paper, Typography, Avatar, Box, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ClimbingStyleCardProfile from "./climbingStyleCardProfile";



const UserProfileCard = ( ) => {
    const user = {
        avatar: 'https://i.ibb.co/6BM48Gb/profile-picture.jpg', // Placeholder image URL
        name: 'Andrés Barriga',
        subtitle: 'Passionate Climber',
        bio: 'User Bio',
        location: {
          city: 'City Name',
          country: 'Country Name',
        },
        age: 'Age',
        gender: 'Gender',
        climbingStyle: ["Climb Indoors","Boulder outdoors", "Traditional Climbing", "Sports Climbing"],
        preferredBelay: 'GriGri',
        typeOfClimber: 'Type of Climber',
        climberEquipment: ['Equipment 1', 'Equipment 2', 'Equipment 3'],
        climbingGrades: 'Climbing Grades',
        favoriteDestinations: 'Favorite Destinations',
        routePreferences: 'Route Preferences',
        climbingPhilosophy: 'Climbing Philosophy',
        routeWhislist: 'Route Whislist',
       };
       return (
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar 
  alt="User" 
  src={user.avatar} 
  sx={{ 
    width: 150, 
    height: 150, 
    bgcolor: 'grey.300' 
  }}
/>
            </Box>
            <Typography variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user.subtitle}
            </Typography>
            <Divider />
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Bio
        </Typography>
            <Typography variant="body2" component="p">
              {user.bio}
            </Typography>
            <Divider />
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
        General
        </Typography>
            <Typography variant="body" component="p">
             <span className="font-bold "> Preferred Location: 📌 </span> {user.location.city}, {user.location.country}
            </Typography>
            <Typography variant="body" component="p">
            <span className="font-bold  ">  Age: 🎂 </span>{user.age}
            </Typography>
             <Typography variant="body" component="p" sx={{mb: 2 }}>
             <span className="font-bold  ">  Gender: ⚥ </span>{user.gender}
            </Typography>
            <Divider />
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Climbing Style
        </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
  {user.climbingStyle.map((style, index) => (
    <ClimbingStyleCardProfile key={index} climbingStyle={style} />
  ))}
</Box>
<Divider />
<Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Type of climber: 
        </Typography>
              <Typography variant="body2" component="p">
              <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
              <Chip /* icon={<BelayIcon />} */ label={user.typeOfClimber} />
              </Box>
              </Typography> 
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Climbing Equipment: 
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
  {user.climberEquipment.map((equipment, index) => (
    <Chip key={index} label={equipment} />
  ))}
</Box>
<Divider sx={{ p: 2, mb: 2 }} />
<Typography variant="h6" component="h3" className="font-bold text-green-900 ">
          Prefered Belay Device
        </Typography>
        <div className="flex justify-center">
              <Chip /* icon={<BelayIcon />} */ label={user.preferredBelay} />
              </div>
            </Paper>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Others: 
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Level - Climbing Grades:  🤯 📈</span> {user.climbingGrades}
  </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Favorite Climbing destinations: 🏔️ </span> {user.favoriteDestinations}
  </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Route Preferences: 🧗 </span> {user.routePreferences}
  </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold"> Climbing philosophy: 🤔💭  </span>  {user.climbingPhilosophy}
  </Typography>
  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
    <span className="font-bold">  Route Whislist: ✍️✨ </span>   {user.routeWhislist}
  </Typography>
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
     