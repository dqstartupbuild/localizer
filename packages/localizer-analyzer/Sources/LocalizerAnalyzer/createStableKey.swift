import CryptoKit
import Foundation

func createStableKey(_ sourceText: String) -> String {
  let digest = SHA256.hash(data: Data(sourceText.utf8))
  let hash = digest.map { String(format: "%02x", $0) }.joined()
  return "swiftui_\(hash.prefix(16))"
}
