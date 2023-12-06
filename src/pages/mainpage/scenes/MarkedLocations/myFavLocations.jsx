import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useEffect, useState } from "react";
import PublicIcon from '@mui/icons-material/Public';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



function MyFavLocations() {

  const [routeInfo, setRouteInfo] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
const [selectedRoute, setSelectedRoute] = useState(null);
const navigate = useNavigate();

function handleNavigate(route){
  navigate(`/route/${route.id}`)
}

function handleDelete(event, route) {
  event.stopPropagation();
  setSelectedRoute(route);
  setShowModal(true);
}

  useEffect(() => {
    const fetchAllRouteInfo = async () => {
      // Fetch the favorite route IDs
      const response = await fetch('http://localhost:3001/user_favourites_get', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch favorite route IDs');
        return;
      }

      const favouriteIds = await response.json();

      // For each favorite route ID, fetch the corresponding route information
      const routeInfoArray = await Promise.all(favouriteIds.map(async (routeId) => {
        const response = await fetch(`http://localhost:3001/user_favourites_get/route/${routeId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          return await response.json();
        } else {
          console.error('Failed to fetch route information');
          return null;
        }
      }));

      setRouteInfo(routeInfoArray);
    };

    fetchAllRouteInfo();
  }, []);


  function handleConfirmDelete() {
    fetch(`http://localhost:3001/user_favourites`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ route_id: selectedRoute.id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received from server:', data);
      // Remove the deleted route from the routeInfo state variable
      setRouteInfo(routeInfo.filter(r => r.id !== selectedRoute.id));
      // Close the modal
      setShowModal(false);
    })
    .catch(err => {
      console.error("Error:", err);
    });
  }

  return (
    <Box>
      <Paper>
        <Box m="20px">
        {showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Are you sure you want to remove this location from your favourites?</h2>
      <div className="my-6"></div>
      <Box display="flex" justifyContent="space-between" width="100%" >
      <Button
        variant="contained"
        className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
        onClick={() => setShowModal(false)}
      >
        Back
      </Button>
      <Button
        variant="contained"
        className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
        onClick={handleConfirmDelete}
      >
        DELETE
      </Button>
      
      </Box>
    </div>
  </div>
)}
          <Typography variant="h6" className="font-bold text-green-900">My Favourite Climbing Places 💚 🌐 </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Place</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Links</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(showAll ? routeInfo : routeInfo.slice(0, 4)).map((route, index) => (
                <TableRow key={index}>
                 <TableCell onClick={() => handleNavigate(route)}>{route.name}</TableCell>
<TableCell onClick={() => handleNavigate(route)}>{route.area}</TableCell>
<TableCell onClick={() => handleNavigate(route)}>{route.route_style}</TableCell>
                  <TableCell>
                  <Box display="flex">
                      <IconButton onClick={() => window.open(route.link_site, "_blank")}>
                        <PublicIcon />
                      </IconButton>
                      <IconButton onClick={() => window.open(route.link_maps, "_blank")}>
                        <DirectionsIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                  <IconButton onClick={(event) => handleDelete(event, route)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" width="100%" padding={2} >
         
            <Button
              startIcon={showAll ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              onClick={() => setShowAll(!showAll)}
              disabled={routeInfo.length <= 5}
              style={{ color: routeInfo.length > 5 ? 'black' : 'grey' }}
            >
              {showAll ? 'Click to see less' : 'Click to display all'}
            </Button>
            <Button
              component={Link}
              to="/climbing-locations/Germany"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
            >
              Add new
            </Button>
         
        </Box>
      </Paper>
    </Box>



  );

}

export default MyFavLocations;
