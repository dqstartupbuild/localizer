struct AnalyzerOccurrence: Codable, Hashable {
  let file: String
  let line: Int
  let symbol: String?
}
