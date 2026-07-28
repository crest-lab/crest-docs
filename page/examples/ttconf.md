---
layout: default
title: "TTConf Conformer Search"
parent: "Examples and Guides"
nav_order: 2
has_children: false
toc: true
summary: "The tensor-train (TTConf) conformer search: what it is, how to tune it, and a worked example."
permalink: /page/examples/ttconf.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.1</div>

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is TTConf?

The `-ttconf` runtype is CREST's **reimplementation of the tensor-train (TT) conformer search**
originally introduced by
[Zurek *et al.*, *J. Chem. Theory Comput.* **2025**](https://doi.org/10.1021/acs.jctc.4c01275).
It reproduces the algorithm of that publication within CREST, so that it plugs into the usual CREST
level-of-theory and ensemble-handling machinery, with one deliberate deviation: ring conformations
are handled by a GFN-FF metadynamics generator (see [Ring sampling](#ring-sampling) below), a
drop-in replacement for the ring treatment of the original method.
{: .text-justify }

Instead of sampling conformers with (meta)dynamics, TTConf works on a **discrete grid**:
each rotatable dihedral (and, optionally, each flexible ring) is treated as a variable that can
take a small number of grid values. The full grid of all dihedral combinations is astronomically
large, so it is never enumerated. Instead, the low-energy region is located directly with a
**TT-cross sweep**, which reconstructs the important part of the energy tensor from a small number
of oracle (energy) evaluations. Optimized grid minima are then collected, sorted with CREGEN, and
written out as the standard CREST ensemble.
{: .text-justify }

Because the search is guided by the tensor structure rather than by diffusion through phase space,
TTConf typically needs **far fewer energy evaluations** than the default metadynamics-based
search to reach the same low-energy conformers; most of its speed advantage comes from this.
{: .text-justify }

The final output files are the standard CREST ensemble files
`crest_conformers.xyz`, `crest_rotamers.xyz` and `crest_best.xyz`.
{: .text-justify }

{% include note.html content="TTConf is designed for a <b>single covalent molecule</b>. A warning is printed if the input contains more than one covalent fragment." %}

---

## Comparison with the default iMTD-GC search

The figure below compares the TTConf search against CREST's default
[iMTD-GC workflow]({{site.baseurl}}/page/overview/workflows.html#imtd-gc-algorithm) on the CD25 drug-molecule
benchmark. **Both** methods were run with the same GFN-FF level of theory, so the comparison
isolates the search algorithm itself. The figure labels the tensor-train search *TTConf-light*,
which is the `-ttconf` reimplementation described here.
{: .text-justify }

{% include image.html file="ttconf_comparison.png" alt="TTConf vs iMTD-GC on the CD25 benchmark" caption="CD25 benchmark, the TTConf search (labelled TTConf-light in the plots) vs the default iMTD-GC search (both at GFN-FF, 2 runs each). (a) Wall time per molecule. (b) Speedup over iMTD-GC (median ≈ 5.8×). (c) Energy of the located global minimum relative to iMTD-GC (Δ<i>E</i> < 0 means TTConf found the lower minimum). (d) Per-molecule wall-time correlation." %}

Panels (a), (b) and (d) show that TTConf is consistently faster, with a **median speedup of
about 5.8×** and larger gains for the more flexible molecules. Panel (c) shows that this speed does
**not** come at the cost of quality: for most molecules TTConf locates the same global minimum
as iMTD-GC (Δ*E* ≈ 0), and in several cases it finds a *lower* one. A handful of molecules land on a
slightly higher minimum; for those, a larger preset or grid recovers the reference (see below).
{: .text-justify }

---

## Basic usage

TTConf is selected with the `-ttconf` runtype (command line) or `runtype = "ttconf"`
(TOML input file). For a molecule in `struc.xyz`, run at GFN-FF:
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-tt-1" onclick="openTabId(event, 'ttcommand', 'tab-tt-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-tt-1" onclick="openTabId(event, 'tttoml', 'tab-tt-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
</div>
<!-- Tab content -->
<div id="ttcommand" class="tabcontent tab-tt-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz -ttconf --gfnff -T 8" %}
<b>OR</b> drive everything from an input file
{% include command.html cmd="crest input.toml" %}
<span markdown="span">
Here `-ttconf` selects the TTConf search with its default (`normal`) preset,
`--gfnff` sets the GFN-FF level of theory and `-T 8` requests 8 CPU threads.
Individual `-tt…` flags (see below) can be appended to override the preset.
</span>
</div>
<div id="tttoml" class="tabcontent tab-tt-1" style="font-size:10px">
{% capture ttconf_basic %}
# TTConf with the default preset
input = "struc.xyz"
runtype = "ttconf"
threads = 8

[calculation]
[[calculation.level]]
method = "gfnff"
{% endcapture %}
{% include codecell.html content=ttconf_basic %}
</div>
{% include defaulttab.html %}

The full list of command line flags is documented under
[**TTConf Options** <i class='fa-solid fa-book'></i>]({{site.baseurl}}/page/documentation/keywords.html#ttconf-options),
and the equivalent TOML keys under the
[**`[ttconf]` block** <i class='fa-solid fa-book'></i>]({{site.baseurl}}/page/documentation/inputfiles.html#ttconf-block).
{: .text-justify }

---

## Choosing a setting

### Presets: accuracy vs. speed

The quickest way to trade cost against thoroughness is a **preset**, which sets the TT rank *r*
(how much of the energy tensor is reconstructed) and the number of TT-cross sweeps *s*:

| Preset | rank *r* | sweeps *s* | when to use |
|--------|:--------:|:----------:|-------------|
| `fast` | 2 | 2 | quick screening, rigid or small molecules |
| `normal` *(default)* | 3 | 8 | general-purpose searches |
| `accurate` | 6 | 6 | flexible molecules, or when a preset missed the global minimum |

A preset is passed directly after `-ttconf` (or as `preset = "..."` in TOML). If a `normal` run
lands on a slightly high minimum, moving up to `accurate` and/or increasing `-ttgrid` is usually
enough to recover it:
{: .text-justify }

{% include command.html cmd="crest struc.xyz -ttconf accurate -ttgrid 12 --gfnff -T 8" %}

### Brute-force oracle

For small molecules, or to obtain a reference result, the TT-cross sweep can be replaced by an
**exhaustive brute-force oracle** that evaluates every grid point. This is exact on the chosen grid
but scales exponentially with the number of variables, so it is only practical for a few rotatable
bonds. Select it with the `bruteforce` keyword (aliases `brute`, `oracle`):
{: .text-justify }

{% include command.html cmd="crest struc.xyz -ttconf bruteforce --gfnff" %}

{% include tip.html content="Use <code>bruteforce</code> on a small fragment to check that the TT-cross sweep and the grid resolution are dense enough for your system, then switch back to a preset for production." %}

### Singlepoints only

By default TTConf geometry-optimizes the grid minima. With `-ttsp` (`singlepoint = true`)
the whole run uses **singlepoints only**, with no geometry optimization anywhere. This is much faster
and useful for a fast ranking on a fixed grid, at the cost of unrelaxed geometries.
{: .text-justify }

### Ring sampling

Rotatable single bonds are detected automatically. Flexible **rings** are only sampled when
requested with `-ttrings` (`ringsample = true`), which adds ring conformations as extra TT sites.
The ring generator is chosen with `-ttringmethod`: `mtd` (GFN-FF metadynamics on an isolated ring
cut-out, the default) or `template`. In-ring bonds can additionally be promoted to TT variables
with `-ttringbonds`.
{: .text-justify }

This is the one place where the CREST reimplementation deliberately deviates from the original
publication: the `mtd` generator is a **drop-in replacement** for the way the original method
treated rings, sampling ring conformations with a short GFN-FF metadynamics on the isolated ring
rather than the original scheme.
{: .text-justify }

{% capture ttconf_rings %}
input = "macrocycle.xyz"
runtype = "ttconf"
threads = 8

[ttconf]
preset = "accurate"
ringsample = true
ringmethod = "mtd"

[calculation]
[[calculation.level]]
method = "gfnff"
{% endcapture %}
{% include codecell.html content=ttconf_rings %}

### User-defined TT variables (TOML only)

To force a specific set of rotatable bonds to be the TT variables, list them in the `bonds` key of
the `[ttconf]` block. This has **no command line equivalent** (atom-pair arrays are awkward on the
command line). Each entry is an atom pair `[A, B]`, or `[A, B, npoints]` to give that bond its own
grid resolution:
{: .text-justify }

{% capture ttconf_bonds %}
[ttconf]
bonds = [[1, 2], [3, 4, 12]]   # bond 1–2 on the default grid, bond 3–4 on a 12-point grid
# bonds = [1, 2]               # single pair, flat form
{% endcapture %}
{% include codecell.html content=ttconf_bonds %}

{% include important.html content="Specifying <code>bonds</code> <b>replaces</b> the automatic bond selection entirely: only the listed bonds become TT variables, and the auto-detected bonds are shown as <code>user-excl</code> in the dihedral table. A listed pair must be a rotatable bond in the Z-matrix (either atom order); a pair that is not is warned about and ignored." %}

### Reproducibility

TTConf seeds a few random initial tails, so runs are non-deterministic by default. Fix the
RNG seed with `-ttseed <int>` (`seed = <int>`) to make a run reproducible.
{: .text-justify }

---

## A fully specified input file

The following `input.toml` collects the most common settings (an `accurate` preset on a finer
grid, singlepoint-only evaluation, and ring sampling), all at the GFN-FF level:
{: .text-justify }

{% capture ttconf_full %}
input = "struc.xyz"
runtype = "ttconf"
threads = 8

[ttconf]
preset = "accurate"
grid = 12
ewin = 8.0
singlepoint = true
ringsample = true
ringmethod = "mtd"
# bonds = [[1, 2], [2, 3, 12]]   # optional: user-defined TT variables

[calculation]
[[calculation.level]]
method = "gfnff"
{% endcapture %}
{% include codecell.html content=ttconf_full %}

Run it with:

{% include command.html cmd="crest input.toml > crest.out" %}

The resulting conformer ensemble is written to `crest_conformers.xyz` (conformers),
`crest_rotamers.xyz` (conformers *and* rotamers) and `crest_best.xyz` (the lowest structure),
exactly as for the other CREST search runtypes.
{: .text-justify }
