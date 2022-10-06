---
layout: default
title: Input File Documentation
parent: Documentation
nav_order: 2
toc: false
summary: "A guide to CREST input files (program versions >3.0)."
permalink: /page/documentation/inputfiles.html
---

# {{page.title}}
{: .no_toc }

This page contains a guide to CREST input files that can be used with program versions >3.0.
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0 preview</div>

---

CREST program instructions via the various [command line arguments](./documentation.html) can become quite lengthy and tedious.
Therefore, following version 3.0 of CREST, input files will be available.
Currently, the input files are *loosely* based on the [**TOML format** {{site.data.icons.ext}}](https://toml.io/en/ "https://toml.io") and we are planning on implementing a [proper TOML parser](https://github.com/toml-f/toml-f) at some point.
{: .text-justify }

CREST input files can be loaded with the `--input` command
```bash
crest --input input.toml
```
where the `input.toml` would look something like this

{% capture infile %}
input = "struc.xyz"
runtype="ancopt"
threads = 9

[calculation]
type = 1 
eprint = true
elog="energies.log"

[[calculation.level]]
method = "xtb"
binary = "xtb-6.5.0"
uhf = 0
flags = "--gfn 2 --grad"
dir = "s0"
{% endcapture %}
{% include codecell.html content=infile style="font-size:12px" %}

As can be seen from this example, the file is hierarchically structured.
At the top level, things like the input coord file name, runtype, and parallelization are specified.
The calculation group (defined by `[ ]`) includes some settings about the internal calculation
 settings and printouts, while its level subgroup (defined by `[[ ]]`) provides the actual method and `xtb` binary.
{: .text-justify }

The documentation of blocks and keywords can be found in the following.

{% include note.html content="Command line arguments that can be found in the [**Keyword Documentation** <i class='fa-solid fa-book'></i>](./keywords.html) will ***overwrite*** the     settings read from CREST input files." %}

---

## Hierarchical structure of CREST input files
{: .no_toc .text-delta }

1. TOC
{:toc}


{% include important.html content="The following lists are incomplete and will be expanded over time until the actual release of CREST 3.0" %}

---

## General settings
These settings are not part of any block and can be specified at the beginning of an input file.

{% include kv.html obj=site.data.inputkv.general %}

---
## `[calculation]` block
The `[calculation]` block contains information on *how* to get energies and gradients for all 
other interfaces, *i.e.*, specification on which programs to run and how to process the 
input/output data from a given list of `[[calculation.level]]` objects ([see below {{site.data.icons.adown}}](#calculationlevel-sub-blocks)).
This block also contains settings for optimizations.

{% include kv.html obj=site.data.inputkv.calculation %}

---
### `[[calculation.level]]` sub-blocks
The `[[calculation.level]]` sub-blocks contain actual information about employed levels of theory,
the used programs, and system specific data such as the molecular charge or number of *α* and *β* electrons.

{% include kv.html obj=site.data.inputkv.calclevel %}


---
### `[[calculation.mecp]]` sub-blocks
A special type of the `[[calculation.level]]` sub-block that is used *only* for the MECP screening workflow.
Instead of setting up a single calculations, this block will set up *two* identical calculations that differ only with regards to their multiplicities (`uhf` parameter).
Input arguments are identical to the [`[[calculation.level]]` options {{site.data.icons.aup}}](#calculationlevel-sub-blocks) but should *not* include any `uhf` or directory specifications.

---
### `[[calculation.constraints]]` sub-blocks
The `[[calculation.constraints]]` sub-blocks are used to introduce constraints.
Constraints are calculated by CREST and added to the energies and gradients.

{% include kv.html obj=site.data.inputkv.constraints %} 


---
## `[dynamics]` block
The `[dynamics]` block is used to define basic settings for CRESTs standalone molecular dynamics 
and metadynamics module. Note, that some `[calculation]` must have been defined.

{% include kv.html obj=site.data.inputkv.dynamics %}

---
### `[[dynamics.meta]]` sub-blocks
The `[[dynamics.meta]]` sub-block is used to define metadynamics parameters for a MD simulation in CREST. Multiple metadynamics potentials can be defined (as separate `[[dynamics.meta]]` sub-blocks) and added to the same MD (`[dynamics]` block).

{% include kv.html obj=site.data.inputkv.metadynamics %}
