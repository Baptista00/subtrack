import { LegalDocumentScreen } from "../src/components";
import { legalLastUpdated, privacyPolicySections } from "../src/content/legal";

export default function PoliticaPrivacidade() {
  return (
    <LegalDocumentScreen
      lastUpdated={legalLastUpdated}
      notice="Documento em revisão antes da publicação oficial do SubTrack."
      sections={privacyPolicySections}
      title="Política de Privacidade"
    />
  );
}
