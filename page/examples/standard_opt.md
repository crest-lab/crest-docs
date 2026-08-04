---
layout: default
title: "Geometry Optimizations"
parent: "Standard Runtypes"
grand_parent: "Examples and Guides"
nav_order: 2
toc: false
summary: "Relaxing a structure to the nearest minimum with the internal ANCOPT optimizer."
permalink: /page/examples/standard_opt.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## The `--opt` runtype

`--opt` relaxes the input structure to the nearest local minimum. Since CREST 3.0 the
optimizer is a standalone implementation and no longer a call to `xtb`: **ANCOPT**, a
rational-function optimizer with a BFGS update, working in *approximate normal coordinates*
rather than in Cartesians. Working in ANCs is what makes the optimization converge in a
handful of cycles instead of dozens.
{: .text-justify }

The effect is easiest to see on a large, floppy molecule, where a Cartesian-space optimizer
spends most of its effort untangling coupled soft modes:
{: .text-justify }

{% include image.html file="ancopt_convergence.png" alt="Convergence of ANCOPT compared to L-BFGS for taxol" caption="Convergence of ANCOPT (blue/cyan) against a plain L-BFGS optimizer (red/pink) for taxol (paclitaxel). Left axis and the smooth curves: energy relative to the converged minimum. Right axis and the noisy curves: RMS force. Both axes are logarithmic." %}

Taxol is a good stress test for an optimizer: a fused taxane core with several ester side
chains and a flexible benzamide tail, so the soft torsional modes are strongly coupled to
each other. ANCOPT reaches the minimum in roughly 240 steps where L-BFGS needs about 425,
and it gets the energy down faster throughout, not just at the end. The RMS force is the
noisier quantity in both cases, which is why the energy change alone is not a sufficient
convergence criterion.
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-opt-1" onclick="openTabId(event, 'opt-1-cmd', 'tab-opt-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-opt-1" onclick="openTabId(event, 'opt-1-toml', 'tab-opt-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-opt-1" onclick="openTabId(event, 'opt-1-out', 'tab-opt-1')">{{ site.data.icons.checkfile }} <code>output (excerpt)</code></button>
</div>
<!-- Tab content -->
<div id="opt-1-cmd" class="tabcontent tab-opt-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--opt</span> <span class='nt'>--gfn2</span> <span class='nt'>-T</span> 4" %}
</div>
<div id="opt-1-toml" class="tabcontent tab-opt-1" style="font-size:10px">
{% capture opt_toml %}
# Geometry optimization
input   = "struc.xyz"
runtype = "optimize"            # alias: "ancopt"
threads = 4

[calculation]
optlev = "normal"               # optimization threshold preset

[[calculation.level]]
method = "gfn2"
{% endcapture %}
{% include codecell.html content=opt_toml %}
</div>
<div id="opt-1-out" class="tabcontent tab-opt-1" style="font-size:10px">
{% capture opt_out %}
  {% include outputs/std_opt_output.txt %}
{% endcapture %}
{% include codecell.html content=opt_out %}
</div>
{% include defaulttab.html %}

The setup block printed at the start lists everything the optimizer was configured with,
including the two convergence criteria that have to be met simultaneously: the energy change
between cycles and the gradient norm. Each cycle then reports both, together with the
displacement, and flags them as `converged δE/grad : True / True` once satisfied.
{: .text-justify }

For the 1-propanol example this takes five cycles and gains 0.69 kcal/mol over the input
geometry.
{: .text-justify }

Two files are written:
{: .text-justify }

| File | Content |
|---|---|
| `crestopt.xyz` | the final optimized geometry |
| `crestopt.log.xyz` | the step-by-step optimization trajectory, one frame per cycle |

{% include note.html content="The trajectory file was called <code>crestopt.log</code> before CREST 3.1. It now carries an explicit <code>.xyz</code> extension so that external viewers recognize it, which is worth knowing when adapting older scripts." %}

---

## Optimization levels

How tightly the structure is relaxed is controlled by an optimization level, given directly
after `--opt` on the command line or as `optlev` in the `[calculation]` block. The level
scales both convergence thresholds at once:
{: .text-justify }

| Level | Numeric | Meaning |
|---|:--:|---|
| `crude` | −3 | very loose, for pre-screening only |
| `vloose`, `sloppy` | −2 | loose |
| `loose` | −1 | |
| `normal` | 0 | default |
| `tight` | 1 | |
| `verytight`, `vtight` | 2 | for frequency calculations |
| `extreme` | 3 | tightest |

Run on the same input, the levels differ in cost and in how far they push the energy down:
{: .text-justify }

| Level | Cycles | Total energy / *E*<sub>h</sub> |
|---|:--:|---|
| `crude` | 3 | −14.5585662707 |
| `normal` | 5 | −14.5585939330 |
| `tight` | 6 | −14.5585945329 |
| `vtight` | 12 | −14.5585959150 |

The spread between `crude` and `vtight` is 0.019 kcal/mol here, well below the accuracy of
the underlying method. This is why the conformational search workflows optimize at loose
levels for most of their intermediate steps and only tighten up at the end.
{: .text-justify }

{% include tip.html content="Use <code>vtight</code> whenever a Hessian is computed afterwards. A numerical frequency calculation on a structure that is not fully relaxed produces spurious imaginary modes." %}

---

## Optimization with frequencies

`--ohess` runs the optimization and follows it directly with a numerical Hessian, giving
vibrational frequencies and a full thermochemical analysis at 298.15 K:
{: .text-justify }

{% include command.html cmd="crest struc.xyz <span class='nt'>--ohess</span> <span class='nt'>--gfn2</span> <span class='nt'>-T</span> 4" %}

{% capture ohess_out %}
          ::       THERMODYNAMICS at      298.15 K        ::
          ::::::::::::::::::::::::::::::::::::::::::::::::::
          :: TOTAL FREE ENERGY        -14.479960446075 Eh ::
          ::----------------------------------------------::
          :: total energy             -14.558594533089 Eh ::
          :: ZPVE                       0.106452687996 Eh ::
          :: G(RRHO) w/o ZPVE          -0.027818600982 Eh ::
          :: G(RRHO) total              0.078634087014 Eh ::
          ::::::::::::::::::::::::::::::::::::::::::::::::::
{% endcapture %}
{% include codecell.html content=ohess_out style="font-size:12px" %}

Low-frequency modes are treated with the modified (quasi-)RRHO approximation rather than the
harmonic one, with the cutoff and entropy model reported above the table. In addition to the
optimization output, this writes:
{: .text-justify }

| File | Content |
|---|---|
| `numhess` | the Hessian matrix in Turbomole format |
| `vibspectrum` | frequencies in cm<sup>−1</sup> and IR intensities in km/mol |
| `g98.out` | frequencies and normal modes in Gaussian output format, for visualization |

{% include note.html content="A frequency-only run on an already optimized structure is available as <code>--hess</code> (alias <code>--numhess</code>). The Hessian is numerical in both cases, so the cost grows with the number of atoms." %}

---

## Optimizing a whole ensemble

To relax every structure of an existing ensemble instead of a single geometry, use the
ensemble optimization runtype, which parallelizes over the structures:
{: .text-justify }

{% include command.html cmd="crest <span class='nt'>--mdopt</span> crest_conformers.xyz <span class='nt'>--gfn2</span> <span class='nt'>-T</span> 8" %}

This is documented in detail on the
[Ensemble Optimization]({{site.baseurl}}/page/examples/utilities/utils_1.html) page, which
also covers `--screen`, the variant that additionally sorts and filters the result.
{: .text-justify }
