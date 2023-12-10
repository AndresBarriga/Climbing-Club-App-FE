import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams, Link } from "react-router-dom";
import europe from "../../../../../styles/images/europe.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from '../../../../../components/reusable/searchBar';

const Regions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country } = useParams();

  useEffect(() => {
    if (firstRender) {
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
      <SearchBar
      />
      <Paper><Button
        onClick={() => navigate(-1)}
        style={{
          margin: '10px',
          border: '2px solid green',
          borderRadius: '5px',
          padding: '5px 10px'
        }}
      >
        <ArrowBackIcon style={{ fontSize: 30, cursor: 'pointer' }} />
        Back
      </Button>
        <Box m="20px">
          <Link to={`/climbing-locations/`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>All climbing Locations /</Link>
          <span>&nbsp;&nbsp;</span>
          <Link to={`/climbing-locations/${country}`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>{country}/</Link>
          <span>&nbsp;&nbsp;</span>




          <Typography variant="h6" className="font-bold text-green-900" style={{ paddingTop: 14 }}>Regions available in {country}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Region Name</TableCell>
                <TableCell>Style</TableCell>
                <TableCell>Amount of Routes</TableCell>

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
