import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// THIS IS A HARDCODED ELEMTN FOR THE DASHBOARD TO BE SHOWN; WILL CHANGE

function MyMarkedEvents({ events }) {
  return (
    <Box>
      <Paper>
        <Box m="20px">
          <Typography variant="h6" className="font-bold text-green-900">My Marked Events</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.event}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(event)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" >
          <Box m="10px">
            <Button
              component={Link}
              to="/add-event"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
            >
              Add new
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  function handleDelete(event) {
    // handle deletion of the event
  }
}

export default MyMarkedEvents;
