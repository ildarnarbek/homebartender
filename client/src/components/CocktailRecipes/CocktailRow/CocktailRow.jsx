import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Paper,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const CocktailRow = ({ setLoading }) => {
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [openGroups, setOpenGroups] = React.useState(false);
  const [openTypes, setOpenTypes] = React.useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [name, setName] = useState('');
  const [alcoPercent, setAlcoPercent] = useState(0);
  const loadingGroups = openGroups && groups.length === 0;
  const loadingTypes = openTypes;

  useEffect(() => {
    let active = true;

    if (!loadingGroups) {
      return undefined;
    }

    (async () => {
      const res = await axios.get('http://localhost:3001/api/cocktail-type/all');
      if (active) {
        setTypes([...res.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingGroups]);

  useEffect(() => {
    let activeTypes = true;
    console.log('useeffect');

    if (!loadingTypes) {
      return undefined;
    }

    (async () => {
      const res = await axios.get('http://localhost:3001/api/cocktail-type/all');
      if (activeTypes) {
        setTypes([...res.data]);
      }
    })();

    return () => {
      activeTypes = false;
    };
  }, [loadingTypes]);

  const sendData = () => {
    console.log();
    axios
      .post('http://localhost:3001/api/drink/', {
        name: name,
        alcoPercent: alcoPercent,
        drinkGroupId: selectedGroup.id,
        drinkTypeId: selectedType.id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setLoading(true);
  };

  return (
    <Paper>
      <Grid sx={{ p: 2, width: 'auto' }} container>
        <Grid item sx={{ mr: 2 }}>
          <TextField
            id='outlined-basic'
            label='Название'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ mr: 2 }}>
          <Autocomplete
            id='asynchronous-demo'
            sx={{ width: 200 }}
            open={openGroups}
            onOpen={() => {
              setOpenGroups(true);
            }}
            onClose={() => {
              setOpenGroups(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedGroup}
            onChange={(e, newValue) => {
              setSelectedGroup(newValue);
              setSelectedType(null);
              console.log(selectedGroup);
              if (newValue === null) {
                setSelectedType(null);
              }
            }}
            options={groups}
            loading={loadingGroups}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Тип стакана'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGroups ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item sx={{ mr: 2 }}>
          <Autocomplete
            id='asynchronous-demo'
            sx={{ width: 200 }}
            open={openTypes}
            onOpen={() => {
              setOpenTypes(true);
            }}
            onClose={() => {
              setOpenTypes(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedType}
            onChange={(e, newValue) => {
              setSelectedType(newValue);
            }}
            options={types}
            loading={loadingTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Тип коктейля'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGroups ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item container sx={{ width: 'auto', alignContent: 'center'}}>
          <Fab
            size='small'
            color='secondary'
            aria-label='add'
            onClick={sendData}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CocktailRow;
