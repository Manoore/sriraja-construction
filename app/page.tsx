import About from "@/components/About";
import BuildStages from "@/components/BuildStages";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HousePlans from "@/components/HousePlans";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Quality from "@/components/Quality";
import SectionTabs from "@/components/SectionTabs";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <div className="draft">
        <div className="wrap">Draft: projects, figures and contact details are samples. Replace them before launch.</div>
      </div>
      <Header />
      <main id="home">
        <HeroSlider />
        <SectionTabs />
        <About />
        <BuildStages />
        <Projects />
        <HousePlans />
        <Services />
        <Process />
        <Quality />
        <Faq />
      </main>
      <Contact />
      <Footer />
      <FloatingActions />
    </>
  );
}
