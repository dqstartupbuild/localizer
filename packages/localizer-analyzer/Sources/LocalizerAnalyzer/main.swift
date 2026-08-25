import Foundation

let root = CommandLine.arguments.dropFirst().first ?? FileManager.default.currentDirectoryPath
do {
  let output = try runAnalyzer(input: AnalyzerInput(root: root))
  let encoder = JSONEncoder()
  encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
  let data = try encoder.encode(output)
  FileHandle.standardOutput.write(data)
  FileHandle.standardOutput.write(Data("\n".utf8))
} catch {
  FileHandle.standardError.write(Data("Localizer analyzer: \(error.localizedDescription)\n".utf8))
  exit(1)
}
