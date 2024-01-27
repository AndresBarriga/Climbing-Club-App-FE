import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


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