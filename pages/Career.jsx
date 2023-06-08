import Title from "../components/Title"
import data from '../data/data.json'

const Career = () => {

    return (
        <div className='w-full p-2 mb-10'>
            <Title title={'💻 Career'} />
            <div className='w-full max-lg:flex-col lg:flex'>
                <div className='w-40 lg:w-64 h-full grid content-center'>
                    <div className='text-sm text-slate-500'>2021.05 - 2021.12</div>
                    <div className='font-bold'>FrigateBird</div>
                </div>
                <div className='h-full grid content-center max-lg:mt-5'>
                    <div className='text-sm'>- React 기반의 open source 프로젝트인 Jitsi Meet를 커스터마이징 하여 화상 채팅 시스템을 구축</div>
                    <div className='text-sm'>- Letmeup 사이트 프론트엔드 부분 구축</div>
                </div>
            </div>
            <div className='h-[1px] w-full my-4 bg-stone-200' />
        </div>
    )
}

export default Career