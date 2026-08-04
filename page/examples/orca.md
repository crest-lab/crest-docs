---
layout: default
title: External QM programs (<code>ORCA</code>)
parent: "Special Calculators"
grand_parent: "Examples and Guides"
nav_order: 3
toc: false
summary: "Using ORCA as an external energy+gradient backend, including core and memory control."
permalink: /page/examples/orca.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.1</div>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ORCA as an engrad backend

CREST does not implement DFT itself, but it can call
[**ORCA** {{ site.data.icons.ext }}](https://www.faccts.de/orca/) as an energy+gradient
"black box".
For every calculation step CREST writes the current geometry to an `ORCA.in` file,
launches ORCA, and reads back energy and gradient from the resulting `ORCA.engrad` file.
This makes it possible to run the CREST optimizers, MD/metadynamics, and (with the
according computational budget) conformational sampling on top of essentially any level
of theory that ORCA provides.
{: .text-justify }

The ORCA calculator is set up entirely within a `[[calculation.level]]` block of a
[TOML input file]({{site.baseurl}}/page/documentation/inputfiles.html); there is no
command line shortcut for it.
{: .text-justify }

{% include important.html content="The ORCA binary is not shipped with CREST. The path given via <code>orca_cmd</code> must point to a working local ORCA installation. Since ORCA requires its own absolute path for the parallel (MPI) startup, an absolute path should be used." %}

{% include warning.html content="Every energy+gradient call spawns a full ORCA process, writes its input and parses its output. Even for small and medium-sized systems this is far slower than the built-in semiempirical methods, and a conformational search needs 10<sup>5</sup>–10<sup>6</sup> such calls. Driving a search directly at an ORCA level is therefore <b>not recommended</b>; use it for optimizations, or as the refinement level of a <a href='composite.html'>composite setup</a>." %}

---

## Example 1: Geometry optimization with r2SCAN-3c

The following optimizes *n*-pentane with the ANCOPT optimizer, using ORCA at the
r<sup>2</sup>SCAN-3c level for every energy and gradient evaluation.
The complete ORCA input is assembled from the TOML file; no ORCA template file is
required.
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-orca-1" onclick="openTabId(event, 'orca-1-cmd', 'tab-orca-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-orca-1" onclick="openTabId(event, 'orca-1-toml', 'tab-orca-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-orca-1" onclick="openTabId(event, 'orca-1-struc', 'tab-orca-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
</div>
<!-- Tab content -->
<div id="orca-1-cmd" class="tabcontent tab-orca-1" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
</div>
<div id="orca-1-toml" class="tabcontent tab-orca-1" style="font-size:10px">
{% capture toml_orca %}
# Geometry optimization driven by an external ORCA subprocess
runtype = "ancopt"              # geometry optimization
input   = "struc.xyz"           # input structure file (n-pentane)
threads = 6                     # total cores available to CREST

[calculation]
eprint = true                   # print energies of each level
elog   = "energies.log"         # write energies to this file

[[calculation.level]]           # ORCA subprocess level
chrg        = 0                                       # molecular charge
orca_input  = "! r2scan-3c def2/J TightSCF DefGrid3"  # ORCA simple-input line
threads     = 4                                       # -> %pal nprocs 4 end
orca_memory = 3000                                    # -> %maxcore 3000 (per core, MB)
orca_cmd    = "/PATH/TO/ORCA/orca"                    # ORCA executable (absolute path!)
{% endcapture %}
{% include codecell.html content=toml_orca %}
</div>
<div id="orca-1-struc" class="tabcontent tab-orca-1" style="font-size:10px">
{% capture struc_pentane %}
17

C          1.01345        0.03607        0.09861
C          2.53394        0.02164        0.09279
C          3.06868       -1.30583       -0.44095
C          4.59607       -1.33129       -0.45117
C          5.11656       -2.65659       -0.98404
H          0.64349        0.99143        0.48273
H          0.61732       -0.76293        0.73332
H          0.61733       -0.10119       -0.91255
H          2.90063        0.19007        1.11182
H          2.90061        0.84861       -0.52601
H          2.69232       -1.47051       -1.45805
H          2.69232       -2.12875        0.17907
H          4.97972       -1.17391        0.56357
H          4.97973       -0.51527       -1.07454
H          4.77240       -3.48984       -0.36305
H          6.21062       -2.66240       -0.98638
H          4.77240       -2.82803       -2.00901
{% endcapture %}
{% include codecell.html content=struc_pentane %}
</div>
{% include defaulttab.html %}

The `orca_input` keyword takes the ORCA *simple-input* line (the `!` line).
CREST processes it before writing the actual ORCA input:
{: .text-justify }

- any runtype keyword (`Opt`, `OptTS`, `Freq`, `NumFreq`, `MD`, `SP`, `GOAT`, `IRC`, ...)
  is stripped, since CREST always requests a single `EnGrad` job,
- any `PAL`*n* keyword is removed, because the parallelization is taken from `threads`,
- `EnGrad` is appended, and
- the `%pal` and `%maxcore` blocks as well as the coordinate block are added.

For the input above, the `ORCA.in` written by CREST therefore looks like
{: .text-justify }

{% capture orcain %}
! r2scan-3c def2/J TightSCF DefGrid3 EnGrad
%pal nprocs 4 end   # set by CREST (level threads)
%maxcore 3000   # set by CREST (per core, MB)

*xyz 0 1  # charge and multiplicity (2S+1)
 C        1.013450000000000        0.036070000000000        0.098610000000000
 ...
*
{% endcapture %}
{% include codecell.html content=orcain style="font-size:12px" %}

The ORCA output of the last call is kept as `ORCA.out`, the optimized structure is
written to `crestopt.xyz`.
{: .text-justify }

{% include note.html content="Charge and multiplicity are taken from the CREST settings (<code>chrg</code> and <code>uhf</code> of the level) and written into the coordinate block. ORCA uses the spin multiplicity 2<i>S</i>+1, which CREST derives from the <code>uhf</code> value automatically, so do not put charge/multiplicity into <code>orca_input</code>." %}

---

## Controlling cores and memory

The per-level `threads` keyword (alias `ncores`) sets how many cores **one** ORCA call
may use.
It is written into the ORCA input as `%pal nprocs <threads> end` and, at the same time,
tells CREST how many calculations may run concurrently:
{: .text-justify }

$$
  N_\text{jobs} \times N_\text{threads}^\text{level} \le N_\text{threads}^\text{total}
$$

With the settings of the example above (global `threads = 6`, level `threads = 4`) a
parallel workflow would run **one** job at a time with 4 cores for ORCA, and CREST would
print a note that the remaining 2 cores stay idle.
A "clean" setup uses a per-level thread count that divides the total, e.g. 12 total
cores with 4 cores per ORCA call resulting in 3 parallel jobs:
{: .text-justify }

{% capture toml_orca_par %}
# Re-optimization of an existing ensemble with ORCA on 12 cores
runtype        = "optimize_ensemble"
input          = "struc.xyz"
ensemble_input = "crest_conformers.xyz"
threads        = 12             # total cores -> 3 parallel jobs

[[calculation.level]]
orca_input  = "! pbeh-3c"
threads     = 4                 # 4 cores per ORCA call
orca_memory = 2000              # 2 GB per core, i.e. 8 GB per ORCA call
orca_cmd    = "/PATH/TO/ORCA/orca"
{% endcapture %}
{% include codecell.html content=toml_orca_par %}

Note that `orca_memory` (alias `orca_maxcore`) is the ORCA `%maxcore` value, *i.e.*, the
memory **per core** in MB, so the memory of a single ORCA call is roughly
`orca_memory` &times; `threads`, and the memory of the whole CREST run is that value
times the number of parallel jobs.
{: .text-justify }

{% include warning.html content="Setting <code>threads</code> per level is strongly recommended for ORCA. Without it CREST assumes one core per energy+gradient call and will start as many concurrent jobs as there are cores, each of which would then launch its own (potentially parallel) ORCA process." %}

More details on how the reservation influences the job/core split are given in the
[Input File Documentation]({{site.baseurl}}/page/documentation/inputfiles.html#per-level-thread-reservation).
The same settings apply when ORCA is used as the refinement level of a
[composite setup](composite.html), the recommended way to get DFT energies for a
conformer ensemble.
{: .text-justify }

---

## Using an ORCA template file

Instead of `orca_input`, a complete ORCA input file can be provided as a template via
`orca_template`.
CREST then reuses all settings from that file and only replaces the coordinate block for
each call, which is the way to go for input options that do not fit on the simple-input
line (`%scf`, `%method`, `%basis`, ... blocks).
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-orca-2" onclick="openTabId(event, 'orca-2-toml', 'tab-orca-2')" id="open2">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-orca-2" onclick="openTabId(event, 'orca-2-tmpl', 'tab-orca-2')">{{ site.data.icons.codefile }} <code>ORCA.template</code></button>
</div>
<!-- Tab content -->
<div id="orca-2-toml" class="tabcontent tab-orca-2" style="font-size:10px">
{% capture toml_orca_tmpl %}
runtype = "ancopt"
input   = "struc.xyz"
threads = 8

[[calculation.level]]
chrg          = 0
orca_template = "ORCA.template"   # method settings from this file
threads       = 4                 # overrides any %pal in the template
orca_cmd      = "/PATH/TO/ORCA/orca"
{% endcapture %}
{% include codecell.html content=toml_orca_tmpl %}
</div>
<div id="orca-2-tmpl" class="tabcontent tab-orca-2" style="font-size:10px">
{% capture orca_tmpl %}
! wB97X-3c EnGrad TightSCF DefGrid3
%scf
  maxiter 250
end
%maxcore 3000
{% endcapture %}
{% include codecell.html content=orca_tmpl %}
</div>
{% include defaulttab.html id="open2" %}

If `threads` is set for the level, CREST takes ownership of the parallel setup: existing
`%pal ... end` blocks (single- or multi-line) and `PAL`*n* keywords in the template are
removed and replaced by CREST's own `%pal nprocs <threads> end` line.
The same happens to `%maxcore` if `orca_memory` is given.
Without both keys the template is written out verbatim, *i.e.*, the parallelization is
entirely up to the template, which is also the behavior of CREST versions before
3.1.
{: .text-justify }

{% include important.html content="<code>orca_input</code> and <code>orca_template</code> are mutually exclusive; specifying both aborts the run." %}

{% include note.html content="The coordinate block of the template file is irrelevant and can be omitted; CREST always appends the current structure itself." %}

---

## ORCA TOML keyword reference

The following keywords can be set within a `[[calculation.level]]` block when using the
ORCA interface:
{: .text-justify }

| Keyword | Description | Values |
|---------|-------------|--------|
| `method` | Calculator selection. Can be omitted, since any of the `orca_*` keys select the ORCA interface | `"orca"` |
| `orca_cmd` | ORCA executable | (absolute) path string |
| `orca_input` | ORCA simple-input line, from which CREST assembles the input | string, e.g. `"! r2scan-3c def2/J"` |
| `orca_template` | ORCA input file used as a template (excludes `orca_input`) | file path string |
| `orca_memory` (`orca_maxcore`) | ORCA `%maxcore`, memory **per core** in MB | integer |
| `threads` (`ncores`) | Cores per ORCA call (`%pal nprocs`), also caps the number of parallel jobs | integer (default unset) |
| `chrg` (`charge`) | Molecular charge | integer |
| `uhf` | $$N_\alpha - N_\beta$$, converted to ORCA's $$2S+1$$ | integer |
| `dir` (`calcspace`) | Directory in which the ORCA calls are performed | path string |
