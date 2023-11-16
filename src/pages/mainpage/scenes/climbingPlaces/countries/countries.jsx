import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, redirect } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from "react-router-dom";
import europe from "../../../../../styles/images/europe.jpg"


const CountryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate =useNavigate()
  const [countries, setCountries] = useState([{}])
  const [firstRender, setFirstRender] = useState(true)
  const [loading, setLoading] = useState(true)

  const handleFavorite = (country) => {
    setCountries(countries.map((c) => c.id === country.id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  useEffect(() => {
    if (firstRender){
        console.log("Fetching is happening")
        fetch("http://localhost:3001/climbing-locations", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data[0])
            setCountries(data[0])
            setFirstRender(false)
            setLoading(false)
          }) 
          .catch(err => {
            console.error("Error:", err);
            setLoading(false)
          });   
        }
  }, [ firstRender]);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

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
          <Table style={{ width: '100%', margin: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Country Name</TableCell>
                <TableCell>Style</TableCell>
                <TableCell>Amount of Routes</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {countries.map((country, index) => (
                
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

        {country.id}
    </TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)}>{country.name}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)}>{country.style}</TableCell>
                    <TableCell onClick={() => navigate(`/climbing-locations/${country.name}`)} >{country.amount_of_routes}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleFavorite(country)}>
                        {country.isFavorite ? <StarIcon /> : <StarBorderIcon />}
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

export default CountryList;