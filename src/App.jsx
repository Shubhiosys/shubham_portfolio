import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import Navigation from './components/UI/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import ProjectDetail from './components/Projects/ProjectDetail';
import FinalCta from './components/FinalCta/FinalCta';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton/FloatingWhatsAppButton';
import PortfolioAmbient from './components/UI/PortfolioAmbient';
import { projectDetails } from './constants/data';
import { useScrollPerformanceMode } from './hooks/usePortfolio';
import './App.css';

function getCurrentRoute() {
  return window.location.pathname || '/';
}

function getProjectSlug(route) {
  return route.startsWith('/projects/') ? route.replace('/projects/', '') : null;
}

function shouldShowLoader() {
  return sessionStorage.getItem('portfolio-loader-seen') !== 'true';
}

export default function App() {
  const [loading, setLoading] = useState(() => shouldShowLoader());
  const [route, setRoute] = useState(() => getCurrentRoute());
  const [selectedProject, setSelectedProject] = useState(() => getProjectSlug(getCurrentRoute()));
  useScrollPerformanceMode();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  useEffect(() => {
    const handlePopState = () => {
      const newRoute = getCurrentRoute();
      setRoute(newRoute);
      setSelectedProject(getProjectSlug(newRoute));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    setSelectedProject(getProjectSlug(path));
  };

  const openProject = (slug) => {
    navigate(`/projects/${slug}`);
  };

  const backToPortfolio = () => {
    navigate('/');
  };

  const handleLoaderComplete = () => {
    sessionStorage.setItem('portfolio-loader-seen', 'true');
    setLoading(false);
  };

  const isProjectPage = route.startsWith('/projects/') && selectedProject;

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <div className={`app${loading ? ' app--hidden' : ' app--visible'}`}>
        <PortfolioAmbient />
        <Navigation onNavigate={(path) => navigate(path)} />
        <main>
          {isProjectPage ? (
            <ProjectDetail project={projectDetails[selectedProject]} onBack={backToPortfolio} />
          ) : (
            <>
              <Hero />
              <About />
              <Services />
              <Projects onOpenProject={openProject} />
              <FinalCta />
              <Skills />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </div>
    </>
  );
}
