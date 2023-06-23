import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import UserComment from "./UserComment";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "../redux/actions/productAction";

const PizzaInformation = ({ id, pizza }) => {
  const [toggleState, setToggleState] = useState(1);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { reviews } = useSelector((state) => state.allReviews);

  const dispatch = useDispatch();

  const toggleTag = (index) => {
    setToggleState(index);
  };

  const handleCommentBox = (pizza) => {
    setIsModelOpen(true);
  };

  useEffect(() => {
    dispatch(getProductReviews(id));
  }, [dispatch, id]);

  return (
    <section className="relative py-10 lg:px-20  md:p-10">
      <div className="lg:w-4/5 px-4 w-full">
        <div className="w-full border-b-2 border-dashed border-golden flex justify-between sm:justify-start sm:gap-20">
          <p
            onClick={() => toggleTag(1)}
            className={`${
              toggleState === 1 ? "tab-active" : ""
            } uppercase  tracking-wide text-golden text-sm sm:text-base font-medium hover:text-red-800 cursor-pointer`}
          >
            Description
          </p>
          <p
            onClick={() => toggleTag(2)}
            className={`${
              toggleState === 2 ? "tab-active" : ""
            } uppercase  tracking-wide text-golden text-sm sm:text-base font-medium hover:text-red-800 cursor-pointer`}
          >
            Additional Information
          </p>
          <p
            onClick={() => toggleTag(3)}
            className={`${
              toggleState === 3 ? "tab-active" : ""
            } uppercase  tracking-wide text-golden text-sm sm:text-base font-medium hover:text-red-800 cursor-pointer`}
          >
            Reviews{" "}
            {reviews && pizza.numOfReviews > 0 && `(${pizza.numOfReviews})`}
          </p>
        </div>
        <div className="w-full pt-6 content-tabs flex">
          <div
            className={`${
              toggleState === 1 ? "content active-content" : "content"
            } text-gray-600 font-light text-sm sm:text-base`}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            maiores sit. Non aliquam sapiente debitis molestiae ea quae ducimus,
            dolores nostrum beatae. Suscipit libero autem laborum, illum alias
            perspiciatis magni! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolores, minus minima quam, deleniti id maxime
            amet dolorum at nobis, delectus placeat veritatis aut dignissimos
            adipisci maiores. Quia sed aspernatur saepe.
          </div>
          <div
            className={`${
              toggleState === 2 ? "content active-content" : "content"
            }`}
          >
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <span className="uppercase text-golden text-sm sm:text-base font-medium tracking-wide">
                  Weight
                </span>
                <span className="uppercase text-golden text-sm sm:text-base font-medium tracking-wide">
                  Dimensions
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-sm sm:text-base">
                  2.5 kg
                </span>
                <span className="text-gray-500 text-sm sm:text-base">
                  45 x 45 x 1.5 cm
                </span>
              </div>
            </div>
          </div>
          <div
            className={`${
              toggleState === 3 ? "content active-content" : "content"
            } `}
          >
            {pizza && pizza.numOfReviews > 0 && (
              <h1 className="uppercase text-golden pb-6 font-normal tracking-wide text-sm sm:text-base">
                {pizza.numOfReviews} Reviews for {pizza.name}
              </h1>
            )}
            <div className="flex flex-col gap-3">
              {reviews && reviews.length === 0 ? (
                <h1 className="text-gray-500 font-normal text-sm sm:text-base">
                  No reviews yet
                </h1>
              ) : (
                reviews.map((review) => (
                  <UserComment key={review._id} review={review} />
                ))
              )}
              <div
                onClick={handleCommentBox}
                className="border-2 border-red-600 text-xs font-medium sm:text-sm rounded w-max uppercase text-red-600 tracking-wide px-2 sm:px-4 py-2 mt-3 sm:mt-6 hover:text-white hover:bg-red-600 cursor-pointer"
              >
                Post a review
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <CommentBox onClose={() => setIsModelOpen(false)} pizza={pizza} />
      )}
    </section>
  );
};

export default PizzaInformation;
