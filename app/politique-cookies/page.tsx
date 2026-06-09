import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBackground } from '@/components/PageBackground';

export const metadata: Metadata = {
  title: 'Politique de cookies — Projego',
  description: 'Liste et description des cookies utilisés sur projego.fr : Google Analytics, Google Tag Manager, Meta Pixel. Finalités, durées de conservation et droits.',
  robots: { index: true, follow: true },
};

const cookies = [
  {
    name: 'Meta Pixel',
    id: '659768348299970',
    provider: 'Meta (Facebook)',
    category: 'Marketing / Publicité',
    purpose:
      "Mesure l'efficacité de nos publicités Facebook et Instagram. Permet de créer des audiences de retargeting et d'analyser les conversions (clics, visites, demandes de contact) en provenance de nos campagnes publicitaires.",
    duration: '90 jours (cookies _fbp, _fbc)',
    transfers: 'Données transférées vers des serveurs Meta aux États-Unis (clause contractuelle type UE-US Data Privacy Framework).',
    consent: 'Chargé uniquement si vous avez accepté les cookies.',
  },
  {
    name: 'Google Tag Manager',
    id: 'GTM-KVCGG62W',
    provider: 'Google LLC',
    category: 'Technique (gestionnaire de balises)',
    purpose:
      "Conteneur qui gère le chargement de nos autres outils de mesure (Google Analytics). Ne collecte pas de données directement mais permet d'activer ou de désactiver les balises tierces sans modifier le code du site.",
    duration: 'Session (pas de cookie propre durable)',
    transfers: 'Données transférées vers des serveurs Google aux États-Unis (EU-US Data Privacy Framework).',
    consent: 'Chargé uniquement si vous avez accepté les cookies.',
  },
  {
    name: 'Google Analytics 4',
    id: 'G-QCJEBNXYPW',
    provider: 'Google LLC',
    category: 'Analytique',
    purpose:
      "Mesure l'audience du site : pages consultées, durée de visite, provenance du trafic (organique, direct, réseaux sociaux), appareils utilisés. Les données agrégées nous aident à améliorer le contenu et l'expérience utilisateur.",
    duration: '2 ans (cookie _ga) / 24h (cookie _ga_XXXXXXXX)',
    transfers: 'Données transférées vers des serveurs Google aux États-Unis (EU-US Data Privacy Framework).',
    consent:
      "Chargé dans tous les cas. Si vous avez refusé les cookies, GA4 est chargé en mode anonymisé : IP tronquée (anonymize_ip: true), stockage publicitaire désactivé (ad_storage: denied). Aucune donnée personnelle identifiable n'est collectée dans ce mode.",
  },
];

const rights = [
  "Droit d'accès : obtenir une copie des données collectées vous concernant",
  "Droit d'opposition : vous opposer au traitement à des fins statistiques ou publicitaires",
  "Droit à l'effacement : demander la suppression de vos données",
  "Droit à la limitation : restreindre le traitement de vos données",
];

export default function PolitiqueCookiesPage() {
  return (
    <>
      <PageBackground />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#3d3d3d] mb-2">Politique de cookies</h1>
          <p className="text-gray-400 text-sm mb-12">
            Dernière mise à jour : juin 2026 — Conformément au RGPD et aux recommandations de la CNIL.
          </p>

          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d&apos;un site web. Il permet au site de mémoriser des informations sur votre visite (pages consultées, préférences, identifiant de session). Les cookies ne peuvent pas exécuter de programme ni transmettre de virus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">Cookies utilisés sur projego.fr</h2>
              <p className="text-sm text-gray-600 mb-6">
                Ce site utilise trois outils de mesure tiers. Voici le détail de chacun :
              </p>
              <div className="space-y-6">
                {cookies.map((cookie) => (
                  <div key={cookie.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-[#3d3d3d]">{cookie.name}</span>
                        <span className="ml-2 text-xs font-mono text-gray-400">{cookie.id}</span>
                      </div>
                      <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-1 rounded-full font-medium">
                        {cookie.category}
                      </span>
                    </div>
                    <div className="px-6 py-5 space-y-3 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-[#3d3d3d]">Fournisseur : </span>
                        {cookie.provider}
                      </div>
                      <div>
                        <span className="font-semibold text-[#3d3d3d]">Finalité : </span>
                        {cookie.purpose}
                      </div>
                      <div>
                        <span className="font-semibold text-[#3d3d3d]">Durée de conservation : </span>
                        {cookie.duration}
                      </div>
                      <div>
                        <span className="font-semibold text-[#3d3d3d]">Transferts hors UE : </span>
                        {cookie.transfers}
                      </div>
                      <div className="pt-1 pl-3 border-l-2 border-[#29abe2]/30 text-xs text-gray-500 leading-relaxed">
                        {cookie.consent}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">Gérer votre consentement</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Lors de votre première visite, un bandeau en bas de page vous permet d&apos;accepter ou de refuser les cookies non essentiels. Votre choix est mémorisé dans le stockage local de votre navigateur (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">localStorage</code>, clé : <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">cookie-consent</code>).
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Vous pouvez modifier votre choix à tout moment en effaçant les données de site de votre navigateur, ou en utilisant les liens ci-dessous :
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://support.google.com/accounts/answer/32050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#29abe2] hover:underline border border-[#29abe2]/30 px-3 py-1.5 rounded-full"
                >
                  Opt-out Google Analytics
                </a>
                <a
                  href="https://www.facebook.com/privacy/policies/cookies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#29abe2] hover:underline border border-[#29abe2]/30 px-3 py-1.5 rounded-full"
                >
                  Paramètres Meta Pixel
                </a>
                <a
                  href="https://www.youronlinechoices.com/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#29abe2] hover:underline border border-[#29abe2]/30 px-3 py-1.5 rounded-full"
                >
                  Your Online Choices (publicité ciblée)
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">Vos droits</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Conformément au RGPD, vous disposez des droits suivants sur les données collectées via ces cookies :
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                {rights.map((right) => (
                  <li key={right} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {right}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a>.
                Vous pouvez également saisir la{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#29abe2] hover:underline">CNIL</a>{' '}
                en cas de litige non résolu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">Responsable du traitement</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>TCONSEILS SARL</strong> (marque Projego)<br />
                20B rue de la Maine, 85500 Beaurepaire<br />
                Email : <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a>
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Voir aussi :{' '}
                <Link href="/politique-confidentialite" className="text-[#29abe2] hover:underline">
                  Politique de confidentialité complète
                </Link>
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
