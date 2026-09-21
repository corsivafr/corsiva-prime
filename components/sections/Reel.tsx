import Reveal from '@/components/Reveal'
import ReelCarousel, { type Reel as ReelItem } from '@/components/ReelCarousel'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'

/* Les vidéos format réseaux sociaux : nos voitures défilent dans un téléphone, comme sur Corsiva OS. */
const REELS: ReelItem[] = [
  { id: 'trio', titre: 'Trois voitures', lieu: 'Aix-les-Bains', src: '/media/video/reel-3-voitures-480.mp4', poster: '/media/video/reel-3-voitures-poster.jpg' },
  { id: 'm3', titre: 'BMW M3 Competition', lieu: 'Garage Corsiva, Chambéry', src: '/media/video/reel-m3-garage-480.mp4', poster: '/media/video/reel-m3-garage-poster.jpg' },
  { id: 'g', titre: 'Mercedes Classe G', lieu: 'Château de Servolex', src: '/media/video/reel-classe-g-480.mp4', poster: '/media/video/reel-classe-g-poster.jpg' },
  { id: 'g2', titre: 'Mercedes Classe G', lieu: 'Annecy', src: '/media/video/reel-classe-g-annecy-480.mp4', poster: '/media/video/reel-classe-g-annecy-poster.jpg' },
  { id: 'taycan', titre: 'Porsche Taycan', lieu: 'Château de Servolex', src: '/media/video/reel-taycan-480.mp4', poster: '/media/video/reel-taycan-poster.jpg' },
]
export default function Reel() {
  return (
    <Section id="video" glow>
      <Wrap>
        <SecHead a="Nos voitures," b="en mouvement.">Les véhicules du groupe Corsiva, filmés par nos équipes : M3 Competition, Classe G, Taycan. Le même soin pour chaque voiture que nous importons.</SecHead>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
          <div className="lg:col-span-5 lg:col-start-2 rise rise-scale flex justify-center" style={d(0.05)}>
            <ReelCarousel reels={REELS} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { t: 'Location de prestige', s: 'M3 Competition, Classe G, Taycan, Cayenne : la flotte du groupe, louée depuis Chambéry, Annecy, Aix-les-Bains et Courchevel.' },
              { t: 'Conciergerie et sourcing', s: 'Livraison, gardiennage, convoyage, préparation : ce que nous faisons pour nos clients loueurs, nous le faisons pour votre import.' },
              { t: 'Suivez-nous', s: 'Les arrivées, les livraisons et les coulisses, en vidéo.' },
            ].map((x, i) => (
              <div key={x.t} className="rise card-dense" style={d(0.1 + i * 0.07)}>
                <h3>{x.t}</h3>
                <p>{x.s}</p>
              </div>
            ))}
            <div className="rise flex flex-wrap gap-3" style={d(0.35)}>
              <a href="https://www.instagram.com/corsiva.eu" target="_blank" rel="noopener noreferrer" className="btn-dark">Instagram <Arrow /></a>
              <a href="https://www.tiktok.com/@corsivafr" target="_blank" rel="noopener noreferrer" className="btn-dark">TikTok <Arrow /></a>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
