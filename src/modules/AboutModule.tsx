import AboutContent from '@/components/About-Hero'
import AboutContacts from '@/components/AboutContacts'
import AboutGoal from '@/components/AboutGoal'
import AboutHistory from '@/components/AboutHistory'
import AboutStats from '@/components/AboutStats'
import React from 'react'

const AboutModule = () => {
  return (
    <div>
      <AboutContent/>
      <AboutGoal/>
      <AboutHistory/> 
      <AboutStats/>
      <AboutContacts/>
    </div>
  )
}

export default AboutModule

