import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { glassApi } from "../../../api/glassApi";
import { cocktailTypeApi } from "../../../api/coctailTypeApi"

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
  const [cocktailTypes, setCocktailTypes] = useState([]);

  const [openGlasses, setOpenGlasses] = React.useState(false);
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [openCoctailTypes, setOpenCoctailTypes] = React.useState(false);
  const [selectedCocktailType, setSelectedCocktailType] = useState(null);

  const [name, setName] = useState('');
  const loadingGlasses = openGlasses && glasses.length === 0;
  const loadingCocktailTypes = openCoctailTypes && cocktailTypes.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingGlasses) {
      return undefined;
    }

    (async () => {
      const res = await glassApi.getAll();
      if (active) {
        setGlasses([...res.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingGlasses]);

  useEffect(() => {
    let active = true;

    if (!loadingCocktailTypes) {
      return undefined;
    }

    (async () => {
      const res = await cocktailTypeApi.getAll();
      if (active) {
        setCocktailTypes([...res.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingCocktailTypes]);


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
        <Grid item sx={{ mr: 2 }}>
          <Autocomplete
            id='asynchronous-demo'
            sx={{ width: 200 }}
            open={openCoctailTypes}
            onOpen={() => {
              setOpenCoctailTypes(true);
            }}
            onClose={() => {
              setOpenCoctailTypes(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedCocktailType}
            onChange={(e, newValue) => {
              setSelectedCocktailType(newValue);
            }}
            options={cocktailTypes}
            loading={loadingCocktailTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Тип коктейля'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingCocktailTypes ? (
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
            size='medium'
            color='secondary'
            // aria-label='add'
            variant="extended"
            onClick={sendData}
          >
            <AddIcon /> Добавить коктейль
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CocktailRow;
