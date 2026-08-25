import Foundation
import SwiftParser

func runAnalyzer(input: AnalyzerInput) throws -> AnalyzerOutput {
  let root = URL(fileURLWithPath: input.root)
    .standardizedFileURL
    .resolvingSymlinksInPath()
  var strings: [AnalyzerString] = []
  var unsupportedPatterns: [AnalyzerOccurrence] = []
  for file in try findSwiftFiles(root: root) {
    let source = try String(contentsOf: file, encoding: .utf8)
    let tree = Parser.parse(source: source)
    let relativePath = file
      .resolvingSymlinksInPath()
      .path
      .replacingOccurrences(of: "\(root.path)/", with: "")
    let visitor = StringLiteralVisitor(file: relativePath, tree: tree)
    visitor.walk(tree)
    strings.append(contentsOf: visitor.strings)
    unsupportedPatterns.append(contentsOf: visitor.unsupportedPatterns)
  }
  return AnalyzerOutput(
    schemaVersion: 1,
    strings: mergeAnalyzerStrings(strings),
    unsupportedPatterns: unsupportedPatterns.sorted { "\($0.file):\($0.line)" < "\($1.file):\($1.line)" }
  )
}
