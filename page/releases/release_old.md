---
layout: default
title: Release 2.12 and older
parent: Releases
nav_order: 4
toc: false
summary: "Release notes for previous CREST versions"
permalink: /page/releases/release_old.html
---

# CREST Release versions 2.12 and older
{: .no_toc }

---

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

