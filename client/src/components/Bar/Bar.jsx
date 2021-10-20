import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

import BarLoader from './BarLoader/BarLoader';
import BarList from './BarList/BarList';
import Layout from '../../layout/Layout';


const Bar = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:3001/api/drink/all');
      setDrinks([...res.data]);
    }
    fetchData();
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    async function fetchGroups() {
      const res = await axios.get('http://localhost:3001/api/drink-group/all');
      setGroups([...res.data]);
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    async function fetchTypes() {
      const res = await axios.get('http://localhost:3001/api/drink-type/all');
      setTypes([...res.data]);
    }
    fetchTypes();
  }, []);

  console.log(drinks);
  return (
    <Layout>
      <Grid container flexDirection='column' alignItems="center" spacing={2}>
        <Grid item>
          <BarLoader setLoading={setLoading} />
        </Grid>
        <Grid item>
          <BarList drinks={drinks} types={types} groups={groups} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Bar;
