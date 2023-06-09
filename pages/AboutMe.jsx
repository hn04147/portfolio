import Title from "../components/Title"
import data from '../data/data.json'

const AboutMe = () => {
    const aboutMe = data.aboutMe

    return (
        <div className='w-full p-2 mb-2'>
            <Title title={'🧑🏻‍💻 About Me'} />
            <div className='lg:flex'>
                <div className='introduce lg:min-w-[32rem] lg:mr-14 mb-10 lg:mb-0'>
                    {aboutMe?.introduce.map(((i, idx) => (<div key={idx}>{i}</div>)))}
                </div>
                <div className='contact'>
                    <div className='text-2xl font-bold text-[rgb(40,54,106)] mb-3'>Contact</div>
                    <div className='flex'>
                        <p className='text-md font-bold text-[rgb(40,54,106)] mr-2 min-w-[8rem]'>📞&nbsp;&nbsp;Phone </p>
                        <p className='text-md'>{aboutMe?.contact?.phone}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-md font-bold text-[rgb(40,54,106)] mr-2 min-w-[8rem]'>✉️&nbsp;&nbsp;Email </p>
                        <p className='text-md'>{aboutMe?.contact?.email}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-md font-bold text-[rgb(40,54,106)] mr-2 min-w-[8rem]'>🖥️&nbsp;&nbsp;Solved.ac</p>
                        <a href='https://solved.ac/profile/hn04147' className='text-md'>https://solved.ac/profile/hn04147</a>
                    </div>
                    <div className='flex'>
                        <p className='text-md font-bold text-[rgb(40,54,106)] mr-2 min-w-[8rem]'>🗃️&nbsp;&nbsp;Github</p>
                        <a href='https://github.com/hn04147' className='text-md'>{aboutMe?.contact?.github}</a>
                    </div>
                </div>
            </div>
            <div className='h-[1px] w-full mt-6 my-4 bg-stone-200' />
        </div>
    )
}

export default AboutMe