import AboutMe from './AboutMe.jsx'
import Education from './Education.jsx'

export default function Home() {
    return (
        <div className='h-screen w-screen p-10 lg:p-20'>
            <div className='about-me w-full'>
                <AboutMe />
            </div>
            <div className='education w-full'>
                <Education />
            </div>
            <div className='skill w-full h-[400px] bg-gray-200'></div>
            <div className='career w-full h-[400px] bg-stone-300'></div>
            <div className='project w-full h-[600px] bg-sky-200'></div>
        </div>
    )
}
