import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import Journey      from '@/components/Journey';
import Visualizer   from '@/components/Visualizer';
import HostingTypes from '@/components/HostingTypes';
import Databases    from '@/components/Databases';
import Platforms    from '@/components/Platforms';
import Quiz         from '@/components/Quiz';
import LiveDemo     from '@/components/LiveDemo';
import AskHostlore  from '@/components/AskHostlore';
import Footer       from '@/components/Footer';
import ScrollUI     from '@/components/ScrollUI';

export default function Home() {
  return (
    <>
      <ScrollUI />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Visualizer />
        <HostingTypes />
        <Databases />
        <Platforms />
        <Quiz />
        <LiveDemo />
        <AskHostlore />
      </main>
      <Footer />
    </>
  );
}
