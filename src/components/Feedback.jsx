import React, { useEffect } from "react";
import UserFeedbackDisplay from "./UserFeedbackDisplay";
import FeedbackForm from "./FeedbackForm";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
const Feedback = () => {
  const [isFeedbackAdded, setIsFeedbackAdded] = React.useState(false);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const checkFeedbackAdded = async () => {
    const { data } = await axios.get("/api/feedback_added");
    if (data.success) setIsFeedbackAdded(true);
  };
  const getAllFeedbacks = async () => {
    try {
      const { data } = await axios.get("/api/feedbacks");
      if (data.success) {
        setFeedbacks(data.feedbacks);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkFeedbackAdded();
    getAllFeedbacks();
  }, []);
  return (
    <div className="h-full md:h-[30rem] w-full my-10 flex flex-col md:flex-row overflow-hidden">
      <div
        className={`${
          isFeedbackAdded
            ? "hidden"
            : "flex flex-col bg-slate-50 py-6 md:py-10 w-full md:flex-1 h-full"
        } `}
      >
        <FeedbackForm />
      </div>
      <div className="md:flex-1 w-full h-full bg-hello-text bg-cover bg-no-repeat bg-center flex items-center justify-center py-6 md:py-0">
        <div className="flex items-center justify-center flex-col gap-2 md:gap-4">
          <FormatQuoteIcon
            sx={{
              fontSize: isSmallScreen ? "2.5rem" : "3rem",
              color: "#f39c12",
            }}
          />
          {!loading && feedbacks.length > 0 && (
            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={1}
              autoplay={{ delay: 500 }}
              navigation
              className="mySwiper"
            >
              {feedbacks?.map((feedback) => (
                <SwiperSlide key={feedback._id}>
                  <UserFeedbackDisplay feedback={feedback} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
