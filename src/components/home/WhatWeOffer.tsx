import Container from "@layouts/Container";
import offerimg1 from "../../../public/pngs/offer_img.png";
import OfferCard from "./OfferCard";

const WhatWeOffer = () => {
  return (
    <Container>
      <div className="py-[2.4rem] md:py-[4rem]  lg:py-[8rem] flex flex-col justify-center items-center scroll-container overflow-scroll">
        <p className="text-[1.2rem] lg:text-[1.4rem] text-primaryColor font-[700]">
          Our Services
        </p>
        <h4 className="text-[2rem] md:text-[2.4rem] lg:text-[3.2rem] font-[700]">
          What We Offer
        </h4>
        <div className="scroll-container overflow-scroll w-full">
          <div className="flex scroll-container overflow-scroll w-full gap-[1rem] lg:gap-[4rem]">
            <OfferCard
              link="/book-ticket"
              offerimg={offerimg1}
              title="Book Ticket"
              description="Enjoy the Convenience of Booking Your Ticket with Ease and Comfort, Right from Your Own Home"
            />
            <OfferCard
              link="/hire-service"
              offerimg={offerimg1}
              title="Hire Service"
              description=" Enjoy the Convenience of Booking Your Ticket with Ease and Comfort, Right from Your Own Home"
            />
            <OfferCard
              link="/reshedule-ticket"
              offerimg={offerimg1}
              title="Reshedule Ticket"
              description=" Enjoy the Convenience of Booking Your Ticket with Ease and Comfort, Right from Your Own Home"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhatWeOffer;
