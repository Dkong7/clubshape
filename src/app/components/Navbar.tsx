'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const [language, setLanguage] = useState('en'); // Default language

    useEffect(() => {
        const logoRef = ref(storage, 'LOGOTIPO-WHITE.png');
        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error("Error al obtener la URL de la imagen:", error);
            });
    }, []);

    const changeLanguage = () => {
        setLanguage((prevLang) => prevLang === 'en' ? 'es' : 'en');
    };

    function getMenuClasses() {
        return isOpen ?
            "flex flex-col absolute top-[60px] bg-gray-800 w-full p-4 left-0 gap-10 md:hidden" :
            "hidden md:flex";
    }

    return (
        <nav className="bg-gray-800 bg-opacity-10 text-white p-4 sm:p-6 md:flex md:justify-between">
            <div className="container mx-auto flex justify-between items-center">
                <a href="" className="text-2xl font-bold">
                    {logoUrl ? <img src={logoUrl} alt="Logo" className="h-12" /> : "CLUB SHAPE"}
                </a>
                <div className={getMenuClasses()}>
                    <Link href="/" className="mx-2 hover:text-gray-300 p-custom">
                        Home
                    </Link>
                    <Link href="/tienda" className="mx-2 hover:text-gray-300 p-custom">
                        Store
                    </Link>
                    <Link href="/contacto" className="mx-2 hover:text-gray-300 p-custom">
                        Contact
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="relative inline-block w-20 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={language === 'es'}
                                onChange={changeLanguage}
                                className="toggle-checkbox"
                            />
                            <label
                                htmlFor="toggle"
                                className="toggle-label"
                                data-language={language === 'en' ? 'EN' : 'ES'}
                            ></label>
                        </div>
                        <button className="btn-custom">
                            Login
                        </button>
                    </div>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};
