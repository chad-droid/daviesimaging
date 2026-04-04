"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function DigitalProductionSpecialistApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center bg-bg-surface py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Solicitud Recibida</Eyebrow>
            <h1>Gracias por tu interés.</h1>
            <p className="mt-5 text-text-body">
              Revisamos cada solicitud y nos pondremos en contacto si hay compatibilidad con el perfil que buscamos.
            </p>
            <Link href="/careers" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-body hover:text-accent">
              &larr; Ver todas las vacantes
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">
        <Link href="/careers" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-dark">
          &larr; Ver todas las vacantes
        </Link>

        <RevealOnScroll>
          <Eyebrow>Tiempo Completo &middot; Guadalajara</Eyebrow>
          <h1 className="mt-3">
            Especialista en <strong>Producción Digital</strong>
          </h1>
          <p className="mt-4 text-text-body">
            En DIG producimos staging virtual y video digital para constructoras de vivienda en EE. UU. Buscamos personas detallistas, consistentes y rápidas con experiencia en herramientas de staging digital.
          </p>
        </RevealOnScroll>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            const fd = new FormData(e.currentTarget);
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  firstName: fd.get("firstName"),
                  lastName: fd.get("lastName"),
                  email: fd.get("email"),
                  company: "Guadalajara",
                  message: `Experiencia con staging digital: ${fd.get("stagingExp")}\nHerramientas: ${fd.get("tools")}\nPortafolio: ${fd.get("portfolio")}\nDisponibilidad: ${fd.get("availability")}\n\n${fd.get("message")}`,
                  intent: "Career Application — Digital Production Specialist (Guadalajara)",
                }),
              });
              if (!res.ok) throw new Error();
              setSubmitted(true);
            } catch {
              setError("Algo salió mal. Escríbenos directamente a info@daviesimaging.com.");
            } finally {
              setLoading(false);
            }
          }}
          className="mt-10 space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="meta-text mb-1.5 block">Nombre</label>
              <input id="firstName" name="firstName" type="text" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
            </div>
            <div>
              <label htmlFor="lastName" className="meta-text mb-1.5 block">Apellido</label>
              <input id="lastName" name="lastName" type="text" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="meta-text mb-1.5 block">Correo electrónico</label>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="stagingExp" className="meta-text mb-1.5 block">¿Cuántos años llevas trabajando con staging digital o retoque fotográfico?</label>
            <input id="stagingExp" name="stagingExp" type="text" placeholder="Ej. 2 años" className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="tools" className="meta-text mb-1.5 block">¿Qué herramientas o software manejas?</label>
            <input id="tools" name="tools" type="text" placeholder="Ej. Photoshop, herramientas de staging virtual, etc." className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="portfolio" className="meta-text mb-1.5 block">Enlace a portafolio o trabajo anterior (si aplica)</label>
            <input id="portfolio" name="portfolio" type="url" placeholder="https://" className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="availability" className="meta-text mb-1.5 block">¿Cuándo podrías comenzar?</label>
            <input id="availability" name="availability" type="text" placeholder="Ej. Inmediatamente, en 2 semanas..." className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="message" className="meta-text mb-1.5 block">¿Algo más que quieras compartirnos?</label>
            <textarea id="message" name="message" rows={4} placeholder="Cuéntanos sobre tu experiencia, proyectos anteriores o lo que te interesa de este rol..." className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="cta-button w-full rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover disabled:opacity-50">
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      </div>
    </section>
  );
}
