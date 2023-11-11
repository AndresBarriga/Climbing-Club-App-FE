import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function MyMarkedLocations({ locations }) {
 

  return (
    <Box>
      <Paper>
        <Box m="20px">
          <Typography variant="h6" className="font-bold text-green-900">My Marked Locations</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Place</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location, index) => (
                <TableRow key={index}>
                  <TableCell>{location.place}</TableCell>
                  <TableCell>{location.location}</TableCell>
                  <TableCell>{location.type}</TableCell>
                  <IconButton onClick={() => handleDelete(location)}>
                      <DeleteIcon />
                    </IconButton>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" >
        <Box m="10px">
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
   </Box>
      </Paper>
    </Box>
    

    
  );
  function handleDelete(location) {
    // handle deletion of the inquiry
  }
}

export default MyMarkedLocations;
