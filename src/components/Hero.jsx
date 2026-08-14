import { Accessibility, Hospital, MapPin, Pill, ShieldCheck, Stethoscope, TrendingUp } from 'lucide-react'
import ContactForm from './ContactForm'

const CASOS = [
  { icon: TrendingUp, texto: 'Aumentos desmedidos en la cuota de la prepaga.' },
  { icon: Pill, texto: 'Negativa en cobertura de medicamentos o tratamientos.' },
  { icon: Accessibility, texto: 'Cobertura en prestaciones por discapacidad.' },
  { icon: Hospital, texto: 'Rechazo de afiliación o cambios de plan intempestivos.' },
  { icon: Stethoscope, texto: 'Incumplimiento en cirugías o prótesis.' },
]

const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-start gap-12 px-6 py-16 lg:py-24 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium mb-3">
          <ShieldCheck size={20} />
          <span>Evaluación de caso 100% confidencial</span>
        </div>

        {/*  prepaga u obra social */}

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
  Reclamá por tus derechos ante tu{' '}
  <span className="text-blue-600 dark:text-blue-400">Obra Social</span>{' '}
  o{' '}
  <span className="text-emerald-600 dark:text-emerald-400">Prepaga</span>
</h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Analizamos la situación ante tu prepaga/obra social y te ayudamos a
          iniciar el amparo correspondiente de forma rápida y transparente.
        </p>

        <ul className="mt-6 space-y-3">
          {CASOS.map(({ icon: Icon, texto }) => (
            <li key={texto} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <Icon size={20} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>{texto}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            <MapPin size={14} />
            Entre Ríos
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            <MapPin size={14} />
            Santa Fe Capital
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <ContactForm />
      </div>
    </section>
  )
}

export default Hero
