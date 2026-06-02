import type { Metadata } from 'next';
import { PageBackground } from '@/components/PageBackground';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Projego',
  description: 'Politique de confidentialité et protection des données personnelles de Projego, conformément au RGPD.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageBackground />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#3d3d3d] mb-2">Politique de confidentialité</h1>
          <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : juin 2026 — Conformément au Règlement Général sur la Protection des Données (RGPD).</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">1. Responsable du traitement</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Le responsable du traitement des données personnelles est :<br /><br />
                <strong>TCONSEILS SARL</strong> (marque Projego)<br />
                20B rue de la maine, 85500 Beaurepaire<br />
                Email : <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">2. Données collectées</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Dans le cadre de l&apos;utilisation de notre site et de notre formulaire de contact, nous collectons les données suivantes :
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  'Nom et prénom',
                  'Adresse email',
                  'Numéro de téléphone (optionnel)',
                  'Message décrivant votre projet',
                  'Données de navigation (via cookies analytiques, si consentement)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">3. Finalité du traitement</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Les données collectées sont utilisées pour les finalités suivantes :
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  'Répondre à vos demandes de contact et de devis',
                  'Gérer la relation commerciale avec nos clients',
                  'Vous informer de l\'avancement de votre dossier',
                  'Améliorer nos services et notre site web',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                La base légale du traitement est l&apos;intérêt légitime (réponse aux demandes entrantes) et le consentement (pour les communications marketing, si applicable).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">4. Durée de conservation</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vos données personnelles sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter du dernier contact. Au-delà de cette période, les données sont supprimées ou anonymisées, sauf obligation légale de conservation plus longue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">5. Destinataires des données</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vos données sont traitées exclusivement par Projego et ne sont jamais vendues ni cédées à des tiers à des fins commerciales. Elles peuvent être transmises à des sous-traitants techniques (hébergeur, outil de messagerie) dans le strict cadre de la prestation, sous contrat de traitement des données.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">6. Vos droits</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                {[
                  'Droit d\'accès : obtenir une copie des données vous concernant',
                  'Droit de rectification : corriger des données inexactes ou incomplètes',
                  'Droit à l\'effacement : demander la suppression de vos données',
                  'Droit d\'opposition : vous opposer au traitement de vos données',
                  'Droit à la limitation : demander la restriction du traitement',
                  'Droit à la portabilité : recevoir vos données dans un format structuré',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour exercer ces droits, contactez notre délégué à la protection des données (DPO) à l&apos;adresse :<br />
                <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a><br /><br />
                Nous nous engageons à répondre dans un délai d&apos;un mois. En cas de litige non résolu, vous pouvez saisir la <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) à l&apos;adresse <span className="text-[#29abe2]">cnil.fr</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">7. Cookies</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Notre site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent pas de données personnelles.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Si des cookies analytiques ou de personnalisation sont utilisés, ils le sont sur la base de votre consentement explicite, que vous pouvez retirer à tout moment via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">8. Sécurité des données</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Projego met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Notre site est hébergé sur Vercel, plateforme certifiée SOC 2 et conforme aux normes de sécurité internationales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">9. Modification de la politique</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Projego se réserve le droit de modifier cette politique de confidentialité à tout moment. En cas de modification substantielle, les utilisateurs en seront informés par tout moyen approprié. La version en vigueur est toujours disponible sur cette page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
