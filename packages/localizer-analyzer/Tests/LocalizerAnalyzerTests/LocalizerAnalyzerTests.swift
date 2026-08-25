import Foundation
import XCTest
@testable import LocalizerAnalyzer

final class LocalizerAnalyzerTests: XCTestCase {
  func testFindsNativeLocalizedCallsAndFlagsInterpolation() throws {
    let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
    try FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)
    defer { try? FileManager.default.removeItem(at: root) }
    let source = [
      "import SwiftUI",
      "Text(\"Welcome\")",
      "TextField(\"Your name\", text: $name)",
      "let title = String(localized: \"Settings\")",
      "let existing = NSLocalizedString(\"Save\", comment: \"\")",
      "let hexadecimal = String(format: \"%02x\", 10)",
      "Text(verbatim: \"Local diagnostic\")",
      "Text(\"Hello, \\(name)\")",
    ].joined(separator: "\n")
    try source.write(to: root.appendingPathComponent("ExampleView.swift"), atomically: true, encoding: .utf8)

    let result = try runAnalyzer(input: AnalyzerInput(root: root.path))

    XCTAssertEqual(result.strings.map(\.sourceText).sorted(), ["Save", "Settings", "Welcome", "Your name"])
    XCTAssertEqual(result.unsupportedPatterns.count, 1)
  }
}
