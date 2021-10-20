import React from 'react';
import Header from '../components/Bar/Header/Header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component='main'
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          height: '100vh',
          px: 2,
          pt: 2
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
