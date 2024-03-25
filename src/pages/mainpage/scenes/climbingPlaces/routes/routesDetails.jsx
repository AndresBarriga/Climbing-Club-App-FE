import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Avatar, Tooltip, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Rating } from '@mui/material';
import boulder from "../../../../../styles/images/routeDetails:boulder.jpeg"
import gym from "../../../../../styles/images/routeDetails:Gym.jpeg"
import mountain from "../../../../../styles/images/routeDetails:mountain.jpeg"
import IconButton from '@mui/material/IconButton';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsIcon from '@mui/icons-material/Directions';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FindPartnerWizard } from '../../finding-Partner/wizardIndex';
import ActiveRequestonRoute from './activeRequestOnRoute';

const RouteDetails = () => {
  const { country, region, area, routeName } = useParams();
  const [routeDetails, setRouteDetails] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const [requests, setRequests] = useState([]);

  const handleDetailsClick = () => {
    setShowActiveRequestIndex(true);
  };
  const [showActiveRequestIndex, setShowActiveRequestIndex] = useState(false);
  console.log("request", requests)

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);
  const maxReviewLength = 300;

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  // Will format time stamp to "X time ago" instead of current timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const reviewDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - reviewDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears > 1 ? 'years' : 'year'} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths > 1 ? 'months' : 'month'} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours > 1 ? 'hours' : 'hour'} ago`;
    } else {
      return `${diffInMinutes} ${diffInMinutes > 1 ? 'minutes' : 'minute'} ago`;
    }
  };



  useEffect(() => {
    // Fetch route details from your API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/climbing-locations/${country}/${region}/${area}/${routeName}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setRouteDetails(data);
        console.log(data)
        console.log(routeDetails)
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, [country, region, area, routeName]);

  useEffect(() => {
    if (!routeDetails) {
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getAllRequests/forSpecificPlace?routeName=${encodeURIComponent(routeName)}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setRequests(data);
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, [routeDetails, routeName]);


  useEffect(() => {
    if (routeDetails) {

      fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${routeDetails.id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setReviews(data);
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [routeDetails]);

  useEffect(() => {
    if (firstRender) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites_get`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setFavourites(data);
          setFirstRender(false);
        })
        .catch(err => {
          console.error("Error:", err);
        });
    }
  }, [firstRender]);

  const handleFavorite = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user_favourites`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: routeDetails.id
      })
    })
      .then(res => res.json())
      .then(data => {
        // Update the state based on the response
        const isFavorite = data.message === "Favourite added successfully";
        setRouteDetails(prevRouteDetails => ({ ...prevRouteDetails, isFavorite }));

        // If the route was added to favourites
        if (isFavorite) {
          setFavourites(prevFavourites => [...prevFavourites, routeDetails.id]);
        }
        // If the route was removed from favourites
        else {
          setFavourites(prevFavourites => prevFavourites.filter(id => id !== routeDetails.id));
        }
      })
      .catch(err => {
        console.error("Error:", err);
      });
  };


  useEffect(() => {
    // Update the routeDetails with the isFavorite property
    if (routeDetails && favourites.includes(routeDetails.id) !== routeDetails.isFavorite) {
      setRouteDetails(prevRouteDetails => ({
        ...prevRouteDetails,
        isFavorite: favourites.includes(prevRouteDetails.id)
      }));
    }
  }, [favourites, routeDetails]);


  const navigate = useNavigate()
  const handleStartRequest = () => {

    // Prepare the initial data for the wizard
    const initialData = {
      country: country,
      region: region,
      area: area,
      route: routeName,
      route_style: routeDetails.route_style
      // You can add more fields here if needed
    };


    // Use navigate to change the route and pass the initial data as state
    navigate('/find-a-buddy', { state: { initialData: initialData } });
  };

  if (!routeDetails) {
    return <div>Loading...</div>;
  }

  const handleReviewSubmit = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route_id: routeDetails.id,
        stars: reviewStars,
        comment: reviewText
      })
    })
      .then(res => res.json())
      .then(data => {
        // Handle the server response here
        handleCloseReviewForm();
      })
      .catch(err => {
        console.error("Error:", err);
      });
    handleCloseReviewForm();

  };





  return (
    <>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Paper sx={{ width: '50%', padding: 2, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }} elevation={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ right: 8, top: 8, left: 8, width: 'calc(100% - 16px)' }}>
            {showActiveRequestIndex && (
              <Tooltip title="Back">
                <IconButton onClick={() => setShowActiveRequestIndex(false)}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            <Box display="flex" justifyContent="flex-end" alignItems="center" marginLeft="auto">
              <Tooltip title="Mark as favourite">
                <IconButton onClick={handleFavorite}>
                  {routeDetails.isFavorite ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Start a request">
                <IconButton onClick={handleStartRequest}>
                  <Diversity1Icon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginY: 2 }} variant="h5" component="h2">
            {routeDetails.name}
          </Typography>
          <Divider style={{ borderBottomWidth: '1px', borderBottomColor: 'black' }} />
          <Avatar
            alt="Route Style"
            src={
              routeDetails.route_style === "Wall" ? mountain :
                routeDetails.route_style === "Gym" ? gym :
                  (routeDetails.route_style === "Boulder" || routeDetails.route_style === "Urban Boulder") ? boulder :
                    null
            }
            sx={{
              width: 150,
              height: 150,
              bgcolor: 'grey.300'
            }}
          />

          {showActiveRequestIndex ? (
            <ActiveRequestonRoute requests={requests} handleStartRequest={handleStartRequest} />
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">
                The location is a <span className="text-green-900 font-semibold ">{routeDetails.route_style}</span>
              </Typography>
              <Box sx={{ width: '70%', my: 2 }}>
                <Divider variant="middle" style={{ borderBottomWidth: '1px', }} />
              </Box>

              {routeDetails.number_routes !== 0 && (
                <Typography variant="body2" color="text.secondary">
                  With over: <span className="text-green-900 font-semibold ">+{routeDetails.number_routes} routes</span>
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                The Average Heigh is <span className="text-green-900 font-semibold ">{routeDetails.height_avg}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Being its predominant style <span className="text-green-900 font-semibold ">"{routeDetails.style}"</span>
              </Typography>
              <Box sx={{ width: '70%' }}>
                <Divider variant="middle" style={{ borderBottomWidth: '1px', }} />
              </Box>
              <Typography variant="body1" className="text-green-900 ">
                <span className="text-green-900 font-semibold ">  Helpful Links:</span>
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>
                  <span className="text-green-900 font-semibold "> Website/ Route Info:</span>
                </Typography>
                <Tooltip title="Open website">
                  <IconButton onClick={() => window.open(routeDetails.link_site, "_blank")}>
                    <PublicIcon />
                  </IconButton>
                </Tooltip>

                <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>
                  <span className="text-green-900 font-semibold ">Google Maps:</span>
                </Typography>
                <Tooltip title="Open maps">
                  <IconButton onClick={() => window.open(routeDetails.link_maps, "_blank")}>
                    <DirectionsIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ width: '100%', my: 2 }}>
                <Divider variant="middle" style={{ borderBottomWidth: '3px', }} />
              </Box>

              <Typography variant="h5">
                <span className="text-green-900 font-semibold ">Find someone to climb here: </span>
              </Typography>

              {requests && requests.length > 0 ? (
                <>
                  <Typography variant="body2" color="text.secondary" style={{ marginRight: '10px' }}>At the moment there are <span className="text-green-900 font-semibold ">{requests.length} active requests </span> to climb here</Typography>

                  <Button variant="contained" color="primary" onClick={handleDetailsClick}>See details</Button>

                </>
              ) : (
                <>
                  <Typography variant="body1" color="text.secondary">
                    There are no active request yet, be the first one adding one.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleStartRequest}>Create one</Button>
                </>
              )}
              <Box sx={{ width: '100%', my: 2 }}>
                <Divider variant="middle" style={{ borderBottomWidth: '3px', }} />
              </Box>
              <Typography variant="h5">
                <span className="text-green-900 font-semibold ">Reviews: </span>
              </Typography>
              <Button variant="contained" color="primary" onClick={handleOpenReviewForm}>
                Write a Review
              </Button>



              {displayedReviews.map((review) => (
                <Box key={review.id} sx={{ width: '100%', padding: 2 }}>
                  <Paper sx={{ width: '90%', padding: 2, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }} elevation={3}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                      <Box display="flex" alignItems="center">
                        <Avatar alt="User" src={review.profile_picture} />
                        <Typography variant="h6" component="h2" sx={{ marginLeft: 2 }}>
                          {review.name} {review.last_name}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <Rating name="read-only" value={review.stars} readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 2 }}>
                          {formatTimestamp(review.timestamp)}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
              {reviews.length === 0 && (
                <Typography variant="body1" color="text.secondary">
                  There are no reviews yet, be the first one adding one.
                </Typography>
              )}
              {reviews.length > 3 && (
                <Button
                  startIcon={showAllReviews ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  disabled={reviews.length <= 3}
                  style={{ color: reviews.length > 3 ? 'black' : 'grey' }}
                >
                  {showAllReviews ? 'Click to see less' : 'Click to display all'}
                </Button>
              )}
            </>
          )
          }
        </Paper>

      </Box>
      <Dialog open={openReviewForm} onClose={handleCloseReviewForm}>
        <DialogTitle>Write a Review for the Place</DialogTitle>
        <DialogContent>
          <Rating
            name="review-stars"
            value={reviewStars}
            onChange={(event, newValue) => {
              setReviewStars(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="review-text"
            label="Review"
            type="text"
            fullWidth
            value={reviewText}
            onChange={handleReviewTextChange}
            inputProps={{
              maxLength: maxReviewLength
            }}
            multiline
            rows={6}
          />
          <Typography variant="caption" align="right" color={reviewText.length > maxReviewLength ? "error" : "initial"}>
            {reviewText.length}/{maxReviewLength}
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReviewSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </>


  );

};

export default RouteDetails;