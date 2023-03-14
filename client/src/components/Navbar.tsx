import background from '../assets/images/background.png'
import logo from '../assets/images/logo.png'

const gradient = `radial-gradient(9.18% 304.83% at -4.79% 158.96%, rgba(255, 255, 255, 0.5) 0%, rgba(237, 246, 255, 0.57818) 100%)`

export const Navbar = () => {

    return (
        <div style={{ background: gradient }} className='relative w-full aspect-[1440/448] min-h-[300px] flex flex-col'>
            <img src={background} alt="" className='absolute left-0 top-0 w-full h-full object-cover' />
            <div className='mx-auto max-w-6xl relative flex-1 flex flex-col'>
                <div className='p-4'>
                    <img src={logo} alt="" />
                </div>
                <div className='text-center my-auto'>
                    <div className='text-5xl text-[#1A2B3B] font-bold'>Platforma de promovare</div>
                    <div className='text-[#1A2B3B] text-sm mt-2'>
                        Centrul Republican de Învățământ din subordinea Ministerului Educației Publice Platforma unică servește la popularizarea celor mai bune practici ale pedagogilor
                    </div>
                    <div className='flex gap-4 justify-center mt-10'>
                        <button className='bg-[#76CDD8] text-white rounded px-6 py-2'>Inscrie-te</button>
                        <button className='border border-[#76CDD8] text-[#76CDD8] rounded px-6 py-2'>Autentificare</button>
                    </div>
                </div>
            </div>
        </div>
    )
}