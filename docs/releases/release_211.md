---
layout: default
title: Release 2.11
parent: Releases
nav_order: 1
toc: false
summary: "Release notes for CREST versions 2.11.x"
permalink: /docs/examples/release_211.html
---

# CREST Release versions 2.11.x
{: .no_toc }

---


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

