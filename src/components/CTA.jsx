import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Do you want to message me? <br className='sm:block hidden' />
        Let's talk together!
      </p>
      <Link to='/contact' className='btn'>
        Contact
      </Link>
    </section>
  )
}

export default CTA
