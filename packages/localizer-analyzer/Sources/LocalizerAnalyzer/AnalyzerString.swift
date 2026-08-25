struct AnalyzerString: Codable {
  let stableKey: String
  let sourceText: String
  let developerComment: String?
  let occurrences: [AnalyzerOccurrence]

  enum CodingKeys: String, CodingKey {
    case stableKey
    case sourceText
    case developerComment
    case occurrences
  }

  func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(stableKey, forKey: .stableKey)
    try container.encode(sourceText, forKey: .sourceText)
    try container.encode(developerComment, forKey: .developerComment)
    try container.encode(occurrences, forKey: .occurrences)
  }
}
