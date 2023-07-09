import AllGrid from "../components/AllGrid"
import FavoritesSlider from "../components/FavoritesSlider"
import { useLoaderData } from "react-router-dom";

export default function Homepage() {
  const recipes = useLoaderData(); 
  console.log(recipes)
  return (
    <>
      <FavoritesSlider props={recipes}/>
      <AllGrid props={recipes}/>
    </>
    );
}