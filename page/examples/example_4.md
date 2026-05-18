---
layout: default
title: Constrained Sampling
# parent: "Examples and Guides"
parent: "Sampling Applications"
grand_parent: "Examples and Guides"
nav_order: 4
toc: false
summary: "A guide to <i>constrained</i> conformational sampling."
permalink: /page/examples/example_4.html
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

{% include warning.html content="Constraints that are included via CREST's `--cinp` command will generally be present for **ALL** `xtb` calculations; MD, MTD, optimizations, and singlepoints. Be careful not to bias your calculation too strongly and choose *moderate* force constants!" %}

---

## Constrained conformational sampling

CREST's conformational search relies on the quality of the underlying level of theory.
Since we are choosing a SQM method (GFN*n*-xTB), it is possible for the system to
freely form and break bonds.
While it was shown in [Example 2](example_2.html#handling-topology-in-cregen) how to handle the resulting topology mismatches in the sorting algorithm,
in some occasions it might be required for the user to constrain certain parts of the geometry.
CREST offers two complementary approaches for this:
**atom freezing** via `--freeze` (completely removes forces on selected atoms, see [below](#fixing-of-entire-substructure-parts))
and **distance/angle/dihedral constraints** specified in `xtb`-style syntax and passed to CREST via `--cinp`.
{: .text-justify }

A typical example are metal-organic compounds that can be sigificantly distorted at the GFN*n*-xTB level.
Here, certain bond lengths or angles can be constrained in order to avoid this.
An even simpler example are small non-covalent complexes.
As was noted in [Example 3](example_3.html), the MTD bias potential leads to dissociation of such non-covalently bound molecules.
Instead of employing a wall potential like in the previous example, one can simply constrain some interatomic distances.
This can be shown, for example for the methanol-acetamide complex from the [S66 benchmark set](https://doi.org/10.1021/ct2002946).
{: .text-justify }

{% include image.html file="example-4-1.png" alt="methanol-acetamide complex"  caption="Non-covalent complex of methanol and acetamide, taken from the S66 benchmark set." max-width=400 %}

{% include tip.html content="In principle, the constraining of *any* interatomic **distance**, **angle**, or **dihedral angle** is possible." %}

In the respective `constraints.inp` file, all constraints have to be specified in the `xtb` format. See the [`xtb` **Detailed Input** documentation](https://xtb-docs.readthedocs.io/en/latest/xcontrol.html#fixing-constraining-and-confining).
For the methanol-acetamide example, the interatomic distance between the hyrdogen atom (2)
and the oxygen atom (12) is constrained by an harmonic potential (force constant in atomic units, 0.25 *E*<sub>h</sub>/Bohr<sup>2</sup>) to a value of 1.85 Ångström. 
The input files and the CREST command are given as
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-toml', 'tab-id-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{ site.data.icons.codefile }} <code>constraints.inp</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
<b>OR</b> use
{% include command.html cmd="crest struc.xyz <span class='nt'>--cinp</span> constraints.inp" %}
</div>
<div id="tab-1-toml" class="tabcontent tab-id-1" style="font-size:10px">
{% capture toml_input %}
# This is a CREST input file
input   = "struc.xyz"
runtype = "imtd-gc"
threads = 4

constraints = "constraints.inp"

[calculation]
[[calculation.level]]
method = "gfn2"
{% endcapture %}
{% include codecell.html content=toml_input %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
  18
  
 O         -2.3458343675       -0.5958980711       -1.0986703785
 H         -1.4259310467       -0.7659191523       -0.8402268081
 C         -3.1592303454       -1.1201985353       -0.0717185983
 H         -4.1945481644       -0.9177347321       -0.3348616664
 H         -3.0448003417       -2.2008537204        0.0422726914
 H         -2.9616880843       -0.6545221185        0.8983810538
 C         -0.1635664885        1.5241966295        0.3660367684
 H          0.3428271404        2.4856457127        0.3311664119
 H         -0.5741106118        1.3780607546        1.3639134085
 H         -0.9932142903        1.5146833556       -0.3354687645
 C          0.7520638942        0.3692578108        0.0501205567
 O          0.3278691014       -0.7506529824       -0.2349609814
 N          2.0782008097        0.6309820886        0.1093199208
 H          2.3762132585        1.5414102214        0.4070071098
 C          3.0606068433       -0.4091292185       -0.1134239002
 H          2.7040496555       -1.0600665402       -0.9056008595
 H          4.0009760815        0.0443946174       -0.4119376006
 H          3.2201169562       -1.0136561201        0.7786516358
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture constraint_file %}
$constrain
  force constant=0.25
  distance: 2, 12, 1.85
$end
{% endcapture %}
{% include codecell.html content=constraint_file %}
</div>
{% include defaulttab.html id="open-1" %}


The respective conformational search provides an ensemble of non-covalently bound 
methanol-acetamide structures which all have a H(2)-O(12) distance close to 1.85 Å.
{: .text-justify }



---

## Fixing of entire substructure parts

{% include image.html file="example-4-2.png" alt="Side-chain conformational sampling" caption="An    example where constraining an entire part of the structure is necessary: Sampling of side-chain      conformations. This system was investigated with CREST in <a href='https://doi.org/10.1039/D0CP04920D'>Phys. Chem. Chem. Phys., 2020, 22, 24282- 24290.</a>" %}

Sometimes it is necessary to fix entire parts of the structure during sampling.
As of CREST 3.1, this is straightforward with the `--freeze <atomlist>` flag
(or `freeze` in the TOML input), which **completely removes forces on the specified atoms**
in all MD, MTD, and geometry optimization steps.
{: .text-justify }

As an example, a fictional system consisting out of a linear *n*-octane chain with a diglycine substituent is calculated.
Here, the *entire* *n*-octane chain (atoms 1–26) shall be fixed so that it remains linear,
while the diglycine side chain (atoms 27–41) is sampled freely.
{: .text-justify }

{% include image.html file="example-4-3.png" alt="Side-chain conformational sampling example" caption="A fictional example for finding side-chain conformations. The linear n-octane chain (in orange) is fixed. Different side-chain conformers of the diglycine substituent are shown in transparent blue." max-width=400 %}

To set up the calculation:

1. Pass the frozen atom list via `--freeze 1-26` (CLI) or `freeze = "1-26"` (TOML)
2. Add `--subrmsd` so that CREGEN uses only the mobile atoms for RMSD comparisons
3. (Optional) reduce the MD/MTD time step with `--tstep <REAL>`

No additional files are needed.
The calculation looks like this:
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-1', 'tab-id-2')" id="open-2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-toml', 'tab-id-2')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-2', 'tab-id-2')">{{ site.data.icons.codefile }} <code>fictional.xyz</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-3', 'tab-id-2')">{{ site.data.icons.codefile }} <code>constraints.inp</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-4', 'tab-id-2')">{{ site.data.icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-2-1" class="tabcontent tab-id-2" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
<b>OR</b> use
{% include command.html cmd="crest fictional.xyz <span class='nt'>--freeze</span> 1-26 <span class='nt'>--subrmsd</span>" %}
<span markdown="span">
The `constraints.inp` tab shows an alternative approach using `--cinp` that is useful when
**additional bond, angle, or dihedral constraints** are needed on top of the frozen atoms.
</span>
</div>
<div id="tab-2-toml" class="tabcontent tab-id-2" style="font-size:10px">
{% capture toml_input2 %}
# This is a CREST input file
input   = "fictional.xyz"
runtype = "imtd-gc"
threads = 4

freeze  = "1-26"
subrmsd = true

[calculation]
[[calculation.level]]
method = "gfn2"
{% endcapture %}
{% include codecell.html content=toml_input2 %}
</div>
<div id="tab-2-2" class="tabcontent tab-id-2" style="text-align:justify">
{% capture struc_file %}
  41
  
 C          1.0144800000       -0.0609700000       -0.0825900000
 C          2.5333400000       -0.0608400000       -0.0710600000
 C          3.0664700000       -0.3643600000        1.3256100000
 C          4.5908500000       -0.3677000000        1.3420700000
 C          5.1165500000       -0.6739300000        2.7411100000
 C          6.6413400000       -0.6756000000        2.7574300000
 C          7.1736700000       -0.9813000000        4.1534600000
 C          8.6899400000       -0.9817400000        4.1630900000
 H          0.6423500000        0.1573500000       -1.0871300000
 H          0.6205000000        0.6974700000        0.6016700000
 H          0.6236000000       -1.0367300000        0.2236500000
 H          2.9003600000        0.9164900000       -0.4063100000
 H          2.9034800000       -0.8084900000       -0.7825300000
 H          2.6926100000       -1.3400300000        1.6597300000
 H          2.6921400000        0.3848400000        2.0340900000
 H          4.9664500000        0.6088800000        1.0113000000
 H          4.9674500000       -1.1157300000        0.6334000000
 H          4.7415200000       -1.6506000000        3.0706100000
 H          4.7391300000        0.0736300000        3.4494600000
 H          7.0139700000        0.3012200000        2.4251500000
 H          7.0160900000       -1.4228100000        2.0470400000
 H          6.8073200000       -1.9587400000        4.4877200000
 H          6.8053100000       -0.2343600000        4.8660200000
 C          9.2154250000       -1.9852880000        3.2579620000
 H          9.0652900000       -1.2016200000        5.1680800000
 H          9.0847000000       -0.0064100000        3.8597300000
 N         10.6547150000       -1.9569240000        3.2931620000
 C          8.7477200000       -3.2959450000        3.6653100000
 H          8.8728820000       -1.7760900000        2.2456280000
 H         11.0200180000       -2.6545630000        2.6639420000
 H         10.9798510000       -1.0457920000        3.0099850000
 O          9.0775760000       -4.2852730000        3.0322020000
 N          7.8939040000       -3.4298300000        4.8171220000
 H          7.7233110000       -2.5201690000        5.2164720000
 C          6.6427270000       -4.0223990000        4.4208670000
 C          5.7829810000       -4.1572140000        5.5806780000
 H          6.1579230000       -3.3865210000        3.6815810000
 H          6.8270280000       -5.0051580000        3.9894270000
 O          4.5047420000       -4.7116320000        5.4438410000
 O          6.1735030000       -3.7875090000        6.6757630000
 H          4.0745330000       -4.7284110000        6.2906810000
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-2-3" class="tabcontent tab-id-2" style="text-align:justify">
{% capture cons_file %}
$constrain
  atoms: 1-26
  force constant=0.5
  reference=coord.ref
$metadyn
  atoms: 27-41
$end
{% endcapture %}
{% include codecell.html content=cons_file %}
</div>
<div id="tab-2-4" class="tabcontent tab-id-2" style="font-size:10px">
{% capture output_file %}
  {% include outputs/example_4_output.txt %}
{% endcapture %}
{% include codecell.html content=output_file %}
</div>
{% include defaulttab.html id="open-2" %}

A large ensemble of 121 unique conformers was obtained for our fictional system.
Inspection of these structures reveals that, indeed, all of them still show a linear conformation of the *n*-octane chain.
{: .text-justify }


### Semi-automated preparation of a constraint input

The `constraint.inp` file from the [previous section {{ site.data.icons.aup }}](#fixing-of-entire-substructure-parts) can actually be prepared by CREST.
The respective command is

```bash
crest fictional.xyz --constrain 1-26
```

Here, the [`--constrain <atomlist>` command](../documentation/keywords.html#constraining-options) was used, which will simply write a file called `.xcontrol.sample` (=`constraints.inp` from above).
The command will automatically make a copy of the input geometry and name it `coord.ref`.
All atoms *not* present in `<atomlist>` will be added to the metadynamics bias.


---

## Automated bond constraints

CREST also has a function for automatically constraining the interatomic distances of all covalent bonds to those from the input structure.
This option can be invoked with the `--cbonds` command (or its variants, see [**Keyword Documentation** {{site.data.icons.book}}](../documentation/keywords.html#constraining-options)).
{: .text-justify }

```bash
crest struc.xyz --cbonds
```

The only drawback here is, that the information whether an interatomic distance corresponds to a covalent bond is approximated from an empirical topology set up from atomic coordination numbers.
**_It can not be ensured that the constrained distances actually correspond to the "true" covalent bonds._**
Furthermore, metal atoms are often problematic due to their large variety of coordination numbers.
{: .text-justify }


