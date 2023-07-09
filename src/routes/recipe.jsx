import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { COLORS } from "../Colors"
import { useLoaderData, Form, Link } from "react-router-dom";
import ExploreCard from "../components/ExploreStrip";

export function getRating(recipe){
    if(recipe.rating === "1"){
        return <Rating> <AiFillStar/> <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/></Rating>
    }
    else if(recipe.rating === "2"){
        return <Rating> <AiFillStar/> <AiFillStar/> <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/></Rating>
    }
    else if(recipe.rating === "3"){
        return <Rating> <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiOutlineStar/> <AiOutlineStar/></Rating>
    }
    else if(recipe.rating === "4"){
        return <Rating> <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiOutlineStar/> </Rating>
    }
    else if(recipe.rating === "5"){
        return <Rating> <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiFillStar/> </Rating>
    }

}

function Recipe(){
    const { recipe, id, recipes } = useLoaderData();

    console.log(recipe)

    if(recipe == undefined){return}
    return(
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Card className="recipeCard">
                <img src={recipe.imageURL} alt={recipe.title} />
                <TitleWrapper>
                    <h1>{recipe.title}</h1>
                    <Rating>
                        {getRating(recipe)}
                    </Rating>
                </TitleWrapper>
                <DetailsWrapper>
                    <p>Cook time: {recipe.time}</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                    <p>Servings: {recipe.servings}</p>
                </DetailsWrapper>
                <p style={{fontSize: "18px"}}>{recipe.description}</p>
                <IngredientsWrapper>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((item) => {
                        return <li>{item}</li>
                    })}
                </ul>
                </IngredientsWrapper>
                <h2 style={{marginBottom: 0}}>Method</h2>
                <ol style={{lineHeight: "2"}}>
                    {recipe.method.map((item) => {
                        return <li>{item}</li>
                    })}
                </ol>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                    if (
                        !confirm(
                        "Please confirm you want to delete this record."
                        )
                    ) {
                        event.preventDefault();
                    }
                    }}
                >
                    <button type="submit">Delete</button>
                </Form>
                <Link to="edit">
                    <button type="button">
                        Edit
                    </button>
                </Link>
            </Card>
            <ExploreCard props={recipes}/>
        </div>
    )
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    font-family: 'Roboto Slab', serif;
    width: 600px;
    font-size: 20px;
    h1 {
        line-height: .5;
    }
    p {
        padding-top: 0px;
    }
    img {
        border-radius: 0.4rem;
        width: 400px;
        height: 400px;
        object-fit: cover;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    `
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

const Rating = styled.div`
  padding-left: 20px;
  padding-top: 13px;
  font-size: 20px;
`

const DetailsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    line-height: 0.2;
    padding-right: 60px;

`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    allign-items: center;
`

export default Recipe;