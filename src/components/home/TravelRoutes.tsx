import Container from "@layouts/Container";
import routesimage from "../../../public/pngs/travel_img1.png";
import routesimag2 from "../../../public/pngs/traveiimg2.png";

// Define the routes with random start and end points
const routePairs = [
  { id: 1, src: routesimage, alt: "travel route image", start: "Okota", end: "Benin" },
  { id: 2, src: routesimag2, alt: "travel route image", start: "Owerri", end: "Portharcourt" },
  { id: 3, src: routesimage, alt: "travel route image", start: "Sapele", end: "Warri" },
  { id: 4, src: routesimag2, alt: "travel route image", start: "Ughelli", end: "Onitsha" },
  { id: 5, src: routesimag2, alt: "travel route image", start: "Asaba", end: "Portharcourt" },
  { id: 6, src: routesimage, alt: "travel route image", start: "Onitsha", end: "Benin" },
  { id: 7, src: routesimag2, alt: "travel route image", start: "Warri", end: "Owerri" },
  { id: 8, src: routesimage, alt: "travel route image", start: "Portharcourt", end: "Sapele" },
  { id: 9, src: routesimage, alt: "travel route image", start: "Benin", end: "Okota" }
];

const TravelRoutes = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full py-[2.4rem] md:py-[4rem] lg:py-[8rem]">
        <p className="text-[1.2rem] lg:text-[1.4rem] text-primaryColor font-[700]">
          Our Routes
        </p>
        <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[3.2rem] font-[700] text-brandBlack text-center lg:text-left">
          Check Out Our Popular Travel Routes
        </h2>
        <div className="w-full mt-[2rem] flex justify-center items-center">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-[1.6rem] scroll-container overflow-scroll w-[100%]">
            {routePairs.map(route => (
              <div
                key={route.id}
                className="relative w-[16.8rem] h-[12.8rem] md:w-full md:h-[20rem] lg:w-full lg:h-[35rem] 2xl:w-[37rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer"
              >
                <img
                  src={route.src}
                  alt={route.alt}
                  className="w-full h-full rounded-[0.8rem] object-cover"
                />
                <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                  {route.start} ==&gt; {route.end}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TravelRoutes;
