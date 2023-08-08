"use client"; // Indique que ce fichier doit être exécuté côté client (navigateur)

// Importe des composants et des fonctions depuis d'autres fichiers
import Image from 'next/image' // Pour afficher des images
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '../components' // Composants personnalisés
import { fetchCars } from '@/utils' // Fonction pour récupérer les voitures
import { fuels, yearsOfProduction } from '@/constants'; // Listes de carburants et d'années de production
import { useEffect, useState } from 'react'; // Hooks de React pour gérer l'état et les effets

export default function Home() {
  // Stocke les informations sur les voitures, la recherche, les filtres, et la pagination
  /*
  Ici, nous utilisons le hook useState de React pour créer une variable d'état allCars 
  et une fonction setAllCars pour la mettre à jour. allCars contiendra la liste des voitures
   récupérées depuis le serveur, et setAllCars sera utilisée pour mettre à jour cette liste. 
   L'état initial est un tableau vide []
  
  */
  const [allCars, setAllCars] = useState([]); // Liste des voitures
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [manufacturer, setManufacturer] = useState(""); // Fabricant sélectionné
  const [model, setModel] = useState(""); // Modèle sélectionné
  const [fuel, setFuel] = useState("") // Carburant sélectionné
  const [year, setYear] = useState(2022); // Année sélectionnée
  const [limit, setLimit] = useState(10) // Nombre de voitures à afficher

  // Fonction pour récupérer les voitures depuis le serveur
  const getCars = async () => {
    setLoading(true); // Active l'indicateur de chargement
    try {
      const result = await fetchCars({ // Appelle la fonction pour récupérer les voitures
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });
      setAllCars(result); // Met à jour la liste des voitures
    } catch (error) {
      console.log(error); // Affiche l'erreur si quelque chose se passe mal
    } finally {
      setLoading(false); // Désactive l'indicateur de chargement
    }
  }

  // Appelle getCars chaque fois que les filtres changent
   /*
  Le hook useEffect de React exécute le code à l'intérieur de la fonction chaque fois que l'une des valeurs
   dans le tableau (fuel, year, limit, manufacturer, model) change. Dans ce cas, il appelle la fonction 
   getCars pour récupérer les voitures en fonction des filtres sélectionnés.
  
  */
  useEffect(() => {
    getCars(); // Appelle la fonction pour récupérer les voitures
  }, [fuel, year, limit, manufacturer, model]) // Liste des valeurs à surveiller

  // Vérifie si la liste des voitures est vide
   
   /*
 Cette ligne vérifie si allCars est vide. Elle utilise Array.isArray pour s'assurer que 
 allCars est un tableau, puis vérifie si sa longueur est inférieure à 1, 
 ou si allCars est null ou undefined. Si l'une de ces conditions est vraie, isDataEmpty sera true.
  
  */
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

   /*
Cette partie du code définit ce qui sera rendu à l'écran. Elle utilise des composants personnalisés comme <Hero />,
 <SearchBar />, et <CustomFilter /> pour afficher différentes parties de la page.
  La logique conditionnelle {allCars.length > 0 ? (...) : (...)} 
  vérifie si des voitures sont disponibles et affiche soit la liste des voitures, soit un message d'erreur.
  
  */

  return (
    <main className="overflow-hidden"> {/* conteneur principal*/}
      <Hero /> {/*Section de héros (voir explication dans `components/Hero.tsx`)*/} 
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1> {/* Titre */}
          <p> Explore the cars you might like</p> {/* Sous-titre*/}
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} /> {/* Barre de recherche*/}  
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />  {/* Filtre de carburant*/}
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} /> {/* Filtre d'année*/} 
          </div>
        </div>
        {allCars.length > 0 ? ( // Si des voitures sont disponibles
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} /> // Affiche chaque voiture
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain" /> {/* Indicateur de chargement*/} 
              </div>
            )}
            <ShowMore // Bouton "Afficher plus"
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            /> 
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold"> Oops, no results</h2> {/* Message d'erreur */}
            {/* L'expression {allCars?.message} dans <p>{allCars?.message}</p> utilise l'opérateur d'appel optionnel (?.) en JavaScript, qui permet d'accéder à la propriété message de allCars sans générer d'erreur si allCars est null ou undefined.

Voici comment cela fonctionne :

Si allCars est un objet qui contient une propriété message, alors {allCars?.message} évaluera à la valeur de cette propriété.
Si allCars est null ou undefined, alors {allCars?.message} évaluera à undefined, et aucune erreur ne sera générée.
Dans le contexte de ce code, si une erreur se produit lors de la récupération des voitures (par exemple, si la réponse du serveur contient un message d'erreur), cette ligne permet d'afficher ce message d'erreur sans risquer de générer une erreur JavaScript si allCars est null ou undefined.

C'est une manière concise et sûre d'accéder à une propriété qui pourrait ne pas exister, sans avoir besoin de vérifier explicitement si l'objet lui-même existe.*/}
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
