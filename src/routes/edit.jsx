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
  console.log("here")
    //const formData = await request.formData();
    //console.log(formData)
    Edit({params})
    console.log("update done?")
    return redirect("/homepage")
}

export default function EditRecipe() {
  const { recipe, id } = useLoaderData();

  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const [method, setMethod] = useState('');
  const [methodList, setMethodList] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    time: '',
    servings: '',
    imageURL: '',
    favourite: false,
    ingredients: [],
    method: [],
    rating: ''
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
    if (ingredient.trim() !== '') {
      setIngredientList([...ingredientList, ingredient]);
      setIngredient('');
    }
    setFormData((prevState) => ({
      ...prevState,
      ingredients: ingredientList
    }));
  };

  const handleRemoveIngredient = (index) => {
    const updatedList = [...ingredientList];
    updatedList.splice(index, 1);
    setIngredientList(updatedList);
    setFormData((prevState) => ({
      ...prevState,
      ingredients: ingredientList
    }));
  };

  const handleAddMethod= (e) => {
    e.preventDefault();
    if (method.trim() !== '') {
      setMethodList([...methodList, method]);
      setMethod('');
    }
    setFormData((prevState) => ({
      ...prevState,
      method: methodList
    }));
  };

  const handleRemoveMethod = (index) => {
    const updatedList = [...methodList];
    updatedList.splice(index, 1);
    setMethodList(updatedList);
    setFormData((prevState) => ({
      ...prevState,
      method: methodList
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
      <form method="post">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <label>
          <input type="text" name="description" placeholder="Description" value={recipe.description} onChange={handleChange} />
        </label>
          <input type="text" name="difficulty" value={recipe.difficulty} placeholder="Difficulty" onChange={handleChange} />
          <input type="text" name="time" value={recipe.time} placeholder="Time" onChange={handleChange} />
          <input type="number" name="servings" value={recipe.servings} placeholder="Servings" onChange={handleChange} />
          <input type="text" name="imageURL" value={recipe.imageURL} placeholder="Image URL" onChange={handleChange} />
          <FormControlLabel
            label="Favorite"
            control={<Switch />}
            checked={recipe.favourite}
            onChange={() => setFormData(prevState => ({ ...prevState, favourite: !prevState.favourite }))}
            style={{display:"flex", flexDirection:"row-reverse", justifyContent:"start", paddingLeft: "10px"}}
          />
          <input type="number" name="rating" value={recipe.rating} placeholder="Rating 1-5" onChange={handleChange} />
        <div>
        <input
          type="text"
          value={ingredient}
          onChange={handleIngredientInputChange}
          placeholder="Enter ingredient"
        />
        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
        {ingredientList.length > 0 && <IngredientsWrapper>
          <ul>
            {ingredientList.map((ingredient, index) => (
              <li>
                  {ingredient}
                  <Button onClick={() => handleRemoveIngredient(index)}>X</Button>
              </li>
            ))}
          </ul>
        </IngredientsWrapper>}
        </div>
        <div>
        <input
          type="text"
          value={method}
          onChange={handleMethodInputChange}
          placeholder="Enter steps"
        />
        <Button onClick={handleAddMethod}>Add step</Button>
        {methodList.length > 0 && <IngredientsWrapper>
          <ul>
            {methodList.map((step, index) => (
              <li>
                  {step}
                  <Button onClick={() => handleRemoveMethod(index)}>X</Button>
              </li>
            ))}
          </ul>
        </IngredientsWrapper>}
        </div>
      </form>
      <Form method="post">
            <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

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