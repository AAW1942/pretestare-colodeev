import item1 from '../assets/images/item1.png'
import { ReactComponent as btnIcon1 } from '../assets/images/btnIcon1.svg'
import { ReactComponent as btnIcon2 } from '../assets/images/btnIcon2.svg'
import { ReactComponent as btnIcon3 } from '../assets/images/btnIcon3.svg'

export const Section2 = () => {

    const Btn = ({ text, svg: Svg, dark = false }) => (
        <div className={`rounded flex gap-4 p-4 ${dark ? 'bg-[#1A2B3B]' : 'shadow'}`}>
            <Svg />
            <div className={`${dark ? 'text-white' : ''}`}>{text}</div>
        </div>
    )

    return (
        <div>
            <div className='flex max-w-6xl mx-auto'>
                <div className='flex-1'>
                    <div className='text-4xl max-w-xl'>
                        We connect our customers with the best, and help them keep up-and stay open.
                    </div>
                    <div className='mt-4 grid gap-4 max-w-xl'>
                        <Btn dark svg={btnIcon1} text='We connect our customers with the best.' />
                        <Btn svg={btnIcon2} text='We connect our customers with the best.' />
                        <Btn svg={btnIcon3} text='We connect our customers with the best.' />
                    </div>
                </div>
                <div>
                    <img src={item1} alt="" />
                </div>
            </div>
        </div>
    )
}