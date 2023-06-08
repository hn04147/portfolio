const Modal = ({ projectTitle, deleteModal }) => {
    return (
        <div className='fixed h-screen w-screen left-0 top-0 z-50'>
            <div className='absolute left-0 top-0 opacity-50 bg-black w-full h-full' />
            <div className='absolute max-sm:m-0 max-sm:h-full max-sm:w-full sm:my-[50px] sm:mx-[100px] bg-white opacity-100 top-0 left-0 sm:h-[calc(100%-100px)] sm:w-[calc(100%-200px)]'>
                <div className='p-10'>
                    {projectTitle}
                </div>
                <div onClick={deleteModal}>lsdkjflsdkfjsdkl</div>          
            </div>
        </div>
    )
}

export default Modal