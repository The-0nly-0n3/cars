"use client";

import { manufacturers } from '@/constants';
import { useState, Fragment } from 'react';
import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import React from 'react'

import Image from 'next/image';

const SearchManufacturer = ( { selected, setSelected}:SearchManufacturerProps) => {
  const [query, SetQuery] = useState("")
  // Si aucune entrée utilisateur dans la recherche, alors
  const filteredManufacturers =
  //on vérifie si on a une requête
  //ici si on a pas de query alors on affiche
     query === ""
     //tous les fabricants
      ? manufacturers 
      //ou si requête alors filtre sur la requête
      : manufacturers.filter((item) => (
        item.toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g,
         "")
         )))

  return (
    <div className='search-manufacturer'>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
              />

          </Combobox.Button> 

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer:string) => manufacturer}
            onChange={(e) => SetQuery(e.target.value)}
          
          />

          <Transition
           as={Fragment}
           leave="transition ease-in dureation-100"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
           afterLeave={() => SetQuery('')}
           >
            <Combobox.Options>
              {filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active}) => (
                      <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      
                      
                      </>
                      

                    )}
                  </Combobox.Option>  
                )
              )}

            </Combobox.Options>


          </Transition>   

        </div>
        
      </Combobox>

    </div>
  )
}

export default SearchManufacturer