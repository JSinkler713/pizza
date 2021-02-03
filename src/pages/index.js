import React from 'react'
import Layout from '../components/Layout'
import LoadingGrid from '../components/LoadingGrid' 
import SEO from '../components/SEO'
import HomeItemGrid from '../components/HomeItemGrid'
import { HomePageGrid } from '../styles/Grids'


import useLatestData from '../utils/useLatestData'
const CurrentlySlicing = ({ slicemasters })=> {
  return(
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Currently Slicing</span>
      </h2>
      <p>Ready to slice you up</p>
      {!slicemasters && <LoadingGrid count={4}/>}
      {slicemasters && slicemasters.length && <HomeItemGrid items={slicemasters}/>}
    </div>
  )
}


const HotPizza = ({ hotSlices })=> {
  return(
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Hot Now!</span>
      </h2>
      <p>Come grab a slice</p>
      {!hotSlices  && <LoadingGrid count={4}/>}
      {hotSlices && hotSlices.length && <HomeItemGrid items={hotSlices} />}
    </div>
  )
}

const HomePage = ()=> {
  const {slicemasters, hotSlices} = useLatestData()

  return(
    <>
      <SEO />
      <div className='center'>
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters}/>
          <HotPizza hotSlices={hotSlices}/>
        </HomePageGrid>
      </div>
    </>
  )
}
export default HomePage;
