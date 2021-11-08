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
  const [glasses, setGlasses] = useState([]);

  const [openGlasses, setOpenGlasses] = React.useState(false);
  const [selectedGlass, setSelectedGlass] = useState(null);

  const [name, setName] = useState('');
  const loadingGlasses = openGlasses && glasses.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingGlasses) {
      return undefined;
    }

    (async () => {
      const res = await axios.get('http://localhost:3001/api/glass/all');
      if (active) {
        setGlasses([...res.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingGlasses]);


  const sendData = () => {
    console.log();
    axios
      .post('http://localhost:3001/api/drink/', {
        name: name,
        drinkGroupId: selectedGlass.id,
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
            open={openGlasses}
            onOpen={() => {
              setOpenGlasses(true);
            }}
            onClose={() => {
              setOpenGlasses(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedGlass}
            onChange={(e, newValue) => {
              setSelectedGlass(newValue);
            }}
            options={glasses}
            loading={loadingGlasses}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Тип стакана'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGlasses ? (
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
