import SwiftSyntax

final class StringLiteralVisitor: SyntaxVisitor {
  private let file: String
  private let converter: SourceLocationConverter
  private(set) var strings: [AnalyzerString] = []
  private(set) var unsupportedPatterns: [AnalyzerOccurrence] = []

  init(file: String, tree: SourceFileSyntax) {
    self.file = file
    self.converter = SourceLocationConverter(fileName: file, tree: tree)
    super.init(viewMode: .sourceAccurate)
  }

  override func visit(_ node: FunctionCallExprSyntax) -> SyntaxVisitorContinueKind {
    let callName = node.calledExpression.trimmedDescription.split(separator: ".").last.map(String.init) ?? ""
    guard localizableCallNames.contains(callName) else { return .visitChildren }
    let location = converter.location(for: node.positionAfterSkippingLeadingTrivia)
    let occurrence = AnalyzerOccurrence(file: file, line: location.line, symbol: callName)
    guard let firstArgument = node.arguments.first else { return .visitChildren }
    if callName == "String" && firstArgument.label?.text != "localized" {
      return .visitChildren
    }
    if callName == "Text" && firstArgument.label?.text == "verbatim" {
      return .visitChildren
    }
    guard let literal = firstArgument.expression.as(StringLiteralExprSyntax.self) else {
      unsupportedPatterns.append(occurrence)
      return .visitChildren
    }
    guard literal.segments.count == 1, let segment = literal.segments.first?.as(StringSegmentSyntax.self) else {
      unsupportedPatterns.append(occurrence)
      return .visitChildren
    }
    let sourceText = segment.content.text
    guard !sourceText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return .visitChildren }
    strings.append(
      AnalyzerString(
        stableKey: createStableKey(sourceText),
        sourceText: sourceText,
        developerComment: nil,
        occurrences: [occurrence]
      )
    )
    return .visitChildren
  }
}
