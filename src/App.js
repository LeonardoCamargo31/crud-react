import React from 'react'
import Grid from '@material-ui/core/Grid'
import { ToastContainer } from 'react-toastify'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Index from './containers/index'

function App() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Index />
        </Grid>
        <Grid item xs={0} sm={1} />
      </Grid>
      <ToastContainer />
    </>
  )
}
export default App
