import { LocalizationLedgerRow } from "~/features/marketing/components/LocalizationLedgerRow";

const ledgerRows = [
  { locale: "EN", translation: "Start your next habit", state: "source" },
  { locale: "ES", translation: "Empieza tu próximo hábito", state: "reviewed" },
  { locale: "JA", translation: "次の習慣を始めよう", state: "ready" },
];

export function LocalizationLedger() {
  return (
    <figure
      className="localization-ledger"
      aria-label="Example localization catalog"
    >
      <figcaption className="localization-ledger__heading">
        <span>Localizer/Generated/Localizer.xcstrings</span>
        <span>3 locales · one source</span>
      </figcaption>
      <div className="localization-ledger__source">
        <span>source string</span>
        <strong>“Start your next habit”</strong>
      </div>
      <div className="localization-ledger__rows">
        {ledgerRows.map((row) => (
          <LocalizationLedgerRow key={row.locale} {...row} />
        ))}
      </div>
      <div className="localization-ledger__footnote">
        <span className="localization-ledger__pulse" aria-hidden="true" />
        Ready for a local sync
      </div>
    </figure>
  );
}
