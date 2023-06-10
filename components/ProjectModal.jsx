import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../pages/_app.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import data from '../data/data.json'

import letmeupMarkdown from '../markdowns/letmeupMarkdown.md'
import objectDetectionMarkdown from '../markdowns/objectDetectionMarkdown.md'
import imageSegmentationMarkdown from '../markdowns/imageSegmentationMarkdown.md'
import yoloxMarkdown from '../markdowns/yoloxMarkdown.md'
import openseaMarkdown from '../markdowns/openseaMarkdown.md'
import graduationMarkdown from '../markdowns/graduationMarkdown.md'
import dataAnnotation from '../markdowns/dataAnnotation.md'

const ProjectModal = ({ }) => {
    const { modal, setModal } = useContext(GlobalContext)
    const { projectNum, setProjectNum } = useContext(GlobalContext)

    const projects = data.project

    useEffect(() => {
        document.body.style = `overflow: hidden`
        return () => document.body.style = `overflow:auto`
    }, [])

    const handleClose = () => {
        setProjectNum(-1)
        setModal(false)
    }

    const modalList = [
        letmeupMarkdown,
        objectDetectionMarkdown,
        imageSegmentationMarkdown,
        yoloxMarkdown,
        openseaMarkdown,
        graduationMarkdown,
        dataAnnotation
    ]

    return (
        <div className='fixed h-screen w-screen left-0 top-0 z-50'>
            <div className='absolute left-0 top-0 opacity-50 bg-black w-full h-full' />
            <div className='absolute max-lg:m-0 max-lg:h-full max-lg:w-full lg:my-[25px] lg:mx-[150px] bg-white opacity-100 top-0 left-0 lg:h-[calc(100%-50px)] lg:w-[calc(100%-300px)]'>
                <div className='absolute right-5 top-5 cursor-pointer'><img src={'/exit-icon.svg'} onClick={handleClose} /></div>
                <div className='relative w-full h-full'>
                    <div className='max-lg:w-[calc(100%-4rem)] lg:w-[700px] mx-auto mt-14 mb-10 max-h-[calc(100%-6rem)] lg:max-h-[calc(100%-8rem)] overflow-scroll scrollbar-hide'>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            className='prose'
                            components={{img: ({node, ...props}) => <img className='max-w-full' {...props} alt=""/>}}
                        >
                            {modalList[projectNum]}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal