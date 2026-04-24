import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Program from './components/Program'
import Speakers from './components/Speakers'
import Committee from './components/Committee'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#080f28', color: '#e2e8f0' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Program />
        <Speakers />
        <Committee />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
