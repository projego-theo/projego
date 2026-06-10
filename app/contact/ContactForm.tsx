'use client';

import { useState } from 'react';

const serviceOptions = [
  { value: 'Type A — Permis & Démarches', label: 'Type A — Permis & Démarches (DP, PC) · Toute la France' },
  { value: "Type B — Maîtrise d'œuvre", label: "Type B — Maîtrise d'œuvre · Vendée 30km des Herbiers" },
  { value: 'Espace Pro', label: 'Pour les Pros (Sous-traitance professionnelle)' },
];

const CONTACT_API = '/api/contact';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: data.get('firstName') as string,
      lastName:  data.get('lastName')  as string,
      email:     data.get('email')     as string,
      phone:     data.get('phone')     as string,
      service:   data.get('service')   as string,
      city:      data.get('city')      as string,
      message:   data.get('message')   as string,
    };

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 200 || res.status === 201 || res.status === 204) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-[#29abe2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#29abe2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Message envoyé !</h2>
        <p className="text-gray-500">Nous vous recontactons sous 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-[#3d3d3d]">Ou envoyez-nous un message</h2>

      {/* Prénom + Nom */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Prénom *</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Jean"
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Nom *</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Dupont"
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jean@exemple.fr"
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Téléphone *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="06 12 34 56 78"
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all"
        />
      </div>

      {/* Ville + Service */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Ville *</label>
          <input
            id="city"
            name="city"
            type="text"
            required
            placeholder="Ex : Les Herbiers, Paris..."
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Service *</label>
          <select
            id="service"
            name="service"
            required
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="">Choisissez...</option>
            {serviceOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#3d3d3d] mb-1.5">Votre message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet en quelques lignes : type de travaux, surface approximative, contraintes particulières..."
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-[#3d3d3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#29abe2] focus:border-transparent transition-all resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          Une erreur est survenue, veuillez réessayer.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#29abe2] hover:bg-[#1a9fd6] disabled:bg-[#29abe2]/50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          'Envoyer mon message'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">Premier contact gratuit et sans engagement. Vos données ne sont pas partagées.</p>
    </form>
  );
}
