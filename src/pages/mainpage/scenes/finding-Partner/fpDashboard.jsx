import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//THIS IS THE ELEMENT RENDERED ON THE DASHBOARD AND RELATED TO FINDPARTNERS FUNCTIONALITY; NOW IS HARDCODED AND NEEDS TO CHANGE
function fpDashboard({ inquiries }) {
  return (
    <Box>
      <Paper>
        <Box m="20px">
          <Typography variant="h6" className="font-bold text-green-900">My Active Requests</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Place</TableCell>
                <TableCell>Other Comments</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiries.map((inquiry, index) => (
                <TableRow key={index}>
                  <TableCell>{inquiry.date}</TableCell>
                  <TableCell>{inquiry.place}</TableCell>
                  <TableCell>{inquiry.comments}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(inquiry)}>
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
  
  
    function handleDelete(inquiry) {
      // handle deletion of the inquiry
    }
  }
  
  export default fpDashboard;