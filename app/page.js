import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import Journey      from '@/components/Journey';
import HostingTypes from '@/components/HostingTypes';
import Databases    from '@/components/Databases';
import Platforms    from '@/components/Platforms';
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
        <HostingTypes />
        <Databases />
        <Platforms />
        <AskHostlore />
      </main>
      <Footer />
    </>
  );
}
