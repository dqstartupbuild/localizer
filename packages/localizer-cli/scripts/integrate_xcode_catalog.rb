#!/usr/bin/env ruby
require "json"
require "pathname"
require "xcodeproj"

project_path = Pathname.new(ARGV.fetch(0)).realpath
catalog_path = Pathname.new(ARGV.fetch(1)).realpath
target_name = ARGV[2]

project = Xcodeproj::Project.open(project_path)
project_directory = project_path.dirname
relative_catalog_path = catalog_path.relative_path_from(project_directory).to_s
path_parts = relative_catalog_path.split(File::SEPARATOR).reject(&:empty?)
group = project.main_group
path_parts.slice(0, path_parts.length - 1).each do |part|
  group = group.groups.find { |candidate| candidate.display_name == part } || group.new_group(part)
end

catalog_name = path_parts.last
file_reference = group.files.find { |candidate| candidate.path == catalog_name } || group.new_file(catalog_name)
file_reference.last_known_file_type = "text.json.xcstrings"
conflicting_catalog = project.files.find do |candidate|
  candidate != file_reference && candidate.path == catalog_name
end
abort("A different Localizable.xcstrings already exists in this Xcode project. Merge catalog ownership with the agent before integrating.") if conflicting_catalog

targets = target_name ? project.targets.select { |target| target.name == target_name } : project.targets.select { |target| target.product_type == "com.apple.product-type.application" }
abort("No matching Xcode application target was found.") if targets.empty?

targets.each do |target|
  phase = target.resources_build_phase
  phase.add_file_reference(file_reference, true) unless phase.files_references.include?(file_reference)
end

project.save
puts JSON.generate(
  {
    project: project_path.to_s,
    catalog: catalog_path.to_s,
    targets: targets.map(&:name).sort,
  },
)
