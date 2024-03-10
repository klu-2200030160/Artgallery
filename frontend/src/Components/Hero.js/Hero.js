import React from 'react'
import './Hero.css'
import arrow_icon from '../Assests/arrow.png'
import hero_image from '../Assests/hero_image.jpg'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
          <div>
              <h2>Welcome to RD Gallery, where art and creativity</h2> <h2> come to life in the digital realm. 
                Our online art gallery </h2> <h2>is a platform dedicated to showcasing the work of talented artists from </h2><h2>various backgrounds and styles. 
                We believe that art is a </h2><h2>powerful means of expression, and our mission is to connect artists with art enthusiasts and collectors worldwide.</h2>
          </div>
          <div className='hero-latest-btn'>
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className='hero-right'>
          <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero;