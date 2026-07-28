---
layout: default
title: "Permutation-invariant RMSD (iRMSD)"
parent: "Sorting"
grand_parent: "Examples and Guides"
nav_order: 3
toc: false
summary: "Comparing structures independently of atom order and molecular symmetry."
permalink: /page/examples/irmsd.html
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

## Why a permutation-invariant RMSD?

The [Cartesian RMSD]({{site.baseurl}}/page/examples/utilities/utils_2.html) compares two
structures atom by atom, in the order in which the atoms appear in the file.
That is a problem whenever chemically **identical** structures are written down
differently:
{: .text-justify }

- the two files use a different atom ordering (a very common situation when structures
  are passed between different programs),
- symmetry-equivalent atoms are exchanged, *e.g.* the three hydrogens of a rotating
  methyl group, or the two oxygens of a carboxylate,
- a structure appears as its mirror image (false enantiomer).

In all of these cases the classical RMSD returns a large value, although the structures
are the same. The iRMSD ("permutation-invariant RMSD") removes this dependency by
minimizing not only over the rotation matrix $$\mathbf{U}$$, but also over all
chemically allowed atom permutations $$\mathbf{P}$$:
{: .text-justify }

$$
  \text{iRMSD}(\mathbf{X},\mathbf{Y}) = \min_{\mathbf{P},\mathbf{U}}
  \sqrt{\frac{1}{N}\sum_{i}^{N}
  \left\lVert \mathbf{X}_i - (\mathbf{P}\mathbf{U}\mathbf{Y})_i \right\rVert^2 }
$$

where $$\mathbf{X}$$ and $$\mathbf{Y}$$ are the coordinate matrices of the two
structures and *N* is the number of atoms.
{: .text-justify }

CREST assigns canonical atom identities that are independent of the input order, aligns
the structures via their rotational axes, and then solves the resulting assignment
problem (LSAP) with a Hungarian algorithm. Details of the method are given in
{: .text-justify }

- P. Pracht, *Conformational Pruning via the Permutation Invariant Root-Mean-Square
  Deviation of Atomic Positions*,
  [*J. Chem. Inf. Model.*, **2025**, *65*, 4501–4511.](https://doi.org/10.1021/acs.jcim.4c02143)

---

## Comparing two structures

The iRMSD of two structures is calculated with `--irmsd <FILE1> <FILE2>`, in complete
analogy to the classical `--rmsd`.
The example below is taken from the publication: both files contain the *same* conformer
of fluoxetine, but `struc2.xyz` has a completely scrambled atom order and an additional
random rotation applied.
The two figures show the identical molecule with the respective atom numbering — the
oxygen, for instance, is atom 13 in the first and atom 38 in the second file:
{: .text-justify }

<div style="display:flex; flex-wrap:wrap; gap:1em; justify-content:center; align-items:flex-start">
<div style="flex:1 1 320px">
{% include image.html file="irmsd-fluoxetine-1.jpg" alt="Fluoxetine with the atom numbering of struc1.xyz" caption="<code>struc1.xyz</code> — fluoxetine with its original atom numbering." %}
</div>
<div style="flex:1 1 320px">
{% include image.html file="irmsd-fluoxetine-2.jpg" alt="Fluoxetine with the scrambled atom numbering of struc2.xyz" caption="<code>struc2.xyz</code> — the same conformer, rotated and with scrambled atom numbering." %}
</div>
</div>

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-irmsd-1" onclick="openTabId(event, 'irmsd-1-cmd', 'tab-irmsd-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-irmsd-1" onclick="openTabId(event, 'irmsd-1-s1', 'tab-irmsd-1')">{{ site.data.icons.codefile }} <code>struc1.xyz</code></button>
  <button class="tablinks tab-irmsd-1" onclick="openTabId(event, 'irmsd-1-s2', 'tab-irmsd-1')">{{ site.data.icons.codefile }} <code>struc2.xyz</code></button>
  <button class="tablinks tab-irmsd-1" onclick="openTabId(event, 'irmsd-1-out', 'tab-irmsd-1')">{{ site.data.icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="irmsd-1-cmd" class="tabcontent tab-irmsd-1" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--irmsd</span> struc1.xyz struc2.xyz" %}
</div>
<div id="irmsd-1-s1" class="tabcontent tab-irmsd-1" style="font-size:10px">
{% capture irmsd_s1 %}
40
fluoxetine
C      -0.0198      0.2158      0.5308
F      -5.0246     -0.2464      0.5593
H      -2.0207      0.0761      3.2888
H       2.0221      5.0303      0.4892
C      -0.4032      0.2003      1.8748
H       1.4542      5.1890     -1.1937
C       2.1773      2.6686     -0.7626
F      -4.6775      0.8294      2.4172
F      -4.3667     -1.3218      2.3289
N       3.0555      3.8290     -0.9233
C       2.3371      5.0467     -0.5601
H       3.7051      1.1947     -0.3434
O       1.3305      0.2076      0.3364
C      -2.3576      0.1386     -0.0950
C       3.3367     -3.7475     -2.0944
C      -2.7426      0.0481      1.2484
C      -4.1855     -0.1659      1.6292
C       2.4651     -1.1750     -1.3319
H       1.7906      2.6512      0.2660
C       2.8963      1.3473     -1.0679
H       1.3203      2.7752     -1.4405
C       1.8806      0.1908     -0.9905
H      -0.7865      0.2662     -1.5101
H       3.3527      1.3925     -2.0651
H       1.1282      0.3962     -1.7541
H       2.8529     -0.6554     -3.3999
H       2.9547     -4.3108     -0.0530
H       3.8626      3.7250     -0.3037
H       0.3581      0.2294      2.6522
C      -1.7511      0.1165      2.2345
H       2.9886      5.9146     -0.7002
H       2.1980     -2.0723      0.6278
H       3.6193     -2.9009     -4.0530
H      -3.1084      0.1174     -0.8845
C       2.5162     -2.2260     -0.4015
C      -1.0075      0.2216     -0.4508
H       3.6502     -4.7430     -2.3936
C       2.9433     -3.5025     -0.7811
C       2.8862     -1.4373     -2.6475
C       3.3158     -2.7117     -3.0256
{% endcapture %}
{% include codecell.html content=irmsd_s1 %}
</div>
<div id="irmsd-1-s2" class="tabcontent tab-irmsd-1" style="font-size:10px">
{% capture irmsd_s2 %}
40
fluoxetine
C      -0.2470     -1.0143     -0.4213
H       0.0828      4.2564     -4.4517
C      -2.1193      2.6178      0.0144
C       1.2089     -1.8204      1.8160
C       0.0619     -0.0804      0.5643
C       0.9632     -2.7436      0.7925
H      -5.9431      1.8117      2.4085
H      -3.2933      0.8099      0.1366
H       2.4555      4.5828     -3.8102
H      -0.0328     -3.0384     -1.1072
H      -3.9856      3.0777      1.8789
H      -2.4640      1.2332      1.6473
C      -0.4255      3.2037     -2.6383
H       1.7581      2.5331     -0.1112
C       1.3640      2.9121     -1.0521
C       1.5502     -4.1306      0.8575
C      -5.0208      1.3357      2.0622
H      -4.4695      0.9920      2.9447
F       1.1253     -4.8340      1.9430
C       2.2338      3.5914     -1.9111
H      -1.7744      3.4140      0.6847
C       0.4427      3.8850     -3.4947
C       0.7599     -0.5019      1.6995
F       1.2525     -4.8990     -0.2270
H      -1.3360      1.0931     -1.2358
H       1.7763     -2.1151      2.6974
H       0.9785      0.2106      2.4926
H      -5.3029      0.4654      1.4587
H      -0.8129     -0.7679     -1.3112
H      -2.6932      3.0927     -0.7916
C      -0.9181      1.8428     -0.5615
F       2.9112     -4.1100      0.9336
H      -1.4519      3.0470     -2.9556
H       3.2752      3.7325     -1.6299
C       1.7755      4.0721     -3.1352
C       0.0230      2.6924     -1.4078
N      -4.2396      2.2887      1.2797
O      -0.2303      1.2522      0.5528
C      -3.0176      1.6462      0.7923
C       0.1996     -2.3349     -0.3081
{% endcapture %}
{% include codecell.html content=irmsd_s2 %}
</div>
<div id="irmsd-1-out" class="tabcontent tab-irmsd-1" style="font-size:10px">
{% capture irmsd_out %}
  {% include outputs/irmsd_output.txt %}
{% endcapture %}
{% include codecell.html content=irmsd_out %}
</div>
{% include defaulttab.html %}

The classical RMSD of these two files is meaningless, while the iRMSD correctly
identifies them as the same structure:
{: .text-justify }

| Command | Result |
|---------|--------|
| `crest --rmsd struc1.xyz struc2.xyz` | `Calculated RMSD (Å):      5.13311345` |
| `crest --irmsd struc1.xyz struc2.xyz` | `Calculated iRMSD (Å):      0.00008793` |

Besides the printout, the aligned structures are written to `irmsd.xyz`, with the atoms
of the second structure reordered to match the reference. This file can be used directly
for a visual overlay of the two geometries.
{: .text-justify }

{% include note.html content="The remaining 1e-4 Å are the numerical noise of the coordinates in the example files, not a limitation of the algorithm." %}

### Handling of mirror images

CREST decides automatically whether a geometry inversion has to be considered, which is
printed as `false enantiomers possible?` at the start of the run.
For structures without stereocenters, an inverted copy describes the same molecule and
is allowed; for genuine enantiomers it must not be. The automatism can be overruled:
{: .text-justify }

| Command | Description |
|---------|-------------|
| `--irmsd <FILE1> <FILE2>` | iRMSD of two structures, inversion handled automatically |
| `--irmsd_noinv <FILE1> <FILE2>` | never invert, *i.e.*, enantiomers are distinguished |
| `--inversion <auto\|on\|off>` | explicit control of the inversion check, also for the ensemble modes below |

---

## Pruning an ensemble

The same algorithm is available for entire ensembles through the sorting driver,
`crest --sort <ENSEMBLE> <MODE>`. This is the iRMSD counterpart of the classical
[CREGEN sorting]({{site.baseurl}}/page/examples/example_2.html):
{: .text-justify }

| Mode | Description |
|------|-------------|
| `isort` | assign structures to conformer groups by iRMSD and the RMSD threshold `--rthr` |
| `isort_noid` | the same, but without canonical atom identities (element types as ranks) |
| `all`, `allpair` | all unique pair iRMSDs of the ensemble, written to `cregen_rmsds.csv` |
| `cregen` | the original, empirical CREGEN procedure |

As an example, `ensemble.xyz` below contains a single conformer of alanineglycine
twice — the second entry only has its methyl group rotated by 120°, which permutes the
three methyl hydrogens. Classical RMSD sees a difference of 0.687 Å, far above the
default threshold of `RTHR = 0.125 Å`, and would keep both structures. The iRMSD-based
sorting recognizes the rotamer and merges them into one group with degeneracy 2:
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-irmsd-2" onclick="openTabId(event, 'irmsd-2-cmd', 'tab-irmsd-2')" id="open2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-irmsd-2" onclick="openTabId(event, 'irmsd-2-ens', 'tab-irmsd-2')">{{ site.data.icons.codefile }} <code>ensemble.xyz</code></button>
  <button class="tablinks tab-irmsd-2" onclick="openTabId(event, 'irmsd-2-out', 'tab-irmsd-2')">{{ site.data.icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="irmsd-2-cmd" class="tabcontent tab-irmsd-2" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--sort</span> ensemble.xyz isort" %}
</div>
<div id="irmsd-2-ens" class="tabcontent tab-irmsd-2" style="font-size:10px">
{% capture irmsd_ens %}
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
20

C       2.081440      0.615100     -0.508430
C       2.742230      1.824030     -1.200820
N       4.117790      1.799870     -1.190410
C       4.943570      2.827040     -1.822060
C       6.440080      2.569360     -1.637600
O       7.351600      3.252270     -2.069090
N       0.610100      0.695090     -0.538780
O       2.095560      2.724940     -1.739670
O       6.705220      1.463410     -0.897460
H       0.303080      1.426060      0.103770
H       0.338420      1.050680     -1.460480
C       2.488753     -0.593400     -1.198448
H       2.416500      0.557400      0.532050
H       4.614100      1.081980     -0.670550
H       4.699850      3.794460     -1.373720
H       4.722890      2.844690     -2.894180
H       7.687400      1.448620     -0.860340
H       2.170234     -0.542411     -2.238576
H       3.572730     -0.688405     -1.154997
H       2.029202     -1.457008     -0.719998
{% endcapture %}
{% include codecell.html content=irmsd_ens %}
</div>
<div id="irmsd-2-out" class="tabcontent tab-irmsd-2" style="font-size:10px">
{% capture irmsd_sort_out %}
  {% include outputs/irmsd_sort_output.txt %}
{% endcapture %}
{% include codecell.html content=irmsd_sort_out %}
</div>
{% include defaulttab.html id="open2" %}

The resulting files are the usual CREGEN output: `crest_conformers.xyz` (one structure
per group), `crest_rotamers.xyz` (all structures), and `crest.energies`.
{: .text-justify }

{% include tip.html content="The energies used for the sorting are read from the comment lines of the ensemble file. In the example above they are absent, so all structures are treated as energetically degenerate and the grouping is purely geometrical." %}

---

## The standalone `irmsd` package

The algorithm is also available independently of CREST as a Python package with a
Fortran backend, [**irmsd** {{ site.data.icons.github }}](https://github.com/pprcht/irmsd).
It is the reference implementation for the publication above and is convenient whenever
structures should be compared or pruned outside of a CREST workflow.
The fluoxetine figures shown above are taken from its repository.
{: .text-justify }

{% include command.html cmd="pip install irmsd" %}

The package ships a command line tool with three subcommands:
{: .text-justify }

| Subcommand | Purpose |
|------------|---------|
| `irmsd prop` | structural properties (coordination numbers, rotational constants, canonical identifiers) |
| `irmsd compare` | iRMSD of two structures (`--quaternion` for the classical RMSD, `--inversion`, `--heavy`) |
| `irmsd sort`, `irmsd prune` | pruning/clustering of an ensemble (`--rthr`, `--ethr`, `--ewin`, `--classic`) |

The same functionality is accessible from Python, which makes it easy to embed the
pruning into an own workflow:
{: .text-justify }

```python
from irmsd import read_structures, sorter_irmsd_molecule, prune

# read an xyz file with multiple frames
molecules = read_structures('/PATH/TO/YOUR/input.xyz')

# assign molecules to groups and get the aligned structures
groups, aligned_molecules = sorter_irmsd_molecule(molecules, rthr=0.125)

# ... or directly generate the pruned conformer list
pruned_molecules = prune(molecules, rthr=0.125)
```

{% include important.html content="A few cases remain difficult for the algorithm and are documented in the standalone repository: highly symmetric cages (C<sub>60</sub>, adamantane) where the rotational axes are degenerate and the initial alignment fails, and noncovalent complexes in which atoms of the same element may be exchanged between fragments." %}
