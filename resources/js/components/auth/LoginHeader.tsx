import logo from '@/assets/Logo Type/Aissential Logotype Assets_Logotype 3.svg'

export default function LoginHeader() {
    return (
        <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
                <img src={logo} alt="aissentialLogo" className='h-10 w-auto'/>

            </div>
            <p className="text-white/40 text-sm">Admin Dashboard</p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
    );
}
