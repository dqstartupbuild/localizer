import Foundation

func findSwiftFiles(root: URL) throws -> [URL] {
  let skipped = Set([".git", ".build", "DerivedData", ".localizer", "Localizer", "node_modules"])
  let options: FileManager.DirectoryEnumerationOptions = [.skipsHiddenFiles]
  guard let enumerator = FileManager.default.enumerator(
    at: root,
    includingPropertiesForKeys: [.isDirectoryKey],
    options: options
  ) else {
    throw NSError(domain: "LocalizerAnalyzer", code: 1, userInfo: [NSLocalizedDescriptionKey: "Unable to inspect the repository."])
  }
  var files: [URL] = []
  for case let file as URL in enumerator {
    if skipped.contains(file.lastPathComponent) {
      enumerator.skipDescendants()
      continue
    }
    if file.pathExtension == "swift" { files.append(file) }
  }
  return files.sorted { $0.path < $1.path }
}
