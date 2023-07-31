import styled from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { CgTag } from "react-icons/cg";


function TagGrid(props) {  

const recipes = props.props.recipes
const tagName = props.props.tagName

  function getGridRecipe(recipe) {
    const recipeData = recipe.data;
    const id = recipe.id;
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Link to={`/recipes/${id}`}>
        <Card>
          <p>{recipeData.title}</p>
          <img src={recipeData.imageURL} alt={recipeData.title}/>
          <Gradient />
        </Card>
        </Link>
      </Grid>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Wrapper>
        <h1 style={{fontWeight: "lighter"}}><CgTag/>{tagName}</h1>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {recipes.map((recipe) => {
            if(recipe.data == undefined || recipe.data.tags == undefined){return}
            if(recipe.data.tags.includes(tagName)){
                return getGridRecipe(recipe)};
          })}
        </Grid>
      </Wrapper>
    </Box>
  );
}

  const Wrapper = styled.div`
  margin: 0.4rem 1rem 0.4rem 1rem;
  justify-content: space-between;
  width: 98%;
`;

const Card = styled.div`
  min-width: 10rem;
  min-height: 15rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    padding-top: 120px;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;
export default TagGrid;