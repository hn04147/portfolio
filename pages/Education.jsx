import Title from "../components/Title"

const Education = () => {
    return (
        <div className='w-full p-2 mb-2'>
            <Title title={'📖 Education'} />
            <div className='w-full h-16 flex'>
                <div className='w-40 lg:w-64 h-full grid content-center'>
                    <div className='text-sm text-slate-500'>2016.03 - 2023.08</div>
                    <div className='font-bold'>한양대학교</div>
                </div>
                <div className='h-full grid content-center'>
                    <div className='text-sm'>컴퓨터소프트웨어학부</div>
                    {/* <div className='text-sm'>3.39 / 4.5</div> */}
                    <div>&nbsp;</div>
                </div>
            </div>
            <div className='h-[1px] w-full my-4 bg-stone-200' />
        </div>
    )
}

export default Education