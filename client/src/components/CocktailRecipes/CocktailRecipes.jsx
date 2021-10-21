import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

import Layout from '../../layout/Layout';
import CocktailRow from './CocktailRow/CocktailRow';
import ComponentRow from './ComponentRow/ComponentRow';


const CocktailRecipes = () => {
  return (
    <Layout>
      <Grid container flexDirection='column' alignItems="center" spacing={2}>
        <Grid item>
          <CocktailRow />
        </Grid>
        <Grid item>
          <ComponentRow />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CocktailRecipes;
