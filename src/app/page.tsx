import { Header } from "../components/Header/Header";
import { Content } from "../components/Content/Content";
import { Footer } from "../components/Footer/Footer";

import "./globals.css";

export default function Home() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
