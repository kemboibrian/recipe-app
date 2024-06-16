import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { API_KEY } from "../assets/API_KEY";
import { Skeleton } from "@mui/material";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();
  console.log(params);

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${name}`
    );
    const recipe = await data.json();
    setCuisine(recipe.results);
    console.log(cuisine);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  if (cuisine.length === 0) {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="cuisine-skeleton">
        {number.map((data) => (
          <Skeleton
            variant="rounded"
            width={300}
            height={200}
            key={data}
            animation="wave"
            className="cuisine-skltn"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="cuisine-container">
      {cuisine.map((data) => (
        <motion.div
          key={data.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RecipeCard data={data} />
        </motion.div>
      ))}
    </div>
  );
};

export default Cuisine;
