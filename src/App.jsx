import { Footer } from "./components/layout/Footer";
import { Navigation } from "./components/layout/Navigation";
import { AboutWaliyy } from "./sections/AboutWaliyy";
import { CreatorStatement } from "./sections/CreatorStatement";
import { FilmOverview } from "./sections/FilmOverview";
import { FilmViewer } from "./sections/FilmViewer";
import { Hero } from "./sections/Hero";
import { PressContact } from "./sections/PressContact";
import { Story } from "./sections/Story";
import { TextileTransition } from "./sections/TextileTransition";
import { VisualArchive } from "./sections/VisualArchive";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <FilmOverview />
        <Story />
        <FilmViewer />
        <VisualArchive />
        <TextileTransition />
        <CreatorStatement />
        <AboutWaliyy />
        <PressContact />
      </main>
      <Footer />
    </>
  );
}
