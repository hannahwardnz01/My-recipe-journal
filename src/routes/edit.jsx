import { useLoaderData, redirect, useNavigate, useSubmit, Form, Navigate
} from "react-router-dom";
import { useState } from 'react';
import { COLORS } from '../Colors';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import styled from "styled-components";
import "../css/edit.css"
import {Edit} from "../firebase_setup/Edit"

export async function action({ request, params }) {
    let formData = await request.formData();
    console.log(formData.get("favorite"))
    console.log(formData.get("rating"))
    console.log(formData)
    // Edit({params: {params.recipeID, formData}})
    // console.log("update done?")
    // return redirect("/homepage")
}

export default function EditRecipe() {
  const { recipe, id } = useLoaderData();

  const [ingredient, setIngredient] = useState();

  const [method, setMethod] = useState('');

  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    difficulty: recipe.difficulty,
    time: recipe.time,
    servings: recipe.servings,
    imageURL: recipe.imageURL,
    favourite: recipe.favourite,
    ingredients: recipe.ingredients,
    method: recipe.method,
    rating: recipe.rating
  });

  const handleIngredientInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleMethodInputChange = (e) => {
    console.log(e.target.value)
    setMethod(e.target.value);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      ingredients: [...formData.ingredients, ingredient]
    }));
    setIngredient('');
  };

  const handleRemoveIngredient = (index) => {
    const updatedList = [...ingredientList];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      ingredients: updatedList
    }));
  };

  const handleAddMethod= (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      method: [...formData.method, method]
    }));
    setMethod('');
  };

  const handleRemoveMethod = (index) => {
    const updatedList = [...formData.method];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      method: updatedList
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="recipe-form-container">
      <h1 style={{color: COLORS.TeaGreen, lineHeight: 0.3}}>Create a new recipe...</h1>
      <p style={{color: COLORS.TeaGreen}}>Fill out the form below to create a new recipe for your journal.</p>
      <Form method="post">
          <input type="text"name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="difficulty" value={formData.difficulty} placeholder="Difficulty" onChange={handleChange} />
          <input type="text" name="time" value={formData.time} placeholder="Time" onChange={handleChange} />
          <input type="number" name="servings" value={formData.servings} placeholder="Servings" onChange={handleChange} />
          <input type="text" name="imageURL" value={formData.imageURL} placeholder="Image URL" onChange={handleChange} />
          <FormControlLabel
            name="favorite"
            label="Favorite"
            control={<Switch />}
            checked={formData.favourite}
            onChange={() => setFormData(prevState => ({ ...prevState, favourite: !prevState.favourite }))}
            style={{display:"flex", flexDirection:"row-reverse", justifyContent:"start", paddingLeft: "10px"}}
          />
          <input type="number" name="rating" value={formData.rating} placeholder="Rating 1-5" onChange={handleChange} />
          <br />
            <br />
            <button>Submit</button>
      </Form>
    </div>
  );
}

//notes: console.log(formData.get("favorite")) returns on/null. 
//all the form parts work so far but need to try the method and ingredietns part. 

const IngredientsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: ${COLORS.UraniunBlue};
    margin-top: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    ul {
        columns: 3;
    }
    li{
        margin-right:20px;
        list-style-type: square;
    }
    h2 {
        line-height: 0.5;
        padding-left: 20px;
        margin-bottom: 0;
    }
`