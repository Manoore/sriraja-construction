import About, { Intro } from "@/components/About";
import BuildStages from "@/components/BuildStages";
import Contact from "@/components/Contact";
import Estimator from "@/components/Estimator";
import Faq from "@/components/Faq";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HousePlans from "@/components/HousePlans";
import HowWeWork from "@/components/HowWeWork";
import { LogoMark } from "@/components/Logo";
import { SmoothScroll } from "@/components/Motion";
import Projects from "@/components/Projects";
import SectionTabs from "@/components/SectionTabs";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="preloader" aria-hidden="true"><LogoMark size={72} /></div>
      <Header />
      <main id="home">
        <HeroSlider />
        <Intro />
        <SectionTabs />
        <About />
        <Projects />
        <BuildStages />
        <HousePlans />
        <Estimator />
        <HowWeWork />
        <Faq />
        <Gallery />
      </main>
      <Contact />
      <Footer />
      <FloatingActions />
    </SmoothScroll>
  );
}
