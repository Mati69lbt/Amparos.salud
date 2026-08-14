import { useState } from 'react'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

const INITIAL_FORM = {
  nombre: '',
  telefono: '',
  mensaje: '',
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60'

const ContactForm = () => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre.trim() || !form.telefono.trim() || !form.mensaje.trim()) {
      toast.error('Completá nombre, teléfono y mensaje.')
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error('El formulario no está configurado correctamente. Contactanos por otro medio.')
      return
    }

    setIsSending(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.nombre,
          phone: form.telefono,
          message: form.mensaje,
        },
        { publicKey: PUBLIC_KEY }
      )
      toast.success('¡Consulta enviada con éxito! Te contactaremos a la brevedad.')
      setForm(INITIAL_FORM)
    } catch (error) {
      console.error('Error al enviar la consulta:', error)
      toast.error('Ocurrió un error al enviar tu consulta. Intentá nuevamente.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nombre completo *
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          className={inputClass}
          disabled={isSending}
          required
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Teléfono / WhatsApp *
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          className={inputClass}
          disabled={isSending}
          required
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contanos tu consulta *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Escribí acá tu consulta o situación actual con tu prepaga u obra social..."
          className={inputClass}
          disabled={isSending}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSending ? 'Enviando consulta...' : 'Enviar consulta'}
      </button>
    </form>
  )
}

export default ContactForm
