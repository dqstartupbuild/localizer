// swift-tools-version: 6.0
import PackageDescription

let package = Package(
  name: "LocalizerAnalyzer",
  platforms: [.macOS(.v14)],
  products: [
    .executable(name: "localizer-analyzer", targets: ["LocalizerAnalyzer"]),
  ],
  dependencies: [
    .package(url: "https://github.com/swiftlang/swift-syntax.git", from: "600.0.0"),
  ],
  targets: [
    .executableTarget(
      name: "LocalizerAnalyzer",
      dependencies: [
        .product(name: "SwiftParser", package: "swift-syntax"),
        .product(name: "SwiftSyntax", package: "swift-syntax"),
      ],
    ),
    .testTarget(name: "LocalizerAnalyzerTests", dependencies: ["LocalizerAnalyzer"]),
  ],
)
