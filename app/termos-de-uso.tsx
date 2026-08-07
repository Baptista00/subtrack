import { LegalDocumentScreen } from "../src/components";
import { legalLastUpdated, termsOfUseSections } from "../src/content/legal";

export default function TermosDeUso() {
  return (
    <LegalDocumentScreen
      lastUpdated={legalLastUpdated}
      notice="Documento em revisão antes da publicação oficial do SubTrack."
      sections={termsOfUseSections}
      title="Termos de Uso"
    />
  );
}
