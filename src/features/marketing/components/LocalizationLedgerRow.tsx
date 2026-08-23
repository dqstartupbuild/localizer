type LocalizationLedgerRowProps = {
  locale: string;
  state: string;
  translation: string;
};

export function LocalizationLedgerRow({
  locale,
  state,
  translation,
}: LocalizationLedgerRowProps) {
  return (
    <div className="localization-ledger__row">
      <span className="localization-ledger__locale">{locale}</span>
      <span className="localization-ledger__translation">{translation}</span>
      <span className="localization-ledger__state">{state}</span>
    </div>
  );
}
