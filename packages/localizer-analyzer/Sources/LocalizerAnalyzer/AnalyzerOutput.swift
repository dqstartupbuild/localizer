struct AnalyzerOutput: Codable {
  let schemaVersion: Int
  let strings: [AnalyzerString]
  let unsupportedPatterns: [AnalyzerOccurrence]
}
