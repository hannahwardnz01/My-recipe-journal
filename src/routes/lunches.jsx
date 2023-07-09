import FavoritesSlider from "../components/FavoritesSlider"
import { useLoaderData } from "react-router-dom";

export default function Lunches() {
  const recipes = useLoaderData(); 
  console.log(recipes)
  return (
    <>
      <FavoritesSlider props={recipes}/>
    </>
  );
  }