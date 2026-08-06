---
layout: default
title: Release 3.0.x and older
parent: Releases
nav_order: 4
toc: false
summary: "Release notes for previous CREST versions"
permalink: /page/releases/release_old.html
---

# CREST Release 3.0.x and older
{: .no_toc }

---

## CREST version 3.0.2 🛡️
### Build updates and fixes 🛠️

## What's Changed
* 🪲 Minor bug fixes for MSREACT mode by @gorges97 in https://github.com/crest-lab/crest/pull/309
* 🪲 Circumvent segfault due to optional arg in gcc build in https://github.com/crest-lab/crest/pull/318
* 🪲 Fix for #320 in https://github.com/crest-lab/crest/pull/322
* 🔒 Safer toml input parsing in https://github.com/crest-lab/crest/pull/325 Unrecognized keywords will now throw a warning and stop the program immediately
* 🛠️ Maintenance of submodules in https://github.com/crest-lab/crest/pull/328
* ⚙️ Update of GitHub workflows in https://github.com/crest-lab/crest/pull/335
* 🛠️ Safer (but unfortunately still not fixed) MKL handling for ifort builds in https://github.com/crest-lab/crest/pull/331
* 🌊 **Fixing implicit solvation in `tblite` submodule** in https://github.com/crest-lab/crest/pull/331 (most important change, should now be consistent with `xtb`)
* 📦 Added a GNU/CMake static build for the continuous release, alongside the Intel build:<br>[![Download (GNU)](https://img.shields.io/badge/download-GNU_build_binary-green)](https://github.com/crest-lab/crest/releases/download/latest/crest-gnu-12-ubuntu-latest.tar.xz)

<br>


---

## CREST 3.0.1 (CREST 3.0 Hotfixes)
### What's Changed
* Address errors of issues [#281](https://github.com/crest-lab/crest/issues/281)
* Restore printout of kpush, mentioned in [#284](https://github.com/crest-lab/crest/issues/284)
* Address thread OpenMP handling issues of [#284](https://github.com/crest-lab/crest/issues/284) and [#285](https://github.com/crest-lab/crest/issues/285), see [#289](https://github.com/crest-lab/crest/pull/289)
* Fix uninitialized boolean bug in gcc build [#287](https://github.com/crest-lab/crest/pull/287)
* Fix axis bug causing [#296](https://github.com/crest-lab/crest/issues/296)
* Address QCG issues [#297](https://github.com/crest-lab/crest/issues/297) and [#294](https://github.com/crest-lab/crest/issues/294)
* Singlepoint and optimization printout cleanup

### Other Additions
* Allow `tblite` parameter file read-in in [#303](https://github.com/crest-lab/crest/pull/303)
* Implement dipole and atomic charges readout for tblite calculators, gfn0 and gfnff
* CMake-based unit tests (run `make test` after building)


---

## CREST 3.0

CREST 3.0 is a major overhaul of the previous code versions. A large part of the original source code was rewritten to implement calculators, optimization, and molecular dynamics routines *directly*, rather than relying only on the `xtb` program as a subprocess.
Consequently, there are performance improvements and a significant reduction of I/O operations.
Read all about the new program version in the new open access article [**J. Chem. Phys. 2024, 160, 114110**](https://doi.org/10.1063/5.0197592).

Features include:
- New [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html "Documentation / Input Files")
- Energy- and gradient-based interface for calculations
- Standalone ANCOPT implementation (RF optimizer with BFGS update step in approximate normal coordinates)
- Standalone MD and metadynamics module
- Standalone implementation of geometrical constraints
- New minimum energy crossing point (MECP) algorithm (see [**Examples/MECP Calculations**](../examples/mecp "Examples / MECP Calculations"))
- Integration of the [**tblite** {{ site.data.icons.github }}](https://github.com/tblite/tblite "tblite on GitHub") submodule
- Integration of a [**GFN0-xTB** {{ site.data.icons.github }}](https://github.com/pprcht/gfn0) submodule (see [J. Phys. Chem. Lett. 2023, 14, 19, 4440–4448](https://doi.org/10.1021/acs.jpclett.3c00494))
- Integration of the [**TOML-F** {{ site.data.icons.github }}](https://github.com/toml-f/toml-f) parser
- Integration of a [**GFN-FF** {{ site.data.icons.github }}](https://github.com/pprcht/gfnff) submodule
- Implementation of a multi-layered multi-center ONIOM calculator (see [J. Phys. Chem. B 2024, 128, 13, 3145–3156](https://doi.org/10.1021/acs.jpcb.4c00104))
- Proper unit tests for the CMake build


---

# CREST 2.12 and older

## 2.12

* **Finalized QCG implementation** consistent with publication [*JCTC*, **2022**, *18*, 3174-        3189](https://doi.org/10.1021/acs.jctc.2c00239) by @cplett in [#94](https://github.com/grimme-lab/   crest/pull/94) [#104 ](https://github.com/grimme-lab/crest/pull/104) [#103](https://github.com/      grimme-lab/crest/pull/103) [#116](https://github.com/grimme-lab/crest/pull/116)
* Fixes for compiling with GCC by @awvwgk in [#92](https://github.com/grimme-lab/crest/pull/92)
* Attempt at cleaning up the 'axis' routine mess across the code. by @pprcht in [#95](https://github.com/grimme-lab/crest/pull/95)
* Update of topology check option `--notpo` by @pprcht in [#102](https://github.com/grimme-lab/crest/pull/102)
* Modified CREGEN to handle relative energies in ensemble file by @pprcht in [#113](https://github.  com/grimme-lab/crest/pull/113)
* Changes to printouts and some code-cleanup by @pprcht in [#118](https://github.com/grimme-lab/     crest/pull/118)
* Several bugfixes by @cplett, @MtoLStoN, @pprcht in [#101](https://github.com/grimme-lab/crest/pull/101) [#115](https://github.com/grimme-lab/crest/pull/115) [#117](https://github.com/grimme-lab/crest/pull/117)

**Full Changelog**: [https://github.com/grimme-lab/crest/compare/v2.11.2...v2.12](https://github.com/grimme-lab/crest/compare/v2.11.2...v2.12)


## 2.11.2

* More robust search for MKL in CMake build files by @awvwgk in [#71](https://github.com/grimme-lab/crest/pull/71)
* Allows compilation of CREST with OpenBLAS by @awvwgk in [#78](https://github.com/grimme-lab/crest/pull/78)
* Workaround for `no convergence in svdcmp` error in RMSD module by @pprcht in [#89](https://github.com/grimme-lab/crest/pull/89)
* QCG implementation by @cplett in [#90](https://github.com/grimme-lab/crest/pull/90)


## 2.11.1

- Various small fixes and printout changes (#33, #37, #46, #51, #58, #67) 
- Added asciidoc man page (#60)  
- Improved memory handling for topology detection (#63)
- Added routine for reading a file with atomic charges for GFN-FF calculations (`--charges`) (#63)
- Added a simple PDB input format reader (#44) 
- New routine for additional XH orientation sampling (`--hflip`/`--noflip`). Will be conducted **by default** after MTD sampling (#63, #70)


## 2.11

- Moved `crest` source code to the [repository](https://github.com/grimme-lab/crest)
- Rewritten ensemble sorting routine CREGEN
- Connectivity/topology checks in CREGEN (can be turned off with `--notopo`)
- Optional PCA and k-Means clustering after sorting (`--cluster <number>`)
- Multiple smaller tools and improvements implemented
- Updated input reader for Turbomole coord, .xyz and 3D .sdf (V2000,V3000) formats
- Turned off `zsort` default input sorting of coordinates
- Enabled `--alpb` usage (new implicit solvation model in `xtb`)
- Reduced creation of files during optimizations
- Dedicated ensemble entropy (`--entropy`) mode and iMTD-sMTD workflow (`--v4`), see  [preprint](https://doi.org/10.26434/chemrxiv.13626083.v1)


---

## 2.10.2


- Code cleanup (pt. 2)
- New flag `-gfn2//gfnff`, experimental composite mode, structure generation at GFN-FF level, energies at GFN2-xTB level (singlepoint calculations)
- New flag `-trev`, reverse settings for tautomerization algorithm, i.e., first deprotonation then protonation
- Bugfix: `-scratch` did not copy back the `crest_ensemble.xyz` file :beetle:
- New flag `-keepscratch` to prohibit deletion of a scratch directory
- Some minor printout changes and fixes
- Bugfix: input error for automatic bond constraint (`-cbonds`) :beetle:



## 2.10

- Major code cleanup (pt. 1)
- Moved `crest` from `xtb` to its own repository
- Proper `SIGTERM` and `SIGINT` handling implemented
- Bugfix: Repaired integer overflow in ensemble sorting routine :beetle:
- Reduced memory consumption in ensemble sorting
- Improved efficiency of ensemble sorting (for large ensembles)
- Implemented automatic bond length constraint (`-cbonds `)

