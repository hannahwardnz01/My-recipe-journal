import TagGrid from "../components/TagGrid"
import { useLoaderData } from "react-router-dom";

export default function Vegetarian() {
  const recipes = useLoaderData(); 
  return (
    <>
      <TagGrid props={{recipes: recipes, tagName: "vegetarian"}}/>
    </>
  );
}