import aboutusimage from "../../../public/jpegs/aboutimge.jpg";

const AboutUsSection = () => {
  return (
    <div className="w-full  flex flex-col gap-[1.6rem]">
      <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[4rem] font-[700] text-center">
        About Us
      </h2>
      <p className="text-[1.6rem] font-[500] text-left leading-[2rem]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
        commodo libero. Sed interdum lorem non libero aliquet, nec fermentum
        libero consequat. Integer porta, leo nec aliquam sodales, dui dolor
        viverra justo, id vehicula ipsum nulla at nulla. Aliquam posuere ex et
        elit fermentum, sed pharetra libero eleifend. Integer non nisl eget nunc
        malesuada malesuada.
      </p>
      <img
        src={aboutusimage}
        alt="about us image"
        className="h-auto object-contain"
      />
      <p className="text-[1.6rem] font-[500] text-left leading-[2rem]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
        commodo libero. Sed interdum lorem non libero aliquet, nec fermentum
        libero consequat. Integer porta, leo nec aliquam sodales, dui dolor
        viverra justo, id vehicula ipsum nulla at nulla. Aliquam posuere ex et
        elit fermentum, sed pharetra libero eleifend. Integer non nisl eget nunc
        malesuada malesuada. Vivamus eget massa vitae purus rutrum mattis vel
        vel nulla. Sed scelerisque bibendum nulla, non faucibus urna. Vivamus
        vehicula vestibulum felis, eu rhoncus urna tincidunt id. Nullam
        convallis sapien quis ligula condimentum, sit amet ultrices purus
        fringilla. Sed ac odio nec est placerat lacinia.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nulla vel commodo libero. Sed
        interdum lorem non libero aliquet, nec fermentum libero consequat.
        Integer porta, leo nec aliquam sodales, dui dolor viverra justo, id
        vehicula ipsum nulla at nulla. Aliquam posuere ex et elit fermentum, sed
        pharetra libero eleifend. Integer non nisl eget nunc malesuada
        malesuada. Vivamus eget massa vitae purus rutrum mattis vel vel nulla.
        Sed scelerisque bibendum nulla, non faucibus urna. Vivamus vehicula
        vestibulum felis, eu rhoncus urna tincidunt id. Nullam convallis sapien
        quis ligula condimentum, sit amet ultrices purus fringilla. Sed ac odio
        nec est placerat lacinia.
      </p>
    </div>
  );
};

export default AboutUsSection;
