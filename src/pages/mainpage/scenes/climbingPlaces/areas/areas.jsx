import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Typography, Paper, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams, Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import europe from "../../../../../styles/images/europe.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from '../../../../../components/reusable/searchBar';

const Areas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true)
  const navigate = useNavigate();
  const { country, region } = useParams();



  useEffect(() => {
    if (firstRender) {
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
      <div> <SearchBar /> </div>
      <Paper> <Button
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
          <Link to={`/climbing-locations/${country}/${region}`} style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>{region}/</Link>
          <span>&nbsp;&nbsp;</span>


          <Typography variant="h6" className="font-bold text-green-900" style={{ paddingTop: 14 }}>Areas within {region}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Area Name</TableCell>


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
