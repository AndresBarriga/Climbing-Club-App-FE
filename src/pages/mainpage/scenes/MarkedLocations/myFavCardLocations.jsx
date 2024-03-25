import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useEffect, useState } from "react";
import CardLocations from "./cardLocations";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



function MyFavCardLocations() {

  const [routeInfo, setRouteInfo] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();


  async function handleNavigate(route) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations/area-details/${route.area}`);
    const areaDetails = await response.json();
    navigate(`/climbing-locations/${areaDetails.country}/${areaDetails.region}/${route.area}/${route.name}`);
  }

  function handleDelete(event, route) {
    event.stopPropagation();
    setSelectedRoute(route);
    setShowModal(true);
  }

  const CustomArrowPrev = ({ onClick }) => (
    <button
       onClick={onClick}
       style={{
         position: 'absolute',
         top: '50%',
         left: '10px',
         background: 'none',
         border: 'none',
         color: 'gray',
         fontSize: '3em',
         cursor: 'pointer',
         transform: 'translateY(-50%)',
         zIndex: 1,
       }}
    >
       &#10094;
    </button>
   );
   
   const CustomArrowNext = ({ onClick }) => (
    <button
       onClick={onClick}
       style={{
         position: 'absolute',
         top: '50%',
         right: '10px',
         background: 'none',
         border: 'none',
         color: 'gray',
         fontSize: '3em',
         cursor: 'pointer',
         transform: 'translateY(-50%)',
         zIndex: 1,
       }}
    >
       &#10095;
    </button>
   );

  useEffect(() => {
    const fetchAllRouteInfo = async () => {
      // Fetch the favorite route IDs
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites_get`, {
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites_get/route/${routeId}`, {
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites`, {
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
        <Carousel
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
      hasPrev && <CustomArrowPrev onClick={onClickHandler} />
    }
    renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && <CustomArrowNext onClick={onClickHandler} />
    }
          showThumbs={true}
          showArrows={true}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          emulateTouch={true}s
          swipeable={true}
          dynamicHeight={false}
          centerMode={true}
          centerSlidePercentage={20}
          slidesToShow={5}
          slidesToScroll={1}
        >
          {routeInfo.map((route, index) => (
            <div key={index}>
              <CardLocations
                route={route}
                handleNavigate={handleNavigate}
                handleDelete={handleDelete}
                smallerCard={true} 
              />
            </div>
          ))}
        </Carousel>
        <Box
      display="flex"
      justifyContent="flex-end"
      position="relative"
      bottom="15px"
      right="20px"
      zIndex={1000} // Ensure the button is above other content
    >
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

export default MyFavCardLocations;
