import React, { useEffect, useState } from "react";

const SviZanrovi = ({ onZanroviSelect, onClose}) => {
    const [zanrovi, setZanrovi] = useState([]);
    const [selectedZanrovi, setSelectedZanrovi] = useState([]);

    useEffect(() => {
    const fetchZanrovi = async () => {
        try {
            const response = await fetch("http://localhost:5108/Zanr/vratiSveZanrove");
            if (!response.ok) {
            throw new Error("Greška pri učitavanju žanrova");
            }
            const data = await response.json();
            setZanrovi(data);
        } 
        catch (error) {
            console.error("Greška prilikom učitavanja žanrova:", error);
        }
       
        const savedGenres = JSON.parse(localStorage.getItem("selectedGenres"));
        if (savedGenres) {
            setSelectedZanrovi(savedGenres);
        }
    };

    fetchZanrovi();
    }, []);

   
    const handleCardClick = (zanrId) => {
        setSelectedZanrovi((prevSelected) =>
            prevSelected.includes(zanrId)
            ? prevSelected.filter((id) => id !== zanrId) 
            : [...prevSelected, zanrId] 
        );
    };

  
    const handleFinishClick = () => {
        console.log(selectedZanrovi)
        onZanroviSelect(selectedZanrovi);
        localStorage.setItem("selectedGenres", JSON.stringify(selectedZanrovi));
        onClose();
    };

    return (
    <div className="p-0 w-full h-full bg-gray-100">
        <h1 className="text-3xl text-black font-bold text-center mt-8 mb-8">Genres</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {zanrovi.map((zanr) => (
            <div
            key={zanr.id}
            className={`p-4 ml-4 mr-4 rounded-lg shadow-md cursor-pointer transition ${
                selectedZanrovi.includes(zanr.id)
                ? "bg-[rgb(224,209,190)] text-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleCardClick(zanr.id)}
            >
            <img
                src={zanr.slika} 
                alt={zanr.naziv}
                className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-medium text-center">{zanr.naziv}</h2>
            </div>
        ))}
        </div>
        <button
            className="absolute bottom-4 right-4 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
           onClick={handleFinishClick}
        >
            Finish
        </button>
    </div>
  );
};

export default SviZanrovi;