import { useContext } from "react"
import { GlobalContext } from "../pages/_app"

const ProjectCard = ({
    projectNumber,
    imgUrl,
    projectTitle,
    languages,
    projectPeriod,
    projectAbout
}) => {
    const { modal, setModal } = useContext(GlobalContext)
    const { projectNum, setProjectNum } = useContext(GlobalContext)

    const handleClick = () => {
        setProjectNum(projectNumber)
        setModal(true)
    }

    return (
        <div 
            className='w-full h-[200px] sm:w-[260px] sm:h-[350px] max-sm:flex relative my-2 sm:mr-4 bg-gray-100 border rounded-xl hover:duration-200 hover:shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] cursor-pointer' 
            onClick={handleClick}
        >
            <div className='backgroundUrl w-[100px] h-full sm:w-full sm:h-[150px]'>
                <img className='h-full w-full object-cover max-sm:rounded-l-xl sm:rounded-t-xl max-sm:border-r sm:border-b' src={imgUrl} />
            </div>
            <div className='textArea max-sm:mx-auto my-4 max-sm:h-full max-sm:w-auto sm:w-full sm:max-h-[200px] p-2'>
                <div className='text-sm text-slate-500 text-center'>{projectPeriod}</div>
                <div className='font-bold text-center'>{projectTitle}</div>
                <div className='flex justify-center'>
                    {languages?.map((i, idx) => 
                        <div className='text-[0.7rem] rounded-full bg-sky-500 text-white px-1.5 m-0.5' key={idx}>{i}</div>
                    )}
                </div>
                <div className='max-w-[180px] text-center mx-auto mt-2'>
                    <p className='text-sm'>{projectAbout}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard