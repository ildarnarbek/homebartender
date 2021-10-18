import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: 'red',
//   }
// }));

const BarLoader = () => {
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [openGroups, setOpenGroups] = React.useState(false);
  const [openTypes, setOpenTypes] = React.useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [count, setCount] = useState(0);
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

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/api/drink-type/all')
  //     .then(function (response) {
  //       console.log(response.data);
  //       setTypes(response.data);
  //       setTypesLoaded(true)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const sendData = () => {
    console.log();
    axios
      .post('http://localhost:3001/api/drink/', {
        name: name,
        count: count,
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
  };

  // const classes = useStyles();

  return (
    <>
      <Grid container>
        <TextField
          id='outlined-basic'
          label='Название'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Количество'
          type='number'
          value={count}
          onChange={(e) => setCount(e.target.value)}
          variant='outlined'
          endAdornment='ml'
        />
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
            if(selectedGroup?.id !== 10 &&
              selectedGroup?.id !== 11 &&
              selectedGroup?.id !== 12 &&
              selectedGroup?.id !== 14){
                setAlcoPercent(0)
              }
          }}
          options={groups}
          loading={loadingGroups}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Asynchronous'
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
              label='Asynchronous'
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
        {selectedGroup?.id !== 10 &&
        selectedGroup?.id !== 11 &&
        selectedGroup?.id !== 12 &&
        selectedGroup?.id !== 14 ? (
          <TextField
            id='outlined-basic'
            label='Процент алкоголя'
            type='number'
            variant='outlined'
            endAdornment='%'
            value={alcoPercent}
            onChange={(e) => setAlcoPercent(e.target.value)}
          />
        ) : null}
        <IconButton color='primary' onClick={sendData}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
      {selectedGroup?.id}
      {selectedType?.id}
    </>
  );
};

export default BarLoader;
