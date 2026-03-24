import { Header } from "../component/Header/Header";
import { Filter } from "../component/Filter/Filter";
import Content from "../component/Content/Content";
import  Footer  from "../component/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Filter />
      <Content />
      <Footer />
    </>
  );
}
