import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/splide/dist/css/splide.min.css";

function FavouritesSlider(props) {

  return (
    <div>
      <Wrapper>
        <h1 style={{fontWeight: "lighter"}}>Favourites</h1>
        {props.props.length === 0 && !isLoading ? (
          <h4>Add a recipe to favourites to see it here!</h4>
        ) : (
          <Splide
            options={{
              perPage: 4,
              pagination: false,
              drag: "free",
              gap: "2rem",
            }}
          >
            {props.props.map((recipe) => {
              if(recipe.data == undefined){return}
              const recipeData = recipe.data;
              const id = recipe.id;
              if(recipeData.favourite){
              return (
                <SplideSlide>
                  <Link to={`/recipes/${id}`}>
                    <Card>
                        <p>{recipeData.title}</p>
                        <img src={recipeData.imageURL} alt={recipeData.title} style={{boxShadow: "0 8px 8px -8px grey"}}/>
                        <Gradient />
                    </Card>
                    </Link>
                </SplideSlide>
              )} 
            })}
          </Splide>
        )}
      </Wrapper>
    </div>
  );
}


const Wrapper = styled.div`
  margin: 0.4rem 1rem;
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    left: 0;
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
  SplideSlide {
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
export default FavouritesSlider;