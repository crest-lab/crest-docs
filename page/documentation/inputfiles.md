---
layout: default
title: Input File Documentation
parent: Documentation
nav_order: 2
has_children: true
toc: false
summary: "A guide to CREST input files (program versions >3.0)."
permalink: /page/documentation/inputfiles.html
---

# {{page.title}}
{: .no_toc }

This page contains a guide to CREST input files that can be used with program versions >3.0.
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0</div>

---

CREST program instructions via the various [command line arguments]({{site.baseurl}}/page/documentation.html) can become quite lengthy and tedious.
Therefore, following version 3.0 of CREST, input files will be available.
Currently, the input files are based on the [**TOML format** {{site.data.icons.ext}}](https://toml.io/en/ "https://toml.io") and are parsed using [**TOML-F**](https://github.com/toml-f/toml-f).
{: .text-justify }

CREST input files can be loaded with the `--input` command
```bash
crest struc.xyz --input input.toml
```
or simply be given as the first argument (the file extension `.toml` is mandatory)
```bash
crest input.toml
```
where the `input.toml` would look something like this

{% capture infile %}
# CREST 3 input file
input = "struc.xyz"   
runtype="ancopt"
threads = 9

[calculation]
elog="energies.log"

[[calculation.level]]
method = "gfn2"
uhf = 0
chrg = 0

{% endcapture %}
{% include codecell.html content=infile style="font-size:12px" %}

As can be seen from this example, the file is hierarchically structured.
At the top level, things like the input coord file name, runtype, and parallelization are specified.
The calculation group (defined by `[ ]`) includes some settings about the internal calculation
 settings and printouts, while its level subgroup (defined by `[[ ]]`) provides the actual method and calculation information.
{: .text-justify }

Some more input file example can be found here:

[Go to Example Input Files <i class="fa-solid fa-book"></i>](inputfiles_examples.html){: .btn .btn-blue }


The documentation of blocks and keywords can be found in the following.

{% include note.html content="Command line arguments that can be found in the [**Keyword Documentation** <i class='fa-solid fa-book'></i>](./keywords.html) will ***overwrite*** the     settings read from CREST input files." %}

---

## Hierarchical structure of CREST input files
{: .no_toc .text-delta }

1. TOC
{:toc}


{% include important.html content="The following lists not extensive and will be expanded over time." %}

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
### Per-level thread reservation
<span class="label label-green">CREST 3.1</span>

Most CREST workflows (conformational sampling, ensemble optimizations, metadynamics)
run **many jobs at the same time**, each of which requires energies and gradients.
By default, CREST assumes that a single energy+gradient call uses one core and
distributes the global `threads` over as many concurrent jobs as possible.
{: .text-justify }

This assumption breaks down for calculators that are themselves parallelized, such as
ORCA subprocesses or ML potentials served by
[`fmlip-relay`]({{site.baseurl}}/page/examples/mlip.html).
For those, the `threads` (or `ncores`) key can be set **inside** a
`[[calculation.level]]` block to reserve a fixed number of cores for each call of
that level:
{: .text-justify }

{% capture thrfile %}
# CREST 3 input file
input   = "struc.xyz"
runtype = "imtd-gc"
threads = 12                 # total cores available to CREST

[[calculation.level]]
method      = "orca"
orca_cmd    = "/path/to/orca"
orca_input  = "! r2scan-3c def2/J TightSCF DefGrid3"
threads     = 4              # cores per ORCA call -> %pal nprocs 4 end
orca_memory = 3000           # -> %maxcore 3000 (per core, MB)
{% endcapture %}
{% include codecell.html content=thrfile style="font-size:12px" %}

With this input CREST will run at most **3 concurrent jobs with 4 cores each** instead
of 12 single-core jobs, and each of those jobs starts an ORCA calculation that is
allowed to use exactly 4 cores.
In general, the number of parallel jobs is capped such that
{: .text-justify }

$$
  N_\text{jobs} \times N_\text{threads}^\text{level} \le N_\text{threads}^\text{total}
$$

where $$N_\text{threads}^\text{level}$$ is the largest `threads` value among all
*active* levels. Two things are worth keeping in mind:
{: .text-justify }

- Levels that hand the reservation down explicitly (`orca` via `%pal`, `mlip` via
  `--max-threads`) are **hard-capped**: they will use exactly that many cores.
  If the total thread count is not a multiple of the reservation, the remaining cores
  stay idle and CREST prints a corresponding `**NOTE**` at the start of the run.
  Other calculators (internal ones, `xtb`, `generic` scripts) instead grow into the
  cores per job via `OMP_NUM_THREADS` and thus soak up the remainder.
- If a single level requests more cores than are available in total, CREST warns and
  falls back to one job using all available cores.

Leaving the per-level `threads` unset (the default) reproduces the behavior of earlier
CREST versions exactly.
{: .text-justify }

{% include tip.html content="For expensive levels it is usually better to run <em>fewer, wider</em> jobs than to oversubscribe the machine. Choose the per-level <code>threads</code> as a divisor of the global <code>threads</code> to avoid idle cores." %}


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

---
## `[cregen]` block
The `[cregen]` block is used for defining global options related to the ensemble sorting procedures.
For more information on the CREGEN procedure see our recent publication in *J Chem Phys*.

{% include kv.html obj=site.data.inputkv.cregen %}

---
## `[ttconf]` block
<span class="label label-green">CREST 3.1</span>

The `[ttconf]` block controls the TTConf tensor-train conformer search (a reimplementation of the
method of Zurek *et al.*), selected with
`runtype = "ttconf"` (or the `-ttconf` command line flag). All keys are optional; a `preset`
can be used as a starting point and any individual key overrides it. Every key except `bonds`
has an equivalent command line flag (see the
[**TTConf Options** <i class='fa-solid fa-book'></i>]({{site.baseurl}}/page/documentation/keywords.html#ttconf-options)),
and command line flags override the values read from the file. A worked example is given on the
[TTConf example page]({{site.baseurl}}/page/examples/ttconf.html).

{% include kv.html obj=site.data.inputkv.ttconf %}

