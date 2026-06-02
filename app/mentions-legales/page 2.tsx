import type { Metadata } from 'next';
import { PageBackground } from '@/components/PageBackground';

export const metadata: Metadata = {
  title: 'Mentions légales — Projego',
  description: 'Mentions légales du site Projego (anciennement TConseils), spécialiste des démarches administratives et maîtrise d\'oeuvre en Vendée.',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageBackground />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#3d3d3d] mb-2">Mentions légales</h1>
          <p className="text-gray-400 text-sm mb-12">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique.</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">1. Éditeur du site</h2>
              <dl className="space-y-2 text-sm text-gray-600">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">Société</dt>
                  <dd className="col-span-2">TCONSEILS SARL, exploitant la marque Projego (anciennement TConseils)</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">SIRET</dt>
                  <dd className="col-span-2">834 920 205 00038</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">R.C.S.</dt>
                  <dd className="col-span-2">La Roche-sur-Yon</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">Capital social</dt>
                  <dd className="col-span-2">2 000 €</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">N° TVA intracommunautaire</dt>
                  <dd className="col-span-2">FR42834920205</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">Siège social</dt>
                  <dd className="col-span-2">20B rue de la maine, 85500 Beaurepaire</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">Email</dt>
                  <dd className="col-span-2"><a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a></dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#3d3d3d]">Directeur de publication</dt>
                  <dd className="col-span-2">M. CHAUVET</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">2. Hébergement</h2>
              <p className="text-sm text-gray-600">
                Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.<br />
                Site web : <span className="text-[#29abe2]">vercel.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">3. Droit d&apos;auteur</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication de Projego. La reproduction des textes de ce site sur un support papier est autorisée sous réserve du respect des trois conditions suivantes : gratuité de la diffusion, respect de l&apos;intégrité des documents reproduits et citation claire et lisible de la source.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">4. Données personnelles</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Projego collecte des données personnelles uniquement dans le cadre de son formulaire de contact (nom, prénom, adresse email, numéro de téléphone, message). Ces données sont utilisées exclusivement pour répondre aux demandes des utilisateurs et ne sont jamais transmises à des tiers sans consentement préalable.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Conformément à la loi n° 78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés, et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression des données vous concernant.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">5. Cookies</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Le site Projego peut utiliser des cookies à des fins de mesure d&apos;audience et de fonctionnement technique. Ces cookies ne contiennent pas d&apos;informations personnelles et ne sont pas utilisés à des fins commerciales.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser les cookies. Cela peut cependant affecter le bon fonctionnement de certaines fonctionnalités du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">6. Liens hypertextes</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Le site Projego peut contenir des liens hypertextes vers d&apos;autres sites. Projego n&apos;est pas responsable du contenu de ces sites tiers et des pratiques de confidentialité de leurs éditeurs.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tout lien vers le site Projego doit faire l&apos;objet d&apos;une autorisation préalable de la part de Projego. Pour toute demande, contactez-nous à : <a href="mailto:contact@projego.fr" className="text-[#29abe2] hover:underline">contact@projego.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#3d3d3d] mb-4 pb-2 border-b border-gray-200">7. Droit applicable</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d&apos;accord amiable, les tribunaux français seront compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
