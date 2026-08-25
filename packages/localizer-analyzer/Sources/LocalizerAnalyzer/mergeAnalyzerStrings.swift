func mergeAnalyzerStrings(_ values: [AnalyzerString]) -> [AnalyzerString] {
  var grouped: [String: AnalyzerString] = [:]
  for value in values {
    if let existing = grouped[value.stableKey] {
      grouped[value.stableKey] = AnalyzerString(
        stableKey: existing.stableKey,
        sourceText: existing.sourceText,
        developerComment: existing.developerComment,
        occurrences: (existing.occurrences + value.occurrences).sorted {
          "\($0.file):\($0.line)" < "\($1.file):\($1.line)"
        }
      )
    } else {
      grouped[value.stableKey] = value
    }
  }
  return grouped.values.sorted { $0.stableKey < $1.stableKey }
}
