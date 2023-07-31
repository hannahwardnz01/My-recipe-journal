import styled from "styled-components";
import { Link} from "react-router-dom";
import { COLORS } from "../Colors"
import { getRating } from "../routes/recipe";

function ExploreCard(props) {

  const recipes = props.props.recipes
  const tagNames = props.props.tagNames
  const id = props.props.id

  function getRecipeItem(recipe){
    return( 
      <Link to={`../recipes/${recipe.id}`}> 
        <SingleRecipe>
            <img src={recipe.data.imageURL} alt={recipe.data.title}/>
          <RecipeInfo>
            <p style={{textDecorationLine: "none"}}>{recipe.data.title}</p>
            <Rating>
              {getRating(recipe.data)}
            </Rating>
          </RecipeInfo>
        </SingleRecipe>
      </Link>
      )
  }

    return (
        <Wrapper>
          <h2>You might also like...</h2>
          {recipes.map((recipe) => {
            if(recipe.data == undefined || recipe.data.tags == undefined || tagNames == undefined){return}
            const contains = recipe.data.tags.some(element => {
              console.log(element)
              console.log(tagNames)
              return tagNames.includes(element);
            });
            if(contains && recipe.id!=id){
                return getRecipeItem(recipe);}
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  background: ${COLORS.UraniunBlue};
  margin-left: 200px;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 280px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Rating = styled.div`
  font-size: 20px;
  padding-right: 20px;
`

const SingleRecipe = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  background: white;
  margin-bottom: 10px;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  a:link{
    text-decoration: none;
    display: flex
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`

const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  line-height: 0;
`

export default ExploreCard;
