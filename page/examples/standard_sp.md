---
layout: default
title: "Singlepoint Calculations"
parent: "Standard Runtypes"
grand_parent: "Examples and Guides"
nav_order: 1
toc: false
summary: "Evaluating energy, gradient and molecular properties for a fixed geometry."
permalink: /page/examples/standard_sp.html
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

## The `--sp` runtype

A singlepoint evaluates the energy of the structure *as given*, without moving any atom.
It is the cheapest way to check that a level of theory is set up correctly before spending
time on a search, and it is the runtype to reach for when the geometry comes from somewhere
else and only an energy is wanted.
{: .text-justify }

Besides the energy, CREST reports the properties it can obtain from the calculator: bond
orders, atomic partial charges and coordination numbers, the molecular dipole moment, and
the Cartesian gradient.
{: .text-justify }

The example below uses 1-propanol, the same molecule as the shipped `examples/expl-1/`.
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-sp-1" onclick="openTabId(event, 'sp-1-cmd', 'tab-sp-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-sp-1" onclick="openTabId(event, 'sp-1-toml', 'tab-sp-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-sp-1" onclick="openTabId(event, 'sp-1-struc', 'tab-sp-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
  <button class="tablinks tab-sp-1" onclick="openTabId(event, 'sp-1-out', 'tab-sp-1')">{{ site.data.icons.checkfile }} <code>output (excerpt)</code></button>
</div>
<!-- Tab content -->
<div id="sp-1-cmd" class="tabcontent tab-sp-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--sp</span> <span class='nt'>--gfn2</span> <span class='nt'>-T</span> 4" %}
</div>
<div id="sp-1-toml" class="tabcontent tab-sp-1" style="font-size:10px">
{% capture sp_toml %}
# Single-point energy calculation
input   = "struc.xyz"           # input structure file (1-propanol)
runtype = "singlepoint"
threads = 4

[calculation]
[[calculation.level]]
method = "gfn2"                 # GFN2-xTB semiempirical Hamiltonian
{% endcapture %}
{% include codecell.html content=sp_toml %}
</div>
<div id="sp-1-struc" class="tabcontent tab-sp-1" style="font-size:10px">
{% capture sp_struc %}
12

C          1.00510       -0.04436        0.07729
C          2.52196       -0.10014        0.05638
C          3.03386       -1.52959       -0.04885
O          4.45512       -1.53382       -0.04957
H          0.66450        0.99293        0.15400
H          0.60392       -0.59767        0.93240
H          0.58435       -0.47325       -0.83778
H          2.92490        0.36854        0.96213
H          2.90338        0.49174       -0.78421
H          2.68484       -2.01184       -0.96764
H          2.69552       -2.12845        0.80244
H          4.74911       -1.01511       -0.81774
{% endcapture %}
{% include codecell.html content=sp_struc %}
</div>
<div id="sp-1-out" class="tabcontent tab-sp-1" style="font-size:10px">
{% capture sp_out %}
  {% include outputs/std_sp_output.txt %}
{% endcapture %}
{% include codecell.html content=sp_out %}
</div>
{% include defaulttab.html %}

The energy is printed as `TOTAL ENERGY` in Hartree and additionally written to
`crest.engrad`, a plain text file holding the energy and the Cartesian gradient. A `coord`
file (Turbomole format) and a copy of the input structure are written as well.
{: .text-justify }

{% include note.html content="The gradient is computed even for a singlepoint, since the engrad interface always returns both. This is why <code>crest.engrad</code> appears for every runtype." %}

---

## Choosing the level of theory

The same structure can be evaluated with any of the built-in methods. The energies are
*not* comparable between methods, since each has its own reference: only differences within
one method are meaningful.
{: .text-justify }

| Command | Method | Total energy / *E*<sub>h</sub> |
|---|---|---|
| `crest struc.xyz --sp --gfnff` | GFN-FF | −1.6635550511 |
| `crest struc.xyz --sp --gfn0` | GFN0-xTB | −14.0598810473 |
| `crest struc.xyz --sp --gfn1` | GFN1-xTB | −15.3599451413 |
| `crest struc.xyz --sp --gfn2` | GFN2-xTB | −14.5574960501 |

{% include tip.html content="A singlepoint is the fastest way to confirm that an external calculator (ORCA, an MLIP, g-xTB) is reachable and correctly configured, before committing to a long run. If the level works here, it works everywhere else in CREST." %}

---

## Implicit solvation

Solvation is requested on the command line with `--alpb <SOLVENT>` (alias `--gbsa`). Inside
a `[[calculation.level]]` block the keys `alpb`, `gbsa`, `cpcm`, `cosmo` and `pcm` are
available, the latter three selecting the tblite continuum models. The solvation free energy
contribution is included in the reported total energy:
{: .text-justify }

{% include command.html cmd="crest struc.xyz <span class='nt'>--sp</span> <span class='nt'>--gfn2</span> <span class='nt'>--alpb</span> h2o <span class='nt'>-T</span> 4" %}

| Setting | Total energy / *E*<sub>h</sub> |
|---|---|
| gas phase | −14.5574960501 |
| `--alpb h2o` | −14.5641381114 |

The difference of −4.17 kcal/mol is the (electrostatic plus nonpolar) solvation
contribution for this conformer. The active model is echoed in the *Calculation info* block
as `Solvation model` and `Solvent`.
{: .text-justify }

---

## Charge and multiplicity

The molecular charge is set with `--chrg <INT>` and the number of unpaired electrons with
`--uhf <INT>`, *i.e.* *N*<sub>α</sub> − *N*<sub>β</sub>. Since CREST 3.1 the multiplicity
can be given directly instead, with `--mult <2S+1>`, which is stored internally as
`uhf = 2S+1-1`.
{: .text-justify }

{% include important.html content="Both flags also write the hidden files <code>.CHRG</code> and <code>.uhf</code> into the working directory, and those are picked up again by any later run started there. When comparing settings, use a separate directory per run, otherwise a stale <code>.uhf</code> silently overrides the next calculation." %}

---

## Open-shell systems: spin polarization

<span class="label label-green">CREST 3.1</span>

For open-shell systems the GFN methods are, by default, evaluated with a spin-restricted
wavefunction: the number of unpaired electrons enters the occupation numbers, but the
α and β densities are not allowed to relax independently. CREST 3.1 adds a
**spin-polarized** treatment through tblite, in which a spin-polarization contribution
built from the tblite spin constants is added to the Hamiltonian (the spGFN2-xTB setup).
{: .text-justify }

It is requested with `-spinpol` (alias `-spin-polarized`) on the command line, or with
`spin_polarized = true` inside a `[[calculation.level]]` block. The multiplicity has to be
set alongside it, since the flag on its own has nothing to act on in a closed-shell system.
{: .text-justify }

As an example we use the high-spin hexacyanidocobaltate(III) anion, [Co(CN)<sub>6</sub>]<sup>3−</sup>,
with four unpaired electrons:
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-sp-2" onclick="openTabId(event, 'sp-2-cmd', 'tab-sp-2')" id="open2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-sp-2" onclick="openTabId(event, 'sp-2-toml', 'tab-sp-2')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-sp-2" onclick="openTabId(event, 'sp-2-struc', 'tab-sp-2')">{{ site.data.icons.codefile }} <code>cocn6.xyz</code></button>
  <button class="tablinks tab-sp-2" onclick="openTabId(event, 'sp-2-out', 'tab-sp-2')">{{ site.data.icons.checkfile }} <code>output (excerpt)</code></button>
</div>
<!-- Tab content -->
<div id="sp-2-cmd" class="tabcontent tab-sp-2" style="text-align:justify">
{% include command.html cmd="crest cocn6.xyz <span class='nt'>--sp</span> <span class='nt'>--gfn2</span> <span class='nt'>--chrg</span> -3 <span class='nt'>--uhf</span> 4 <span class='nt'>-spinpol</span>" %}
</div>
<div id="sp-2-toml" class="tabcontent tab-sp-2" style="font-size:10px">
{% capture sp_spin_toml %}
input   = "cocn6.xyz"
runtype = "singlepoint"

[calculation]
[[calculation.level]]
method         = "gfn2"
chrg           = -3
uhf            = 4              # four unpaired electrons (high spin)
spin_polarized = true           # spGFN2-xTB
{% endcapture %}
{% include codecell.html content=sp_spin_toml %}
</div>
<div id="sp-2-struc" class="tabcontent tab-sp-2" style="font-size:10px">
{% capture sp_spin_struc %}
13
[Co(CN)6]3- high-spin (chrg=-3, uhf=4)
Co      1.94850987     0.19287980    -0.18376737
C       1.81792481     2.08575727    -0.13590329
C       3.83672528     0.32634888    -0.32235359
C       0.06038970     0.05998753    -0.04350366
C       2.07816887    -1.70010350    -0.22985871
C       2.09066803     0.15618136     1.70853329
C       1.80532510     0.22861514    -2.07597278
N       4.99481373     0.40722832    -0.40858302
N      -1.09772521    -0.02259587     0.04133403
N       1.73931024     3.24687261    -0.10837020
N       2.15804288    -2.86109713    -0.25861949
N       2.17774414     0.13347966     2.86921471
N       1.71968835     0.25297846    -3.23978164
{% endcapture %}
{% include codecell.html content=sp_spin_struc %}
</div>
<div id="sp-2-out" class="tabcontent tab-sp-2" style="font-size:10px">
{% capture sp_spin_out %}
  {% include outputs/std_sp_spinpol_output.txt %}
{% endcapture %}
{% include codecell.html content=sp_spin_out %}
</div>
{% include defaulttab.html id="open2" %}

Allowing the spin densities to relax lowers the energy noticeably, and the effect grows
with the number of unpaired electrons:
{: .text-justify }

| System | `uhf` | restricted / *E*<sub>h</sub> | spin-polarized / *E*<sub>h</sub> | Δ*E* / kcal mol<sup>−1</sup> |
|---|:--:|---|---|---:|
| CH<sub>3</sub>• (doublet) | 1 | −3.5627045005 | −3.5768137675 | −8.85 |
| O<sub>2</sub> (triplet) | 2 | −7.9041182797 | −7.9319698370 | −17.48 |
| [Co(CN)<sub>6</sub>]<sup>3−</sup> (high spin) | 4 | −33.8763843780 | −33.9478617068 | −44.85 |

When the setting is active, the *Calculation info* block reports
`Spin-polarization : yes`. If that line is absent, the calculation ran spin-restricted.
{: .text-justify }

{% include note.html content="Spin-polarization is a <b>tblite</b> feature and therefore applies to the GFN1-xTB, GFN2-xTB and g-xTB levels. Setting it on a GFN-FF, GFN0-xTB, ORCA or MLIP level has no effect." %}

{% include warning.html content="Because the spin-restricted and spin-polarized energies differ by tens of kcal/mol, they must never be mixed within one comparison. Either all structures of an ensemble are treated spin-polarized, or none are." %}
