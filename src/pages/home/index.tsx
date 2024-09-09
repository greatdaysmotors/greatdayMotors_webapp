import MainLayout from "@layouts/MainLayout";
import HomePage from "@components/home";
// import useAxiosInterceptor from "@hooks/useAxiosInterceptor";

const Home = () => {
  // useAxiosInterceptor();
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};

export default Home;
