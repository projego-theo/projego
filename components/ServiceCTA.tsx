import Image from 'next/image';
import StartProjectButton from '@/components/StartProjectButton';

interface ServiceCTAProps {
  title: string;
  description: string;
  photo: string;
  photoAlt?: string;
}

export function ServiceCTA({ title, description, photo, photoAlt }: ServiceCTAProps) {
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">{title}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">{description}</p>
            <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg">
              Démarrer mon projet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </StartProjectButton>
          </div>
          <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
            <Image src={photo} alt={photoAlt ?? "Projego — maîtrise d'œuvre et démarches administratives en Vendée"} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
