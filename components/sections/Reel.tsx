import Reveal from '@/components/Reveal'
import ReelVideo from '@/components/ReelVideo'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'

/* La vidéo format réseaux sociaux : la M3 Competition sort du garage Corsiva, dans un téléphone comme sur Corsiva OS. */
export default function Reel() {
  return (
    <Section id="video" glow>
      <Wrap>
        <SecHead a="La M3 Competition," b="en mouvement.">Filmée par nos équipes à la sortie du garage Corsiva : le soin apporté à chaque voiture que nous importons pour vous.</SecHead>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
          <div className="lg:col-span-5 lg:col-start-2 rise rise-scale flex justify-center" style={d(0.05)}>
            <div className="phone">
              <span className="phone-notch" aria-hidden="true" />
              <ReelVideo src="/media/video/reel-m3-garage-480.mp4" poster="/media/video/reel-m3-garage-poster.jpg" alt="BMW M3 Competition sortant du garage Corsiva" />
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { t: 'Dénichée chez nos concessions partenaires', s: 'Le réseau allemand de Corsiva Prime nous confie ses pépites ; nous négocions le deal pour vous.' },
              { t: 'Configurée et optionnée à votre goût', s: 'Couleur, jantes, options : vous choisissez, nous validons chaque détail avec la concession.' },
              { t: 'Accompagnée de A à Z', s: 'Inspection, transport fermé, immatriculation : nos équipes gèrent tout, jusqu’à la remise des clés.' },
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
