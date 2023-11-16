import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';import { useNavigate, useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg"

const Areas = () => {
const [searchTerm, setSearchTerm] = useState('');
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country, region } = useParams();

  const handleFavorite = (area) => {
    setAreas(areas.map((a) => a.id === area.id ? { ...a, isFavorite: !a.isFavorite } : a));
  };

  useEffect(() => {
    if (firstRender){
    fetch(`http://localhost:3001/climbing-locations/${country}/${region}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        setAreas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
    }
  }, [region, country, firstRender]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <Paper>
        <Box m="20px">
          <Typography variant="h6" className="font-bold text-green-900">Countries</Typography>
        </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Area Name</TableCell>
            <TableCell>Style</TableCell>
            <TableCell>Amount of Routes</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {areas.map((area, index) => (
        <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#9EC69B',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <TableCell>{area.id}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region}/${area.name}`)}>{area.name}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region}/${area.name}`)}>{area.style}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region}/${area.name}`)} >{area.amount_of_routes}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleFavorite(area)}>
                        {area.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>

          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Box>
  );
};

export default Areas;
