---
layout: default
title: "Composite calculators"
parent: "Special Calculators"
grand_parent: "Examples and Guides"
nav_order: 1
toc: false
summary: "Combining a fast workhorse method with a higher level of theory for refinement."
permalink: /page/examples/composite.html
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

## Why composite setups?

A conformational search is dominated by the sheer *number* of energy and gradient
evaluations, not by the cost of a single one.
The small example at the bottom of this page, a conformer search for alanineglycine with
all of 20 atoms, needs about 2.8 &times; 10<sup>5</sup> energy+gradient calls.
At GFN-FF this takes 18 seconds; at a DFT level it would take weeks.
{: .text-justify }

The way out is to *split* the workflow between two levels of theory:
{: .text-justify }

- a fast **workhorse** method that drives the metadynamics, the optimizations and the
  ensemble generation, and
- a more accurate **quality** method that is applied only where it changes the result,
  namely to the (comparatively few) structures that survive the search.

CREST supports this directly, both through short command line arguments and through
`[[calculation.level]]` blocks of a
[TOML input file]({{site.baseurl}}/page/documentation/inputfiles.html).
{: .text-justify }

---

## Command line notation

Composite methods are requested as a single argument that combines both levels,
`--<A><separator><B>`, where **A is always the higher level** and **B the workhorse**.
The separator selects *when* the quality level is applied:
{: .text-justify }

| Argument | Refinement stage | What happens |
|----------|------------------|--------------|
| `--<A>//<B>` <br> `--<A>/sp/<B>` | inline single-point | after every optimization within the workflow, the ensemble energies are recomputed at `<A>`; geometries stay at `<B>` |
| `--<A>/opt/<B>` | inline geometry optimization | the surviving structures are re-optimized at `<A>` during the workflow |
| `--<A>@<B>` | post-search optimization | the search runs entirely at `<B>`; all final conformers are re-optimized at `<A>` afterwards |

For all three forms, `<A>` and `<B>` must be one of the built-in method tokens
`gfn0`, `gfn1`, `gfn2`, `gxtb`, `gfnff`.
Arbitrary calculators (ORCA, MLIPs, ...) can be combined the same way through a TOML
input file, [see below {{site.data.icons.adown}}](#the-same-thing-in-toml).
{: .text-justify }

{% include note.html content="A composite argument selects the <em>levels</em>, not the workflow. The runtype still has to be given, <em>e.g.</em> <code>--imtdgc</code> for the iMTD-GC conformer search or <code>--opt</code> for a geometry optimization." %}

### Example

The following runs the iMTD-GC conformer search of alanineglycine at GFN-FF and re-ranks
the ensemble with GFN2-xTB single-points:
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-comp-1" onclick="openTabId(event, 'comp-1-cmd', 'tab-comp-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-comp-1" onclick="openTabId(event, 'comp-1-struc', 'tab-comp-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
  <button class="tablinks tab-comp-1" onclick="openTabId(event, 'comp-1-out', 'tab-comp-1')">{{ site.data.icons.checkfile }} <code>output (excerpt)</code></button>
</div>
<!-- Tab content -->
<div id="comp-1-cmd" class="tabcontent tab-comp-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--imtdgc</span> <span class='nt'>--gfn2//gfnff</span> <span class='nt'>-T</span> 8" %}
</div>
<div id="comp-1-struc" class="tabcontent tab-comp-1" style="font-size:10px">
{% capture comp_struc %}
20

C     2.081440     0.615100    -0.508430
C     2.742230     1.824030    -1.200820
N     4.117790     1.799870    -1.190410
C     4.943570     2.827040    -1.822060
C     6.440080     2.569360    -1.637600
O     7.351600     3.252270    -2.069090
N     0.610100     0.695090    -0.538780
O     2.095560     2.724940    -1.739670
O     6.705220     1.463410    -0.897460
H     0.303080     1.426060     0.103770
H     0.338420     1.050680    -1.460480
C     2.488753    -0.593400    -1.198448
H     2.416500     0.557400     0.532050
H     4.614100     1.081980    -0.670550
H     4.699850     3.794460    -1.373720
H     4.722890     2.844690    -2.894180
H     7.687400     1.448620    -0.860340
H     2.029201    -1.457008    -0.719999
H     2.170233    -0.542411    -2.238576
H     3.572730    -0.688405    -1.154998
{% endcapture %}
{% include codecell.html content=comp_struc %}
</div>
<div id="comp-1-out" class="tabcontent tab-comp-1" style="font-size:10px">
{% capture comp_out %}
  {% include outputs/composite_output.txt %}
{% endcapture %}
{% include codecell.html content=comp_out %}
</div>
{% include defaulttab.html %}

The two levels are listed separately in the *Calculation info* block, and the second one
is marked with its `refinement stage`. During the run, the refinement appears as its own
`ensemble refinement` step.
{: .text-justify }

---

## Post-search refinement

The refinement can also be requested independently of the sampling level, which is
useful to re-rank or re-optimize an ensemble at the end of an otherwise unchanged
workflow:
{: .text-justify }

| Argument | Description |
|----------|-------------|
| `--refine <METHOD>` | add an inline single-point refinement at `<METHOD>` (equivalent to the `//` form) |
| `--rerank <METHOD>` | re-compute single-point energies of the *final* ensemble at `<METHOD>` and re-sort; geometries unchanged |
| `--reopt <METHOD>` | re-optimize all conformers of the final ensemble at `<METHOD>` and re-sort via CREGEN |
| `--finalhess` | Hessian and free-energy re-ranking of the final ensemble, *i.e.*, Boltzmann weights from *ΔG* instead of *ΔE* |

---

## The same thing in TOML

In a TOML input file, a composite setup is simply a second `[[calculation.level]]` block
that carries a `refine` key. The level *without* `refine` is the workhorse; the level
*with* it is applied at the given stage:
{: .text-justify }

{% capture comp_toml %}
# GFN-FF sampling, GFN2-xTB re-ranking (identical to --gfn2//gfnff)
input   = "struc.xyz"
runtype = "imtd-gc"
threads = 8

[calculation]
[[calculation.level]]           # workhorse: drives MTD and optimizations
method = "gfnff"

[[calculation.level]]           # quality level, only used for refinement
method = "gfn2"
refine = "sp"
{% endcapture %}
{% include codecell.html content=comp_toml style="font-size:12px" %}

The `refine` key accepts:
{: .text-justify }

| Value | Meaning |
|-------|---------|
| `sp`, `singlepoint` | single-point re-ranking of the ensemble |
| `opt`, `optimization` | geometry re-optimization of the ensemble |
| `add`, `correction` | single-point energy of this level is *added* to the workhorse energy |
| `freq`, `deltag` | Hessian/free-energy (*δG*) correction |

Since this is an ordinary `[[calculation.level]]` block, **any** calculator can serve as
the quality level, including the ones that are far too expensive to drive a search
themselves:
{: .text-justify }

{% capture comp_toml2 %}
# GFN-FF sampling, DFT re-ranking through an ORCA subprocess
input   = "struc.xyz"
runtype = "imtd-gc"
threads = 12

[calculation]
[[calculation.level]]
method = "gfnff"

[[calculation.level]]
orca_input  = "! r2scan-3c def2/J TightSCF"
orca_cmd    = "/PATH/TO/ORCA/orca"
threads     = 4                 # cores per ORCA call
orca_memory = 3000
refine      = "sp"
{% endcapture %}
{% include codecell.html content=comp_toml2 style="font-size:12px" %}

{% include tip.html content="This is the recommended way to use the <a href='orca.html'>ORCA</a> and <a href='mlip.html'>MLIP</a> calculators: let a semiempirical method do the sampling and spend the expensive level only on the final ensemble. See the per-level <code>threads</code> settings in the <a href='../documentation/inputfiles.html#per-level-thread-reservation'>input file documentation</a> for how to parallelize such runs." %}
