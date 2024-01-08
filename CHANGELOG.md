# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [5.3.2] - 2024-01-07
### Fixed
- AvlTree balance function.

## [5.3.1] - 2023-01-30
### Fixed
- AvlTree ts types.

## [5.3.0] - 2023-01-30
### Added
- `removeNode` to remove a node by its reference.
- `upperBoundKey`, `floorKey`, `lowerBoundKey`, `ceilKey` to support finding nodes by the object comparison key.

## [5.2.0] - 2022-12-12

### Added
- findKey & hasKey to find object nodes directly by the key prop value.

## [5.1.0] - 2022-12-08

### Added
- ability to abort tree traversal using a callback.

## [5.0.2] - 2022-08-21

### Fixed
- `.remove` typos + was not balancing nodes properly on one case.

## [5.0.1] - 2022-07-30

### Fixed
- types field in package.json

## [5.0.0] - 2022-07-19

### Changed
- tree now accepts a compare function.

## [4.3.2] - 2022-07-13

### Fixed
- readme.

## [4.3.1] - 2021-11-01

### Fixed
- ts types.

## [4.3.0] - 2021-08-09
### Added
- `.floor` & `.ceil` as delegates to `.lowerBound` & `upperBound`.

### Fixed
- `.lowerBound` & `upperBound` now finds the precise bound when multiple ones exist.
- make param (value) optional on `.insert`.

## [4.2.2] - 2021-06-20

### Fixed
- index.d.ts

## [4.2.1] - 2021-06-20

### Fixed
- export.

## [4.2.0] - 2021-06-19

### Added
- typescript.

## [4.1.1] - 2021-05-29

### Fixed
- typo in export name.


## [4.1.0] - 2021-04-21

### Added
- `.lowerBound(k)` to find the node with biggest key less or equal a value k.
- `.upperBound(k)` to find the node with smallest key bigger than a value k.

## [4.0.1] - 2021-04-15
### Fixed
- exported AvlTreeNode path.

## [4.0.0] - 2021-04-14
### Changed
- return inserted node from `insert`.
- BinarySearchTreeNode & AvlTreeNode methods.

### Fixed
- README
- jsdoc

## [3.1.8] - 2021-04-02
### Fixed
- update the removed node value with min right one in avl tree.

## [3.1.7] - 2021-01-26
### Fixed
- update the removed node value with min right one.

## [3.1.6] - 2020-04-15
### Fixed
- README

## [3.1.5] - 2020-04-12
### Fixed
- README

## [3.1.4] - 2020-04-12
### Fixed
- jsdoc

## [3.1.3] - 2020-04-10
### Fixed
- README

## [3.1.2] - 2020-04-10
### Fixed
- README
- jsdoc

## [3.1.1] - 2020-04-01
### Fixed
- use the same balancing algorithm for insert and remove.

## [3.1.0] - 2020-03-31
### Added
- AvlTreeNode & AvlTree implementation.

## [3.0.1] - 2020-03-29
### Fixed
- return the updated node in `.insert` 

## [3.0.0] - 2020-03-28
### Changed
- New release
