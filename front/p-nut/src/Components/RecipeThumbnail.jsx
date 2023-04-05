import React, { useState, useEffect } from "react";
import FoodModal from "../UI/FoodModal";
import axios from "axios";
import getFoodAPI from "../api/getFoodAPI";
// import dotenv from "dotenv";

const RecipeThumbnail = (props) => {
  const { imgPath, title, kcal, mainIngredients, time, foodId, userEmail } =
    props;

  // youtubeData가 존재하면 true로 만들어 열림
  const [youtubeData, setYoutubeData] = useState();
  const [foodData, setFoodData] = useState(null);
  // youtube api key
  // require("dotenv").config();
  // const key = process.env.YOUTUBE_KEY;

  // const [userEmail, setUserEmail] = useState("admin@ssafy.com");
  // getFoodAPI를 위한 userEmail 가져오기
  // const state = JSON.parse(localStorage.getItem("persist:root"));
  // if (state) {
  //   const authentication = JSON.parse(state.auth);
  //   setUserEmail(authentication.authentication.email);
  // }
  // console.log("userEmail: ", userEmail);

  const openModal = (event) => {
    // event.stopPropagation();
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${title}레시피&type=video&videoDefinition=high&key=AIzaSyCI8t8M1ADPjcTTAuIOs3G2w-Nev9hXwRs`
      )
      .then((res) => {
        setYoutubeData(res.data.items);
      })

      .catch((err) => {
        console.log("youtube error: ", err);
      });
  };

  // getFoodAPI
  const getFood = async () => {
    try {
      // foodID 바꾸기
      const response = await getFoodAPI(foodId, userEmail);

      setFoodData(response.data.data);
      openModal();
    } catch (err) {
      console.log("error: ", err);
    }
  };

  // useEffect(() => {
  //   getFood();
  // }, []);

  const closeModal = (event) => {
    // event.stopPropagation();
    setYoutubeData(null);
    setFoodData(null);
  };

  return (
    <div>
      {youtubeData && (
        <FoodModal
          close={closeModal}
          searchResult={youtubeData}
          food={foodData}
        />
      )}
      <div
        className="cursor-pointer bg-cover h-270 bg-center bg-no-repeat rounded-sm"
        onClick={getFood}
        style={{ backgroundImage: `url(${imgPath})` }}
      />
      <div className="flex items-end my-10 space-x-5 text-end truncate">
        <p className="text-xl font-bold">{title}</p>
        <p className="bg-#FF6B6C/70 text-end text-white px-10 py-3 rounded-full ">
          {Math.round(kcal)} kcal
        </p>
      </div>
      <div className="text-lg text-gray-700">주 재료 : {mainIngredients}</div>
      <div className="text-lg text-gray-700">예상 조리시간 : {time}분</div>
    </div>
  );
};

export default RecipeThumbnail;
