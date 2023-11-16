import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';import { useNavigate, useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg"

const Regions = () => {
const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country } = useParams();

  const handleFavorite = (region) => {
    setRegions(regions.map((r) => r.id === region.id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  useEffect(() => {
    if (firstRender){
    fetch(`http://localhost:3001/climbing-locations/${country}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => res.json())
      .then(data => {
        setRegions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
    }
  }, [country, firstRender]);

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
            <TableCell>Region Name</TableCell>
            <TableCell>Style</TableCell>
            <TableCell>Amount of Routes</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {regions.map((region, index) => (
        <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#9EC69B',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <TableCell>{region.id}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)}>{region.name}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)}>{region.style}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country}/${region.name}`)} >{region.amount_of_routes}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleFavorite(region)}>
                        {region.isFavorite ? <StarIcon /> : <StarBorderIcon />}
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

export default Regions;
