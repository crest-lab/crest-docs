---
layout: default
title: Release 3.0
parent: Releases
nav_order: 3
toc: false
summary: "Release notes for most current CREST version"
permalink: /page/releases/release_current.html
---

# CREST Release 3.0
{: .no_toc }

<div class="label label-green">CREST 3.0</div>

---


## CREST 3.0 

CREST 3.0 is a major overhaul of the previous code versions. A large part of the original source code was rewritten to implement calculators, optimization, and molecular dynamics routines *directly*, rather than relying only on the `xtb` program as a subprocess. 
Consequently, there are performance improvements and a significant reduction of I/O operations.
Read all about the new program version in the new open access article [**J. Chem. Phys. 2024, 160, 114110**](https://doi.org/10.1063/5.0197592).

[Download the program here](https://github.com/grimme-lab/crest/releases/tag/v3.0){: .btn .btn-blue }

Features include:
- New [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html              "Documentation / Input Files")
- Energy- and gradient-based interface for calculations
- Standalone ANCOPT implementation (RF optimizer with BFGS update step in approximate normal         coordinates)
- Standalone MD and metadynamics module
- Standalone implementation of geometrical constraints
- New minimum energy crossing point (MECP) algorithm (see [**Examples/MECP Calaculations**](../      examples/mecp   "Examples / MECP Calculations"))
- Integration of the [**tblite** {{ site.data.icons.github }}](https://github.com/tblite/tblite  "tblite on GitHub") submodule
- Integration of a [**GFN0-xTB** {{ site.data.icons.github }}](https://github.com/pprcht/gfn0) submodule (see [J. Phys. Chem. Lett. 2023, 14, 19, 4440–4448](https://doi.org/10.1021/acs.jpclett.3c00494))
- Integration of the [**TOML-F**  {{ site.data.icons.github }}](https://github.com/toml-f/toml-f)    parser
- Integration of a [**GFN-FF** {{ site.data.icons.github }}](https://github.com/pprcht/gfnff) submodule
- Implementation of a multi-layered multi-center ONIOM calculator (see [J. Phys. Chem. B 2024, 128, 13, 3145–3156](https://doi.org/10.1021/acs.jpcb.4c00104))
- Proper unit tests for the CMake build
