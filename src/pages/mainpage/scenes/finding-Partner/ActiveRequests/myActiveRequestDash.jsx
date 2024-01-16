import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LaunchIcon from '@mui/icons-material/Launch';




function MyActiveRequestDash() {
  const [requestInfo, setRequestInfo] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getActiveRequest`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Request data:", data)
        setRequestInfo(data);
      } else {
        console.error('Failed to fetch request information');
      }
    };

    fetchRequestInfo();
  }, [])



  function handleNavigate(request) {
    navigate(`/showActiveRequest/${request.uid}`)
  }
  function handleDelete(event, request) {
    event.stopPropagation();
    setSelectedRequest(request);
    setShowModal(true);
  }
  function handleConfirmDelete() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deleteRequest/${selectedRequest.uid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from server:', data);
        // Remove the deleted request from the requestInfo state variable
        setRequestInfo(requestInfo.filter(r => r.uid !== selectedRequest.uid));
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
                <h2>Are you sure you want to delete your active request?</h2>
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
          <Typography variant="h6" className="font-bold text-green-900">My Active Requests 🔄 📋</Typography>

        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Place</TableCell>
                <TableCell>Climbing Style</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestInfo.slice(0, showAll ? requestInfo.length : 4).map((request, index) => {
                // Convert the startDate and endDate to moment objects
                const startDate = moment(request.time_data.startDate);
                const endDate = moment(request.time_data.endDate);

                // Format the startDate and endDate
                const startDateStr = startDate.format('DD/MM/YYYY');
                const startDateStrWithTime = `${startDateStr} ${startDate.hours()}:${startDate.minutes()}`;
                const specificDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(day => request.time_data[day] && request.time_data[day].length > 0);

                let dateDisplay = '';
                if (request.time_data.isCompletelyFlexible) {
                  dateDisplay = 'Flexible';
                } else if (specificDays.length > 0) {
                  dateDisplay = specificDays.slice(0, 3).join(', ') + (specificDays.length > 3 ? '... click for details' : '');
                } else if (startDate.isSame(endDate, 'day')) {
                  dateDisplay = startDateStrWithTime;
                } else if (request.time_data.startDate && request.time_data.endDate) {
                  dateDisplay = `${startDateStr} to ${endDate.format('DD/MM/YYYY')}`;
                }else {
                  dateDisplay = startDateStrWithTime;
              }


                return (
                  <TableRow key={index} onClick={() => handleNavigate(request)} sx={{
                    '&:hover': {
                      backgroundColor: '#9EC69B',
                      cursor: 'pointer',
                    },
                  }}>
                    <TableCell>{dateDisplay}</TableCell>
                    <TableCell>{request.area}</TableCell>

                    <TableCell>{request.climbing_style.join(', ')}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => handleNavigate(request)}>
          <LaunchIcon />
        </IconButton>
                      <IconButton onClick={(event) => handleDelete(event, request)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" width="100%" padding={2} >


          <Button
            startIcon={showAll ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            onClick={() => setShowAll(!showAll)}
            disabled={requestInfo.length <= 4}
            style={{ color: requestInfo.length > 4 ? 'black' : 'grey' }}
          >
            {showAll ? 'Click to see less' : 'Click to display all'}
          </Button>
          <Button
            component={Link}
            to="/add-inquiry"
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

export default MyActiveRequestDash;