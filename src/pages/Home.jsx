import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Tools from '../components/Tools'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-bg text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Tools />
      <Contact />
      <Footer />
    </div>
  )
}
