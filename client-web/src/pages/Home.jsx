import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import StatsSection from '../components/StatsSection';
import PortfolioSection from '../components/PortfolioSection';
import ProcessSection from '../components/ProcessSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const Home = () => {
   return (
      <div className="bg-black min-h-screen selection:bg-[#C9FF31] selection:text-black">
         <HeroSection />
         <StatsSection />
         <PortfolioSection />
         <ServicesSection />
         <ProcessSection />
         <TeamSection />

         {/* Contact CTA Section */}
         <section className="py-20 px-6 md:px-10 bg-transparent">
            <div className="max-w-7xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden shadow-2xl rounded-[40px] border-white/5 bg-white/5">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9FF31]/5 rounded-full blur-[100px]" />
               <div className="badge mb-8 bg-black/40 border-white/10">
                  <div className="badge-dot" />
                  CONTACT US
               </div>
               <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-none">
                  Get In <span className="lime-text-gradient italic">Touch</span>
               </h2>
               <p className="text-gray-400 text-base max-w-2xl mx-auto mb-16">
                  Ready to take your brand to the next level? Let's discuss your project and how we can help you achieve your goals.
               </p>
               <button className="neon-btn text-base px-12 py-5 shadow-lg">
                  Start Your Project
               </button>
            </div>
         </section>

         <Footer />
      </div>
   );
};

export default Home;
