import React, { useContext } from 'react'
import { GlobalContext } from './_app.js'
import { useState } from 'react'

import AboutMe from './AboutMe.jsx'
import Education from './Education.jsx'
import Career from './Career.jsx'
import Project from './Project.jsx'
import ProjectModal from '../components/ProjectModal.jsx'

export default function Home() {
    const { modal, setModal } = useContext(GlobalContext)

    return (
        <div className='max-w-screen-xl mx-auto p-6 lg:p-20 relative z-10'>
            <div className='about-me w-full'><AboutMe /></div>
            <div className='education w-full'><Education /></div>
            <div className='skill w-full'><Career /></div>
            <div className='project w-full'><Project /></div>
            <div className='footer h-12'></div>
            {modal && <ProjectModal />}
        </div>
    )
}
