import React from 'react'
import Banner from '../../componenets/Banner'
import Categories from './Categories'
import "../../App.css"
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home