---
layout: default
title: Release 3.0 Preview
parent: Releases
nav_order: 1
toc: false
summary: "Notes for the upcomming CREST version"
permalink: /page/releases/release_preview.html
---

# CREST Release 3.0 Preview
{: .no_toc }

<div class="label label-green">CREST 3.0 preview</div>

---


## CREST 3.0 Preview

- New [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html "Documentation / Input Files")
- Energy- and gradient-based interface for calculations
- Standalone ANCOPT implementation (RF optimizer with BFGS update step in approximate normal coordinates)
- Standalone MD and metadynamics module
- Standalone implementation of geometrical constraints
- New minimum energy crossing point (MECP) algorithm (see [**Examples/MECP Calaculations**](../examples/mecp   "Examples / MECP Calculations"))


---

To try out new implementations of CREST 3, build the development version [**from source**](../installation/install_compile.html).
The respective code can be found in the `3.0dev` branch of the repository:
{% include image.html file="install-3dev.png" %}
