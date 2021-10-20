import React from 'react';

import {
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { purple, blue, amber, pink, teal} from '@mui/material/colors';

const colorSelector = (percent) => {
  if (percent === 0) {return blue[50]}
  if (percent < 8) {return amber[100]}
  if (percent < 13) {return pink[100]}
  if (percent < 25) {return purple[100]}
  if (percent <= 40) {return blue[300]}
  if (percent < 80) {return teal[300]}
}

const BarList = ({ drinks, groups, types }) => {
  console.log(groups);
  console.log(types);

  return (
    <>
      {groups.length > 0 && types.length > 0 ? (
        <Grid container justifyContent='center'>
          <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
            <Table aria-label='simple table'>
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
                    <TableCell align='right'>
                      {groups.find((e) => e.id === row.drinkGroupId).name}
                    </TableCell>
                    <TableCell align='right'>
                      {types.find((e) => e.id === row.drinkTypeId).name}
                    </TableCell>
                    <TableCell align='right'>{row.count}</TableCell>
                    <TableCell align='right'>
                    <Chip label={row.alcoPercent === 0 ? 'б/а' : `${row.alcoPercent}%`} size="small" sx={{backgroundColor: colorSelector(row.alcoPercent)}}/>
                      {/* {row.alcoPercent} */}
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default BarList;
