import { useState } from 'react'

import Title from "../components/Title"
import ProjectCard from "../components/ProjectCard"
import data from '../data/data.json'

const Project = () => {
    const projects = data.project

    return (
        <div className='w-full p-2 mb-10'>
            <Title title={'🛠 Projects'} />
            <div className='w-full flex flex-wrap'>
                {projects?.map((i, idx) => <ProjectCard
                    imgUrl={i?.imgUrl}
                    projectTitle={i?.projectTitle}
                    languages={i?.languages}
                    projectPeriod={i?.projectPeriod}
                    projectAbout={i?.projectAbout}
                    key={idx}
                />)}
            </div>
        </div>
    )
}

export default Project