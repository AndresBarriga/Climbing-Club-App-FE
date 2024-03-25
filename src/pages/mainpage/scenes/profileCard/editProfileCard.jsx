import { Tooltip, RadioGroup, Chip, FormControlLabel, Radio, FormControl, FormGroup, Checkbox, Card, CardContent, Box, Button, Avatar, TextField, Typography, Paper, Select, MenuItem, Divider } from "@mui/material";
import { useState, useEffect, useRef } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { useCheckAuthentication, loginMessage } from "../../../Website/Auth/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';



const EditProfileCard = () => {
  const [user, setUser] = useState({});
  const [preferences, setPreferences] = useState({});
  const [address, setAddress] = useState(preferences.location || '');
  const [firstRender, setFirstRender] = useState(true)
  const [loading, setLoading] = useState(true);
  const climbingStyles = ['Climb Indoors', 'Boulder Indoors', 'Sports Climbing', 'Traditional Climbing', 'Deep water solo', 'Boulder outdoors'];
  const climberTypes = ['Quiet Enjoyer', 'Occasional Pusher of Limits', 'Always Pushing Limits'];
  const climbingEquipment = [
    ["Harness", "Belay Device", "Carabiners", "Safety Line"],
    ["Quickdraws", "Helmets", "Rope", "Slings"],
    ["Webbing", "Cams", "Nuts", "Crash pad"]
  ];
  const belayerDevices = ['Assisted-Braking Belay Devices', 'Tubular belay Devices', 'Guide Plate Belay Devices', 'Figure 8 Belay Device'];
  const climbingPhilosophies = [
    { philosophy: 'Conservationist Climber', explanation: 'Believes in Leave No Trace principles. Advocates for sustainable climbing practices.' },
    { philosophy: 'Adventure Seeker', explanation: 'Enjoys exploring new and remote climbing locations. Thrives on the challenge of unknown routes.' },
    { philosophy: 'Community Builder', explanation: 'Values the climbing community and actively contributes. Organizes or participates in climbing events and meetups.' },
    { philosophy: 'Mindful Climber', explanation: 'Practices mindfulness and mental focus during climbs. Values the meditative aspects of climbing.' },
    { philosophy: 'Ethical Climber', explanation: 'Adheres to a strong code of ethics in climbing. Respects access agreements and local regulations.' }
  ];
  const routePreferences = [
    { preference: 'Overhang Specialist', explanation: 'Enjoys and excels in climbing routes with significant overhangs. Thrives on powerful and dynamic movements.' },
    { preference: 'Balance Guru', explanation: 'Prefers routes that demand balance and precision. Enjoys technical footwork and delicate maneuvers.' },
    { preference: 'Slab Master', explanation: 'Excels in climbing slabs with low-angle rock. Values careful weight distribution and friction techniques.' },
    { preference: 'Crux Crusher', explanation: 'Enjoys challenging routes with distinct crux sections. Thrives on problem-solving and mastering difficult sequences.' },
    { preference: 'Endurance Junkie', explanation: 'Prefers longer routes that test endurance. Enjoys sustained climbing with minimal rests.' },
    { preference: 'Dynamic Climber', explanation: 'Excels in routes that require dynamic movements. Enjoys jumps, dynamic reaches, and coordination challenges.' },
    { preference: 'Crack Connoisseur', explanation: 'Enjoys climbing routes featuring cracks of various sizes. Excels in traditional climbing on crack-dominated faces.' },
    { preference: 'Technical Face Climber', explanation: 'Prefers routes that demand technical face climbing skills. Enjoys intricate movements on small holds.' },
    { preference: 'Mantle Master', explanation: 'Excels in routes with mantle moves. Enjoys the challenge of ascending features using mantle techniques.' },
    { preference: 'Slopey Sensation', explanation: 'Enjoys routes with sloping holds. Values the challenge of maintaining grip on less positive features.' }
  ];

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loginMessage } = useCheckAuthentication();

  const handleSelect = (location) => {
    setAddress(location);
    // Update the location in the preferences
    setPreferences({ ...preferences, location: location });
  };

  const handleClimberTypeChange = (type) => {
    setPreferences({ ...preferences, type_of_climber: type });
  };

  const handleEquipmentChange = (item) => {
    let newEquipment = [...preferences.climbing_equipment];

    if (newEquipment.includes(item)) {
      newEquipment = newEquipment.filter((i) => i !== item);
    } else {
      newEquipment.push(item);
    }

    setPreferences({ ...preferences, climbing_equipment: newEquipment });
  };
  const handleBelayerDeviceChange = (device) => {
    setPreferences({ ...preferences, preferred_belayer_device: device });
  };

  const handleClimbingStyleChange = (style, checked) => {
    let newClimbingStyle = [...preferences.climbing_style];

    if (checked) {
      newClimbingStyle.push(style);
    } else {
      newClimbingStyle = newClimbingStyle.filter((s) => s !== style);
    }

    setPreferences({ ...preferences, climbing_style: newClimbingStyle });
  };

  const handleClimbingPhilosophyChange = (event) => {
    setPreferences({ ...preferences, climbing_philosophy: event.target.value });
  };




  useEffect(() => {
    if (firstRender) {
      if (isAuthenticated) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/show-profile`, {
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
            console.log(data.user)
            setPreferences(data.preferences);
            setFirstRender(false) 
            setLoading(false)

          })
          .catch(err => {
            console.error("Error:", err);
          });
      }
    }

  }, [isAuthenticated, firstRender]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form...');
    let favorite_climbing_destinations;
    if (typeof preferences.favorite_climbing_destinations === 'string') {
      favorite_climbing_destinations = preferences.favorite_climbing_destinations.split(',').map(item => item.trim());
    } else if (Array.isArray(preferences.favorite_climbing_destinations)) {
      favorite_climbing_destinations = preferences.favorite_climbing_destinations;
    } else {
      favorite_climbing_destinations = [];
    }


    const updatedPreferences = {
      ...preferences,
      favorite_climbing_destinations,
      route_preferences: preferences.route_preferences,
      climbing_philosophy: preferences.climbing_philosophy,
    };
    console.log(JSON.stringify(updatedPreferences))
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/edit-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedPreferences)
    });
    console.log('Response:', response);
    if (response.ok) {
      setSuccessMessage("Your preferences have been updated!");
      setTimeout(() => setSuccessMessage(''), 2000);
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } else {
      alert('There was an error submitting the form');
    }
  };


  const fileInputRef = useRef();

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);

      // Get the public_id of the current profile picture from the user state
      const currentProfilePictureId = user.profile_picture.split('/').pop().split('.')[0];
      uploadData.append('currentProfilePictureId', currentProfilePictureId);

      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/edit-profile/profile-picture`, {
          method: 'PUT',
          body: uploadData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!res.ok) {
          throw new Error('Error uploading image');
        }

        const data = await res.json();
        setUser(prevUser => ({ ...prevUser, profile_picture: data.profile_picture }));

        // Reload the page
        window.location.reload();

      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    <Card sx={{ width: '100%', boxShadow: 20 }}>
      {successMessage && <div className="modal">
        <div className="modal-content">
          <h2>Congratulations, {user.name} {user.last_name} !</h2>
          <p>The changes in your profile have been correctly made! </p>
          <div className="my-6"></div>

        </div>
      </div>}
      <CardContent>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', alignSelf: 'flex-start', marginLeft: '15px' }}>
            <Button
              type="submit"
              className="primaryButton primaryButton:hover primaryButton:focus primaryButton:active"
            >
              <ArrowBackIcon style={{ fontSize: 30, cursor: 'pointer' }} />
              Back
            </Button>
          </Link>
          <Box sx={{ position: 'relative', width: 150, height: 150, margin: "10px" }}>
            <Avatar
              alt="User"
              src={user.profile_picture}
              sx={{
                width: 150,
                height: 150,
                bgcolor: 'grey.300',
              }}
            />
            <IconButton
              aria-label="edit"
              onClick={handleEditButtonClick}
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                border: 1,
                '&:hover': {
                  backgroundColor: '#007f3c !important',
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          </Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit} >
          <Divider />
          <Typography variant="h3" component="h2">
            {user.name} {user.last_name}
          </Typography>
          <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Your Bio
          </Typography>

          <TextField
            label="Bio"
            value={preferences.bio || ''}
            onChange={(event) => setPreferences({ ...preferences, bio: event.target.value })}
            style={{ margin: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Add a bio so people can get to know you better!"
            sx={{ width: '80%' }}
          />

          <Divider />
          <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            General
          </Typography>
          <Divider />
          <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Select Current Location
          </Typography>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{ types: ['(cities)'] }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input className="ml-4 custom-paper2 border-2 border-green-900 rounded"{...getInputProps({
                  placeholder: preferences.location,
                  onBlur: () => {
                    if (address) {
                      handleSelect(address);
                    }
                  }
                })} />

                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion, key) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style, key: suggestion.placeId })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <Box sx={{ margin: "10px", textAlign: "center" }}>
            <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
              Select your gender
            </Typography>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={preferences.gender || ''}
              onChange={(event) => setPreferences({ ...preferences, gender: event.target.value })}
              style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </Box>
          <Divider />

          <Typography variant="h6" component="h3" style={{ margin: "5px" }} className="font-bold text-green-900">
            Climbing Style
          </Typography>
          <FormControl component="fieldset" style={{ margin: '5px' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {climbingStyles.map((style, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={preferences.climbing_style.includes(style)}
                      onChange={(event) => handleClimbingStyleChange(style, event.target.checked)}
                    />
                  }
                  label={style}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Divider />
          <Typography variant="h6" component="h3" style={{ margin: "5px" }} className="font-bold text-green-900 ">
            Type of climber:
          </Typography>
          {climberTypes.map((type) => (
            <Chip
              label={type}
              clickable
              color={preferences.type_of_climber === type ? "primary" : "default"}
              onClick={() => handleClimberTypeChange(type)}
              sx={{ margin: '20px' }}
            />
          ))}

          <Divider></Divider>
          <Typography variant="h6" component="h3" style={{ margin: "5px" }} className="font-bold text-green-900 ">
            Climbing Equipment:
          </Typography>
          {climbingEquipment.map((rowItems, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', listStyle: 'none', padding: 0, marginTop: 2 }}>
              {rowItems.map(item => (
                <Chip
                  key={item}
                  label={item}
                  clickable
                  color={preferences.climbing_equipment.includes(item) ? "primary" : "default"}
                  onClick={() => handleEquipmentChange(item)}
                />
              ))}
            </Box>
          ))}
          <Typography variant="h6" style={{ margin: "5px" }} component="h3" className="font-bold text-green-900 ">
            Prefered Belay Device
          </Typography>

          <Divider />
          {belayerDevices.map((device) => (
            <Chip
              label={device}
              clickable
              color={preferences.preferred_belayer_device === device ? "primary" : "default"}
              onClick={() => handleBelayerDeviceChange(device)}
              sx={{ margin: '20px' }}
            />
          ))}


          <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
            Others:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="body" component="h3" sx={{ mt: 2 }}>
              <span className="font-bold"> Level - Climbing Grades:  </span>  </Typography>
            <TextField
              label="Climbing Grades Boulder"
              defaultValue={preferences.climbing_grades_boulder || ''}
              onChange={(event) => setPreferences({ ...preferences, climbing_grades_boulder: event.target.value })}
              placeholder="V6 / 7a"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: '20px' }}
            />
            <TextField
              label="Climbing Grades Climbing"
              defaultValue={preferences.climbing_grades_climbing || ''}
              onChange={(event) => setPreferences({ ...preferences, climbing_grades_climbing: event.target.value })}
              placeholder="5.11d / 7a"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: '20px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* First row */}
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
                    <span className="font-bold">Climbing Philosophy:</span> 🤔💭
                  </Typography>
                  <Select
                    value={preferences.climbing_philosophy || ''}
                    onChange={handleClimbingPhilosophyChange}
                    sx={{ width: '100%' }}
                  >
                    {climbingPhilosophies.map(({ philosophy, explanation }) => (
                      <MenuItem value={philosophy}>
                        <Tooltip title={explanation}>
                          <span>{philosophy}</span>
                        </Tooltip>
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
                    <span className="font-bold">Route Preferences:</span> 🧗
                  </Typography>
                  <Select
                    value={preferences.route_preferences || ''}
                    onChange={(event) => setPreferences({ ...preferences, route_preferences: event.target.value })}
                    sx={{ width: '100%' }}
                  >
                    {routePreferences.map(({ preference, explanation }) => (
                      <MenuItem value={preference}>
                        <Tooltip title={explanation}>
                          <span>{preference}</span>
                        </Tooltip>
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Second row */}
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
                    <span className="font-bold">Favorite Climbing Destinations:</span> 🏔️
                  </Typography>
                  <TextField
                    label="Favorite Climbing Destinations"
                    defaultValue={preferences.favorite_climbing_destinations || ''}
                    onChange={(event) => setPreferences({ ...preferences, favorite_climbing_destinations: event.target.value })}
                    sx={{ width: '100%' }}
                    placeholder="Start sharing your favoure climbing places!"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="body" component="h3" sx={{ mt: 2 }}>
                    <span className="font-bold">Route Wishlist:</span> ✍️✨
                  </Typography>
                  <TextField
                    label="Route Wishlist"
                    defaultValue={preferences.route_whish_list || ''}
                    onChange={(event) => setPreferences({ ...preferences, route_whish_list: event.target.value })}
                    sx={{ width: '100%' }}
                    placeholder="This project you are going to send!"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
            </div>
          </Paper>

          <Button type="submit" className="primaryButton primaryButton:hover primaryButton:focus primaryButton:active ">SAVE DETAILS</Button>

        </Box>

      </CardContent>
    </Card>
  );
};

export default EditProfileCard;