import React from 'react'
import Logo from '../../Images/Leco.png'

function Footer() {
    return (
        <footer className="bg-purple-700 text-white">
            <div className=" h-24 flex flex-col md:flex-row  items-center justify-between px-10">
                <div className='flex space-x-4'>
                    <img src={Logo} alt="Logo" className="h-16 w-16" />
                    <p className="text-sm font-medium flex items-center">
                        Custom API Portal
                    </p>
                </div>

                <p className="text-xs text-purple-200 mt-1 md:mt-0">
                    © {new Date().getFullYear()} LECO IT Department. All rights reserved.
                </p>

            </div>
        </footer>
    )
}

export default Footer
