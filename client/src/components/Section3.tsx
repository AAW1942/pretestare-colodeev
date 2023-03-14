import tempImg from '../assets/images/temp.jpg'

export const Section3 = () => {

    const Item = ({ img, title, description }) => {
        return (
            <div className='w-full'>
                <img className='aspect-[403/240] w-full object-cover' src={img} alt="" />
                <div className='p-4'>
                    <div className='text-lg font-semibold text-[#1F1F1F]'>{title}</div>
                    <div className='text-sm font-light text-[#1F1F1F]'>{description}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='text-2xl font-semibold text-center mb-8'>Produse metodice</div>
            <div className='grid grid-cols-3 gap-4'>
                <Item {...item} />
                <Item {...item} />
                <Item {...item} />
            </div>
        </div>
    )
}

const item = {
    img: tempImg,
    title: 'Dezvoltarea lecției',
    description: `Este dezvoltarea unei clase de eșantion de o oră de nivel înalt sau a unui training de grup, bazat pe experiențe internaționale, desfășurat cu metode interactive avansate.`
}