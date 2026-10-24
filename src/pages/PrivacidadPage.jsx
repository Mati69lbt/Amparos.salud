const PrivacidadPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Volver al inicio
        </a>

        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Política de privacidad
        </h1>

        <div className="mt-6 space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="font-semibold text-gray-900 dark:text-white">
            Política de privacidad — Amparos de Salud
          </p>

          <p>
            Responsable: Amparos de Salud. Contacto:{" "}
            info.amparossalud@gmail.com.
          </p>

          <p>
            Datos que pedimos: nombre, teléfono y el relato de tu consulta, que
            puede incluir información sobre tu salud (dato sensible). Podés usar
            un nombre ficticio, pero necesitamos un teléfono real para poder
            contactarte.
          </p>

          <p>
            Para qué los usamos: para analizar tu consulta y contactarte. Para
            evaluarla, la derivamos a un abogado matriculado independiente. Si
            considera viable tu caso, se comunica con vos. No usamos tus datos
            para otra finalidad ni los vendemos.
          </p>

          <p>
            Con quién los compartimos: con ese abogado matriculado y con
            proveedores técnicos que almacenan o notifican la consulta (Google
            Firebase y EmailJS), que pueden procesar datos fuera del país.
          </p>

          <p>
            Medición de publicidad: usamos el Píxel de Meta para medir visitas y
            que se envió un formulario. No le enviamos tu nombre, teléfono ni el
            texto de tu consulta. Meta puede recibir datos técnicos de tu
            navegador, como cookies.
          </p>

          <p>
            Tus derechos: podés pedir acceso, rectificación o eliminación de tus
            datos escribiendo a info.amparossalud@gmail.com (Ley 25.326). La
            Agencia de Acceso a la Información Pública es el órgano de control
            de esa ley.
          </p>

          <p>
            Conservación: conservamos tus datos mientras analizamos tu consulta,
            y los eliminamos si lo pedís.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacidadPage;
