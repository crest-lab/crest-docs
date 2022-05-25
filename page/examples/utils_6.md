---
layout: default
title: xTB Nanoreactor
parent: Utility Tools
grand_parent: Examples
nav_order: 6
toc: false
summary: "How to prepare a xTB nanoreactor calculation with CREST."
permalink: /page/examples/utilities/utils_6.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Preparing a xTB nanoreactor calculation

This is the current workaround for the nanoreactor procedure described in [*JCTC*, **2019**, *15*, 2847-2862.](https://doi.org/10.1021/acs.jctc.9b00143)

*Currently, there isn’t an **automated** procedure for the reactor*, but the workarounds can
be used with the CREST 2.11 version and up.
The important functions here are mainly a definition of *metadynamics parameters* and the *logfermi potential* used for external compression of the system. 
{: .text-justify }


Assuming a given input structure is provided as `start.xyz`, there are 3 steps/commands required:
{: .text-justify}

1. Generate nano-reactor settings with the command 
```bash
crest start.xyz --reactor --genpot <density> --genmtd <sim.length>
```
which will produce a file called `rcontrol` containing the correct `xtb` constraints. 
`<density>` can be the required nano-reactor density in g/cm³ like in the JCTC paper, `<sim.length>` is the metadynamics length in ps. 
All other settings, for example *k* and *α* for the metadynamics, must be directly edited in the `rcontrol` file. This requires some *trial and error* but the JCTC paper is generally a good guideline, too.
2. Run the metadynamics with the generated settings using xtb simply with the command
```bash
xtb start.xyz --gfn 2 --md --input rcontrol
```
The trajectory is saved as `xtb.trj`.

3. To so some (simple) fragment analyzation of `xtb.trj` use 
```bash
crest coord --reactor --fragopt
```
This will extract all fragments from the trajectory based on neighbor lists, optimize their geometry with `xtb` and sort them.

