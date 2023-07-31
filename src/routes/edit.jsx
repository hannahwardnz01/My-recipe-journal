import { useLoaderData, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { COLORS } from '../Colors';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import styled from "styled-components";
import "../css/edit.css"
import {Edit} from "../firebase_setup/Edit"

export default function EditRecipe() {

  const navigate = useNavigate();

  const { recipe, id } = useLoaderData();

  const [ingredient, setIngredient] = useState();
  const [method, setMethod] = useState('');
  const [tag, setTag] = useState('');

  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    difficulty: recipe.difficulty,
    time: recipe.time,
    servings: recipe.servings,
    imageURL: recipe.imageURL,
    favourite: recipe.favourite,
    rating: recipe.rating,
    ingredients: recipe.ingredients,
    method: recipe.method,
    tags: recipe.tags
  });

  const handleIngredientInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleMethodInputChange = (e) => {
    setMethod(e.target.value);
  };

  const handleTagInputChange = (e) => {
    setTag(e.target.value);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      ingredients: [...formData.ingredients, ingredient]
    }));
    setIngredient('');
  };

   const handleAddMethod = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      method: [...formData.method, method]
    }));
    setMethod('');
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      tags: [...formData.tags, tag]
    }));
    setTag('');
  };

  const handleRemoveIngredient = (index) => {
    const updatedList = [...formData.ingredients];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      ingredients: updatedList
    }));
  };

  const handleRemoveMethod = (index) => {
    const updatedList = [...formData.method];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      method: updatedList
    }));
  };

  const handleRemoveTag = (index) => {
    const updatedList = [...formData.tags];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      tags: updatedList
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Edit({params: {recipeID: id, testData: formData}})
    navigate(`/recipes/${id}`)
  };

  return (
    <div className="recipe-form-container">
      <h1 style={{color: COLORS.TeaGreen, lineHeight: 0.3}}>Create a new recipe...</h1>
      <p style={{color: COLORS.TeaGreen}}>Fill out the form below to create a new recipe for your journal.</p>
      <form onSubmit={handleSubmit}>
          <input type="text"name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="difficulty" value={formData.difficulty} placeholder="Difficulty" onChange={handleChange} />
          <input type="text" name="time" value={formData.time} placeholder="Time" onChange={handleChange} />
          <input type="number" name="servings" value={formData.servings} placeholder="Servings" onChange={handleChange} />
          <input type="text" name="imageURL" value={formData.imageURL} placeholder="Image URL" onChange={handleChange} />
          <input type="number" name="rating" value={formData.rating} placeholder="Rating 1-5" onChange={handleChange} />
          <FormControlLabel
            name="favorite"
            label="Favorite"
            control={<Switch />}
            checked={formData.favourite}
            onChange={() => setFormData(prevState => ({ ...prevState, favourite: !prevState.favourite }))}
            style={{display:"flex", flexDirection:"row-reverse", justifyContent:"start", paddingLeft: "10px"}}
          />
          <input
            type="text"
            value={ingredient}
            onChange={handleIngredientInputChange}
            placeholder="Enter ingredient"
          />
          <Button onClick={handleAddIngredient}>Add Ingredient</Button>

          {formData.ingredients.length > 0 && <IngredientsWrapper>
            <ul>
              {formData.ingredients.map((ingredient, index) => (
                <li>
                    {ingredient}
                    <Button onClick={() => handleRemoveIngredient(index)}>X</Button>
                </li>
              ))}
            </ul>
          </IngredientsWrapper>}


          <input
            type="text"
            value={ingredient}
            onChange={handleMethodInputChange}
            placeholder="Enter method"
          />
          <Button onClick={handleAddMethod}>Add a step</Button>

          {formData.method.length > 0 && <IngredientsWrapper>
            <ul>
              {formData.method.map((step, index) => (
                <li>
                    {step}
                    <Button onClick={() => handleRemoveMethod(index)}>X</Button>
                </li>
              ))}
            </ul>
          </IngredientsWrapper>}

          <input
            type="text"
            value={ingredient}
            onChange={handleTagInputChange}
            placeholder="Enter a tag"
          />
          <Button onClick={handleAddTag}>Add a tag</Button>

          {formData.tags.length > 0 && <IngredientsWrapper>
            <ul>
              {formData.tags.map((tag, index) => (
                <li>
                    {tag}
                    <Button onClick={() => handleRemoveTag(index)}>X</Button>
                </li>
              ))}
            </ul>
          </IngredientsWrapper>}

            <button type="submit">Submit</button>
      </form>
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