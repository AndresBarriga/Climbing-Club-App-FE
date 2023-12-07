import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import {useParams , Link, useNavigate} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg";
import Tooltip from '@mui/material/Tooltip';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsIcon from '@mui/icons-material/Directions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';


const RoutesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [route, setRoutes] = useState([{}])
  const [firstRender, setFirstRender] = useState(true)
  const [loading, setLoading] = useState(true)
  const { country, region, area } = useParams();
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate()


  const handleFavorite = (route) => {
    fetch(`http://localhost:3001/user_favourites`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: route.id
      })
    })
      .then(res => res.json())
      .then(data => {
        // Update the state based on the response
        setRoutes(prevRoutes => prevRoutes.map((r) => r.id === route.id ? { ...r, isFavorite: !r.isFavorite } : r));
      })
      .catch(err => {
        console.error("Error:", err);
      });
  };
  useEffect(() => {
    if (firstRender){
        console.log("Fetching is happening")
        fetch(`http://localhost:3001/climbing-locations/${country}/${region}/${area}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setRoutes(data)
            setFirstRender(false)
            setLoading(false)
          }) 
          .catch(err => {
            console.error("Error:", err);
            setLoading(false)
          });   
        }
  }, [region, country, area, firstRender]);

  useEffect(() => {
    if (firstRender){
    fetch(`http://localhost:3001/user_favourites_get`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Favorites:" , data)
        setFavourites(data);
        setFirstRender(false)
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }
 }, [firstRender]);

  
  useEffect(() => {
    // Update the routes with the isFavorite property
    setRoutes(prevRoutes => prevRoutes.map(route => ({
      ...route,
      isFavorite: favourites.includes(route.id)
    })));
  }, [favourites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const routeStyleTitles ={
    "Gym": "Climbing / Boulder Gyms",
    "Wall": "Climbing",
    "Boulder": "Boulder",
    "Urban Boulder": "Boulder"
  };
  const routeStyles = ["Climbing / Boulder Gyms", "Climbing", "Boulder"];
  const filteredRoutes = routeStyles.map(title => {
    return {
      title,
      routes: route.filter(r => routeStyleTitles[r.route_style.trim()] === title)
    };
  });

  return (
    <Box>
    <div style={{ width: '95%', height: '300px', overflow: 'hidden', margin: 20, borderRadius: '10px', position: 'relative' }}>
  <img
    src={europe}
    alt="description of image"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%',
      borderRadius: 'inherit', 
    }}
  />
</div>

      <TextField
        label="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        style={{ width: '80%', marginRight: '10px' }}
        InputProps={{
          endAdornment: (
            <SearchIcon />
          ),
        }}
      />
      <div>
      
    </div>
      <Paper>
      <Button
  onClick={() => navigate(-1)}
  style={{
    margin: '10px', 
    border: '2px solid green',
    borderRadius: '5px', 
    padding: '5px 10px'
  }}
>
  <ArrowBackIcon style={{ fontSize: 30, cursor: 'pointer' }} />
  Back
</Button>
        <Box m="20px">
        <Link to={`/climbing-locations/`} style={{ textDecoration: 'underline',  color: "blue" , cursor: 'pointer' }}>All climbing Locations /</Link>
        <span>&nbsp;&nbsp;</span>
          <Link to={`/climbing-locations/${country}`} style={{ textDecoration: 'underline',  color: "blue" , cursor: 'pointer' }}>{country}/</Link>
          <span>&nbsp;&nbsp;</span>
      <Link to={`/climbing-locations/${country}/${region}`} style={{ textDecoration: 'underline',  color: "blue" , cursor: 'pointer' }}>{region}/</Link>
      <span>&nbsp;&nbsp;</span>
      <Link to={`/climbing-locations/${country}/${region}/${area}`} style={{ textDecoration: 'underline',  color: "blue" , cursor: 'pointer' }}>{area}/ </Link>

     
       
          <Typography variant="h6" className="font-bold text-green-900" style={{paddingTop: 14 }}>Routes available in {area}</Typography>
        </Box>
        <TableContainer>
          <Table style={{ width: '100%', margin: 0 }}>
            
            <TableBody>
              
            {filteredRoutes.map((filteredRoute, index) => (
        <Accordion key={index} >
           <Tooltip title={`Click to open all ${filteredRoute.title} routes`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="text-green-800">{filteredRoute.title}</Typography>
          </AccordionSummary>
          </Tooltip>
          <AccordionDetails>
            <TableContainer>
              <Table style={{ width: '100%', margin: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Country Name</TableCell>
                    <TableCell>Style</TableCell>
                    {filteredRoute.title !== "Climbing / Boulder Gyms" && <TableCell>Amount of Routes</TableCell>}
                    <TableCell>Avg. height</TableCell>
                    <TableCell>Helpful Links</TableCell>
                    <TableCell>&nbsp;&nbsp;Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoute.routes.map((route, index) => (
                     
                    <TableRow
                      key={index}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#9EC69B',
                          cursor: 'pointer',
                        },
                      }}
                    >
<TableCell>
  <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
    {route.id}
  </Link>
</TableCell>
<TableCell>
  <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
    {route.name}
  </Link>
</TableCell>
<TableCell>
  <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
    {route.style}
  </Link>
</TableCell>
{filteredRoute.title !== "Climbing / Boulder Gyms" && <TableCell>{route.number_routes}</TableCell>}
<TableCell>
  <Link to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
    {route.height_avg}
  </Link>
</TableCell>
                      <TableCell style={{ width: '150px' }}> 
                        <Tooltip title="Open website">
                          <IconButton onClick={() => window.open(route.link_site, "_blank")}>
                            <PublicIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Open maps">
                          <IconButton onClick={() => window.open(route.link_maps, "_blank")}>
                            <DirectionsIcon />
                          </IconButton>
                        </Tooltip>
                        
                      </TableCell>
                      <TableCell style={{ width: '150px' }}>
  <Box display="flex">
    <Tooltip title="Marking as favourite will notify you about request to climb, events happening & more">
      <IconButton onClick={() => handleFavorite(route)}>
        {route.isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
    <Tooltip title="Find here people to climb with">
      <IconButton>
        <Diversity1Icon/>
      </IconButton>
    </Tooltip>
    <Tooltip title="Open route details">
      <IconButton component={Link} to={`/climbing-locations/${country}/${region}/${area}/${route.name}`}>
        <LaunchIcon />
      </IconButton>
    </Tooltip>
  </Box>
</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default RoutesList;