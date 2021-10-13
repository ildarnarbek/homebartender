import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { makeStyles } from '@material-ui/core/styles';

import { Grid, IconButton, TextField, Autocomplete ,CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: 'red',
//   }
// }));


const BarLoader = () => {

  const [types, setTypes] = useState();
  const [groups, setGroups] = useState();
  const [open, setOpen] = React.useState(false);
  const loading = open && groups.length === 0;

  useEffect(() => {
    axios.get('http://localhost:3001/api/drink-type/all')
    .then(function (response) {
      console.log(response.data);
      setTypes(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:3001/api//drink-group/all')
    .then(function (response) {
      console.log(response.data);
      setGroups(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])




  // const classes = useStyles();

  return (
    <>
      <Grid container >
        <TextField id="outlined-basic" label="Название" variant="outlined"  />
        <TextField id="outlined-basic" label="Количество" type="number" variant="outlined" endAdornment="ml" />
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 200 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={groups}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Asynchronous"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <IconButton color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default BarLoader;
