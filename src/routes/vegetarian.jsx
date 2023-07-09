import AllGrid from "../components/AllGrid"
import { useLoaderData } from "react-router-dom";

export default function Vegetarian() {
  const recipes = useLoaderData(); 
  return (
    <>
      <AllGrid props={recipes}/>
    </>
  );
  }