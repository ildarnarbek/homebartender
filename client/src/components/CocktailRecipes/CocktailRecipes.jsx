import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

import Layout from '../../layout/Layout';
import CocktailRow from './CocktailRow/CocktailRow';
import ComponentRow from './ComponentRow/ComponentRow';
import NewComponentRow from './NewComponentRow/NewComponentRow';



// const initState = [
//   {
//     id: 1
//   }
// ]


const CocktailRecipes = () => {
  const [components, setComponents] = useState([]);


  const addComponent = (drinkTypeId, groupId, count) => {
    if (drinkTypeId && groupId && count ) {
      const newComponent = {
        id: components.length+1,
        drinkTypeId,
        groupId,
        count: count
      }
      console.log(newComponent)
      setComponents(prevState => [...prevState, newComponent])
    }
  }


  const removeComponent = (id) => {
      setComponents(prevState => prevState.filter(el => el.id !== id))
  }

  console.group('state');
  console.log('components');
  console.log(components);
  console.groupEnd();

  return (
    <Layout>
      <Grid container flexDirection='column' alignItems="center" spacing={2}>
        <Grid item>
          <CocktailRow />
        </Grid>
        <Grid item>

          {
            components.map((e) => {
              return  <ComponentRow key={e.id} id={e.id} data={e} addComponent={addComponent} removeComponent={removeComponent}/>
           })
          }
        <NewComponentRow components={components} addComponent={addComponent}/>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CocktailRecipes;
