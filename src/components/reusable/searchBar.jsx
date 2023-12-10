import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Card, TextField } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    if (searchTerm.length >= 3) {
      const response = await fetch(`http://localhost:3001/search?term=${searchTerm}`);
      const results = await response.json();
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
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
      <SearchIcon />
      {searchResults.length > 0 && (
        <Card>
          <List>
            {searchResults.map((result, index) => (
              <ListItem
              sx={{
                '&:hover': {
                    backgroundColor: '#9EC69B',
                    cursor: 'pointer',
                },
            }}
                key={index}
                onClick={async () => {
                  let url = '/climbing-locations';
                  if (result.type === 'Route') {
                    const response = await fetch(`http://localhost:3001/searchNavigation/route-details/${result.name}`);
                    const details = await response.json();
                    url += `/${details.country}/${details.region}/${details.area}/${details.route}`;
                  } else if (result.type === 'Area') {
                    const response = await fetch(`http://localhost:3001/searchNavigation/area-details/${result.name}`);
                    const details = await response.json();
                    url += `/${details.country}/${details.region}/${result.name}`;
                  } else if (result.type === 'Region') {
                    const response = await fetch(`http://localhost:3001/searchNavigation/region-details/${result.name}`);
                    const details = await response.json();
                    url += `/${details.country}/${result.name}`;
                  } else if (result.type === 'Country') {
                    url += `/${result.name}`;
                  }
                  navigate(url);
                }}
              >
                <ListItemText primary={`${result.name} (${result.type})`} />
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;