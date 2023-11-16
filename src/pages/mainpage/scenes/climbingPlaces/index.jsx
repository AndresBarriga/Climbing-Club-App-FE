import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'amount_of_routes', headerName: 'Amount of Routes', width: 160, sortable: false },
  { field: 'amount_of_favourites', headerName: 'Amount of Favourites', width: 180, sortable: false },
];

const countries = [
  { id: 1, name: 'Germany', type: 'Country'},
  { id: 2, name: 'Spain', type: 'Country'},
  // more countries...
];

const regions = [
  { id: 1, name: 'Berlin', type: 'Region', countryId: 1},
  { id: 2, name: 'Bavaria', type: 'Region', countryId: 1},
  // more regions...
];

const areas = [
  { id: 1, name: 'Area 1', type: 'Area', regionId: 1},
  { id: 2, name: 'Area 2', type: 'Area', regionId: 1},
  // more areas...
];

const places = [
  {
    id: 1,
    name: 'Place 1',
    type: 'Place',
    amount_of_routes: 10,
    amount_of_favourites: 5,
    areaId: 1
  },
  // more places...
];

function ClimbingGrid() {
  const [level, setLevel] = useState('country');
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);

  let rows = [];
  switch(level) {
    case 'country':
      rows = countries;
      break;
    case 'region':
      rows = regions.filter(r => r.countryId === selectedCountryId);
      break;
    case 'area':
      rows = areas.filter(a => a.regionId === selectedRegionId);
      break;
    case 'place':
      rows = places.filter(p => p.areaId === selectedRegionId);
      break;
    default:
      rows = countries;
  }

  const handleRowClick = (param) => {
    switch(level) {
      case 'country':
        setSelectedCountryId(param.id);
        setLevel('region');
        break;
      case 'region':
        setSelectedRegionId(param.id);
        setLevel('area');
        break;
      case 'area':
        setSelectedRegionId(param.id);
        setLevel('place');
        break;
      default:
    }
  }

  const handleBackClick = () => {
    switch(level) {
      case 'region':
        setLevel('country');
        break;
      case 'area':
        setLevel('region');
        break;
      case 'place':
        setLevel('area');
        break;
      default:
    }
  }

  return (
    <div>
      {level !== 'country' && <button onClick={handleBackClick}>Back</button>}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={handleRowClick}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

  


export default ClimbingGrid;