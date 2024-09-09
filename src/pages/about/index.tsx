import AboutUsSection from "@components/about/AboutUs";
import OurVisionSection from "@components/about/OurVision";
import ContactUsSection from "@components/home/ContactUs";
import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <MainLayout>
      <Container>
        <div className="py-[1.6rem] w-full flex flex-col gap-[1.6rem]">
          <AboutUsSection />
          <OurVisionSection />
        </div>
      </Container>
      <ContactUsSection />
    </MainLayout>
  );
};

export default AboutUs;
