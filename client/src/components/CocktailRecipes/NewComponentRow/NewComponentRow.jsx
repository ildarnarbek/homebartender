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
import RemoveIcon from '@mui/icons-material/Remove';

const initErrors = {
  count: '',
  selectedType: '',
  selectedGroup: '',
};

const ComponentRow = ({
  setLoading,
  components,
  addComponent,
  removeComponent,
  data,
  id,
}) => {
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [openGroups, setOpenGroups] = React.useState(false);
  const [openTypes, setOpenTypes] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState(initErrors);

  console.log('data');

  console.log(data);

  const loadingGroups = openGroups && groups.length === 0;
  const loadingTypes = openTypes;

  useEffect(() => {
    let active = true;

    if (!loadingGroups) {
      return undefined;
    }

    (async () => {
      const res = await axios.get('http://localhost:3001/api/drink-group/all');
      if (active) {
        setGroups([...res.data]);
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
      const res = await axios.get('http://localhost:3001/api/drink-type/all');

      console.log(res.data);

      const filtredOptions = await res.data.filter((i) =>
        i.name.includes(selectedGroup.name)
      );

      console.log(filtredOptions);
      if (activeTypes) {
        setTypes([...filtredOptions]);
      }
    })();

    return () => {
      activeTypes = false;
    };
  }, [loadingTypes, selectedGroup]);

  const validateRow = () => {
    console.log(selectedGroup);
    console.log(selectedType);
    let errorObj = { ...initErrors };

    if (!count) {
      errorObj = { ...errorObj, count: 'Введите количество' };
    }

    if (!selectedGroup?.id) {
      errorObj = { ...errorObj, selectedGroup: 'Выберете группу' };
    }

    if (!selectedType && !disabled) {
      errorObj = { ...errorObj, selectedType: 'Выберете тип' };
    }

    console.log(errors);

    setErrors(errorObj);
  };

  const sendData = () => {
    console.log();
    axios
      .post('http://localhost:3001/api/drink/', {
        name: name,
        count: count,
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
            error={!!errors.count}
            helperText={errors.count}
            id='outlined-basic'
            label='Количество'
            type='number'
            value={count}
            sx={{ width: 150 }}
            required
            onChange={(e) => {
              setCount(e.target.value);
              validateRow();
            }}
            variant='outlined'
            InputProps={{
              inputProps: { min: 15 },
              endAdornment: <InputAdornment position='end'>ml</InputAdornment>,
            }}
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

              if (newValue === null) {
                setDisabled(true);
                setSelectedType(null);
              } else {
                setDisabled(false);
              }
              validateRow();
            }}
            options={groups}
            loading={loadingGroups}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Группа напитка'
                error={!!errors.selectedGroup}
                helperText={errors.selectedGroup}
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
            disabled={disabled}
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
              validateRow();
            }}
            options={types}
            loading={loadingTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.selectedType}
                helperText={errors.selectedType}
                label='Тип напитка'
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
        <Grid item container sx={{ width: 'auto', alignContent: 'center' }}>
          {id ? (
            <Fab
              size='small'
              color='primary'
              aria-label='add'
              onClick={() => removeComponent(id)}
            >
              <RemoveIcon />
            </Fab>
          ) : (
            <Fab
              size='small'
              color='secondary'
              aria-label='add'
              onClick={() => {
                validateRow();
                addComponent(selectedType?.id, selectedGroup?.id, count);
              }}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ComponentRow;
