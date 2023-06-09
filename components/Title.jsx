const Title = ({ title }) => {
    return (
        <div>
            <div className='pt-10' />
            <div className='text-3xl font-bold text-[rgb(40,54,106)]'>{title}</div>
            <div className='h-[3px] w-20 my-5 bg-[rgb(82,150,218)]' />
        </div>
    )
}

export default Title