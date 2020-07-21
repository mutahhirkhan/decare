import React from 'react';
import './App.css';
import { Layout } from './Layout/Layout';
import { GlobalProvider } from './context/GlobalState';


export const App = () => {
  return (
    <GlobalProvider>
      <Layout />
    </GlobalProvider>
  );

}