import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Grid,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
  InputAdornment
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { width } from '@mui/system'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: 'red',
//   }
// }));

const BarLoader = ({setLoading}) => {
  const [types, setTypes] = useState([])
  const [groups, setGroups] = useState([])
  const [openGroups, setOpenGroups] = React.useState(false)
  const [openTypes, setOpenTypes] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [alcoPercent, setAlcoPercent] = useState(0)
  const loadingGroups = openGroups && groups.length === 0
  const loadingTypes = openTypes

  useEffect(() => {
    let active = true

    if (!loadingGroups) {
      return undefined
    }

    ;(async () => {
      const res = await axios.get('http://localhost:3001/api/drink-group/all')
      if (active) {
        setGroups([...res.data])
      }
    })()

    return () => {
      active = false
    }
  }, [loadingGroups])

  useEffect(() => {
    let activeTypes = true
    console.log('useeffect')

    if (!loadingTypes) {
      return undefined
    }

    (async () => {
      const res = await axios.get('http://localhost:3001/api/drink-type/all')

      console.log(res.data)

      const filtredOptions = await res.data.filter((i) =>
        i.name.includes(selectedGroup.name),
      )

      console.log(filtredOptions)
      if (activeTypes) {
        setTypes([...filtredOptions])
      }
    })()

    return () => {
      activeTypes = false
    }
  }, [loadingTypes, selectedGroup])

 
  const sendData = () => {
    console.log()
    axios
      .post('http://localhost:3001/api/drink/', {
        name: name,
        count: count,
        alcoPercent: alcoPercent,
        drinkGroupId: selectedGroup.id,
        drinkTypeId: selectedType.id,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    setLoading(true)
  }

  // const classes = useStyles();

  return (
    <>
      <Grid sx={{p: 2}} container>
        <Grid item sx={{mr: 2}}>
          <TextField
            id="outlined-basic"
            label="Название"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item sx={{mr: 2}}>
          <TextField
            id="outlined-basic"
            label="Количество"
            type="number"
            value={count}
            sx={{ width: 150 }}
            required
            onChange={(e) => setCount(e.target.value)}
            variant="outlined"
            InputProps={{
              inputProps: { min: 50 },
              endAdornment: <InputAdornment position="end">ml</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item sx={{mr: 2}}>
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 200 }}
            open={openGroups}
            onOpen={() => {
              setOpenGroups(true)
            }}
            onClose={() => {
              setOpenGroups(false)
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedGroup}
            onChange={(e, newValue) => {
              setSelectedGroup(newValue)
              setSelectedType(null)
              if (
                selectedGroup?.id !== 10 &&
                selectedGroup?.id !== 11 &&
                selectedGroup?.id !== 12 &&
                selectedGroup?.id !== 14
              ) {
                setAlcoPercent(0)
              }
              console.log(selectedGroup)
              if (newValue === null) {
                setDisabled(true)
                setSelectedType(null)
              } else {
                setDisabled(false)
              }

            }}
            options={groups}
            loading={loadingGroups}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Группа напитка"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGroups ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item sx={{mr: 2}}>
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 200 }}
            open={openTypes}
            disabled={disabled}
            onOpen={() => {
              setOpenTypes(true)
            }}
            onClose={() => {
              setOpenTypes(false)
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={selectedType}
            onChange={(e, newValue) => {
              setSelectedType(newValue)
            }}
            options={types}
            loading={loadingTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип напитка"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingGroups ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item sx={{mr: 2}}>
          {selectedGroup?.id !== 11 &&
          selectedGroup?.id !== 12 &&
          selectedGroup?.id !== 13 &&
          selectedGroup?.id !== 14 ? (
            <TextField
              id="outlined-basic"
              label="% алкоголя"
              type="number"
              variant="outlined"
              sx={{ width: 150 }}
              value={alcoPercent}
              onChange={(e) => setAlcoPercent(e.target.value)}
              InputProps={{
                inputProps: { min: 0, max: 95 },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          ) : null}
        </Grid>
        <Grid item container sx={{width: 'auto'}}>
          <IconButton color="primary" onClick={sendData}>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export default BarLoader
