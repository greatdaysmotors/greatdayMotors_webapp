import { Button, Input, Modal, Rate } from "antd";
import React, { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import car from "../../../public/pngs/cartrip.png";
import useStore from "../../store";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@api/index";
import axios from "axios";
import useAuthToken from "@hooks/useAuthToken";
import { IoIosCloseCircleOutline } from "react-icons/io";

type TripProps = {
  imageSrc?: string;
  altText?: string;
  route: string;
  time: string;
  price: string;
  tripStatus?: string;
  onClick?: () => void;
};

const Trip: React.FC<TripProps> = ({
  imageSrc = car,
  altText = "car image",
  route,
  time,
  price,
  tripStatus = "Unknown",
  onClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedTrip = useStore((state) => state.selectedTrip);
  // console.log("selectedTrip", selectedTrip);

  const userToken = useAuthToken();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleErrorModalCancel = () => {
    setIsErrorModalOpen(false);
  };

  const reviewMutation = useMutation({
    mutationFn: async (reviewData: {
      trip: string;
      review: string;
      starRating: number;
    }) => {
      const response = await axios.post(
        `${BASE_URL}/v1/passenger/review`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("reviewMutation", response);
      return response.data;
    },
    onSuccess: () => {
      setIsModalOpen(false);
      setIsReviewModalOpen(true);
      setRating(0);
      setFeedback("");
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      if (axios.isAxiosError(error)) {
        // Safely access the response property
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while submitting the review."
        );
      } else {
        // Handle other non-Axios errors
        setErrorMessage("An unexpected error occurred.");
      }
      setIsErrorModalOpen(true);
    },
  });

  const showReviewModal = () => {
    if (rating > 0 && feedback.trim()) {
      if (selectedTrip?._id) {
        reviewMutation.mutate({
          trip: selectedTrip?.availableTrip?._id,
          review: feedback,
          starRating: rating,
        });
      }
    }
  };

  const handleReviewCancel = () => {
    setIsReviewModalOpen(false);
  };

  const ratingLabels: { [key: number]: string } = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const isButtonDisabled = rating === 0 || feedback.trim() === "";

  return (
    <div
      onClick={onClick}
      style={{
        boxShadow: "0px 0px 10px 0px #22222240",
      }}
      className="px-[0.6rem] py-[1.2rem] md:py-[3rem] md:px-[2rem] lg:py-[3.5rem] lg:px-[3.5rem] rounded-[1rem] flex items-start gap-[1rem] justify-between w-full"
    >
      <div className="flex w-full items-start gap-[0.2rem] md:gap-[0.8rem]">
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={altText}
            className="h-[2.4rem] lg:h-[4rem] w-auto"
          />
        </div>
        <div className="flex flex-col ">
          <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem] font-[700]">
            {route}
          </p>

          <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem]  font-[500]">
            {time}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-[0.8rem] w-[50%] lg:w-[30%]">
        <h6 className="text-[1.4rem] md:text-[1.6rem] lg:text-[2rem]  font-[700]">
          {price}
        </h6>

        {tripStatus === "completed" ? (
          <button
            onClick={showModal}
            className="bg-primaryColor text-[#ffffff] text-[12px] md:text-[16px] py-3 px-4 lg:px-5 rounded-[10px] cursor-pointer"
          >
            Write Review
          </button>
        ) : tripStatus === "ongoing" ? (
          <button className="bg-[#cccccc] text-[#ffffff] text-[12px] md:text-[16px] py-3 px-4 lg:px-5 rounded-[10px] cursor-not-allowed opacity-50">
            Write Review
          </button>
        ) : null}

        {/* Write Review Modal */}
        <Modal
          title={""}
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          className="review-modal"
        >
          <div className="text-center">
            <h2 className="text-[18px] lg:text-[20px] font-[700] text-center">
              Write a Review
            </h2>
            <p className="text-[14px] lg:text-[18px] mt-[3rem] text-[#666666]">
              How was your experience?
            </p>
            <p className="text-[14px]  lg:text-[18px] mb-[1rem] text-[#666666]">
              Your review will help us make it better.
            </p>
            <div className="mb-[1rem] ">
              <p className="text-[14px]  lg:text-[18px] font-[500] text-[#333333]">
                Tap to rate:
              </p>
              <Rate
                value={rating}
                onChange={(value) => setRating(value)}
                className="custom-rate"
                tooltips={Object.values(ratingLabels)}
              />
              <div>
                {rating > 0 && (
                  <span className="text-[14px]  lg:text-[16px] font-[500] text-[#333333]">
                    {ratingLabels[rating]}
                  </span>
                )}
              </div>
            </div>
            <div className="md:px-20 mt-8">
              <Input.TextArea
                rows={4}
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mb-[1rem]"
              />
              <Button
                type="primary"
                onClick={showReviewModal}
                className="w-full py-8 text-[16px] mt-[20px]"
                disabled={isButtonDisabled}
                loading={reviewMutation.isPending}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal
          title={""}
          open={isReviewModalOpen}
          onCancel={handleReviewCancel}
          footer={null}
          centered
          className="feedbacksuccess-modal"
        >
          <div className="flex flex-col justify-center items-center w-full md:w-[45rem]">
            <IoCheckmarkCircleOutline size={100} color="#0A8917" />
            <div className="flex flex-col">
              <h2 className="text-[2rem] lg:text-[20px] font-[700]  text-center text-brandBlack">
                Review Sent
              </h2>
              <h4 className="text-[18px] lg:w-[32rem] lg:mx-auto font-[400]   text-center text-brandBlack">
                Thank you for your time
              </h4>
            </div>
          </div>
        </Modal>

        {/* Error Modal */}
        <Modal
          title=""
          open={isErrorModalOpen}
          onCancel={handleErrorModalCancel}
          footer={null}
          centered
          className="failedfeedback-modal"
        >
          <div className="flex flex-col justify-center items-center w-full md:w-[45rem]">
            <IoIosCloseCircleOutline size={100} color="#0A8917" />
            <div className="flex flex-col">
              <h2 className="text-[2rem] lg:text-[20px] font-[700]  text-center text-brandBlack">
                Review Failed!
              </h2>
              <p className="text-[14px] lg:text-[16px]">{errorMessage}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Trip;
