---
layout: default
title: Release 2.10
parent: Releases
nav_order: 2
toc: false
summary: "Release notes for CREST versions 2.10.x"
permalink: /docs/examples/release_210.html
---

# CREST Release versions 2.10.x
{: .no_toc }

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

