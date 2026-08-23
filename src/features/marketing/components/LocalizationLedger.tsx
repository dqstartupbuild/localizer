import { LocalizationLedgerRow } from "~/features/marketing/components/LocalizationLedgerRow";

const ledgerRows = [
  { locale: "EN", translation: "Start your next habit", state: "original" },
  { locale: "ES", translation: "Empieza tu próximo hábito", state: "checked" },
  { locale: "JA", translation: "次の習慣を始めよう", state: "ready" },
];

export function LocalizationLedger() {
  return (
    <figure
      className="localization-ledger"
      aria-label="Example iOS app translation"
    >
      <figcaption className="localization-ledger__heading">
        <span>Localizer/Generated/Localizer.xcstrings</span>
        <span>3 languages · 1 app string</span>
      </figcaption>
      <div className="localization-ledger__source">
        <span>original text</span>
        <strong>“Start your next habit”</strong>
      </div>
      <div className="localization-ledger__rows">
        {ledgerRows.map((row) => (
          <LocalizationLedgerRow key={row.locale} {...row} />
        ))}
      </div>
      <div className="localization-ledger__footnote">
        <span className="localization-ledger__pulse" aria-hidden="true" />
        Ready to sync back to Xcode
      </div>
    </figure>
  );
}
