"use client";

import {useState} from 'react'
import Image from 'next/image'
import { CarProps } from '@/types';
import { CarDetails, CustomButton } from '.';
import { calculateCarRent, generateCarImageUrl } from '@/utils';

/* 
Ce composant CarCard est utilisé pour afficher une carte individuelle pour une voiture
 dans le catalogue. Il affiche des informations telles que la marque, le modèle, 
 le loyer, et une image de la voiture. Il utilise également un composant CarDetails 
 pour afficher plus de détails sur la voiture lorsque l'utilisateur clique sur "View More".
*/

// Définition des propriétés attendues par le composant
interface CarCardProps {
    car: CarProps;
}
// Définition du composant CarCard avec les types attendus par l'objet car
const CarCard = ( {car}: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive} = car;
     // Calcul du loyer de la voiture
    const carRent = calculateCarRent(city_mpg,year);
      // État pour gérer l'ouverture/fermeture des détails de la voiture
    const [IsOpen, setIsOpen] = useState(false)

  return (
    <div className="car-card group"> {/* Conteneur principal de la carte de la voiture */}
        <div className="car-card__content">
            <h2 className="car-card__content-title">
                {make} {model}  {/* Affiche la marque et le modèle de la voiture */}
            </h2>


        </div>

        <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">

             $   

            </span>

            {carRent} {/* Affiche le loyer de la voiture */}

            <span className="self-end text-[14px] font-medium">
                /day

            </span>

        </p>

        <div className="relative w-full h-40 my-3 object-contain">
            <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain"/>

        </div>

        <div className="relative flex w-full mt-2">
             {/* Affiche les détails de la voiture (transmission, type de conduite, MPG) */}
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/steering-wheel.svg" width={20} height={20} alt="sterring wheel"/>
                    <p className="text-[14px] leading-[17px]">
                        {transmission === 'a' ? "Automatic" : "Manual"}
                    </p>

                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/tire.svg" width={20} height={20} alt="tire"/>
                    <p className="text-[14px] leading-[17px]">
                        {drive.toUpperCase()}
                    </p>

                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/gas.svg" width={20} height={20} alt="sterring wheel"/>
                    <p className="text-[14px] leading-[17px]">
                        {city_mpg} MPG
                    </p>

                </div>

            </div>

            <div className="car-card__btn-container">
                {/* Ouvre les détails de la voiture */}
                <CustomButton
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsOpen(true)} 
                />

            </div>
        </div>
        <CarDetails isOpen={IsOpen} closeModal= {() => setIsOpen(false)} car={car}/> {/* Composant pour afficher les détails de la voiture */}
    </div>
  )
}

export default CarCard