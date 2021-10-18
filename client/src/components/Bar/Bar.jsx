import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BarLoader from './BarLoader/BarLoader'
import BarList from './BarList/BarList'

const Bar = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:3001/api/drink/all');
      setDrinks([...res.data]);
    }
    fetchData()
    setLoading(false)
    }, [loading]);

  console.log(drinks);
  return (
    <>
      <BarLoader setLoading={setLoading}/>
      <BarList drinks={drinks}/>
    </>
  )
}

export default Bar
