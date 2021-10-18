import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Grid,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { width } from '@mui/system';

const BarList = ({drinks}) => {

  return (
    <Grid container justifyContent="center">
      <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
        <Table  aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align='right'>Група</TableCell>
              <TableCell align='right'>Тип</TableCell>
              <TableCell align='right'>Количество&nbsp;(ml)</TableCell>
              <TableCell align='right'>Алкоголь&nbsp;(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drinks.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.drinkGroupId}</TableCell>
                <TableCell align='right'>{row.drinkTypeId}</TableCell>
                <TableCell align='right'>{row.count}</TableCell>
                <TableCell align='right'>{row.alcoPercent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BarList;
