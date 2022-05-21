---
layout: default
title: Example 3
parent: Examples
nav_order: 3
toc: false
summary: "A conformational search with CREST's NCI mode for non-covalent systems."
permalink: /page/examples/example_3.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Sampling of non-covalent complexes and aggregates (NCI mode)

A specialized application of CREST is the sampling of aggregates (also referred to as NCI mode). 
The idea here is to find different conformations of non-covalently bound complexes in 
which the arrangement of the fragments is of interest. 
The application can be called by:
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--nci</span>" %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
   18

 O    -1.469470     0.057971     1.425525
 H    -0.584285     0.519331     1.484152
 H    -1.949531     0.297378     2.218248
 O    -0.414388    -2.005083    -0.137355
 H    -0.827334    -1.527314     0.598606
 H    -0.829507    -1.642295    -0.927593
 O    -1.740922     0.293387    -1.291566
 H    -2.429374     0.885495    -1.595601
 H    -1.784260     0.283934    -0.315678
 O     2.037846    -0.900550    -0.123510
 H     2.719638    -1.557770    -0.261948
 H     1.180681    -1.385350    -0.122605
 O     0.833144     1.402993    -1.296134
 H     1.432120     0.648938    -1.204997
 H    -0.044502     1.022356    -1.465271
 O     0.879327     1.214234     1.389828
 H     0.853406     1.590056     0.483434
 H     1.511729     0.488538     1.308001
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}



The procedure and output is essentially the same as a normal CREST conformational search, 
but with reduced settings (less MTDs, adjusted MTD bias parameters). 
What is different, however, is that first an **ellipsoid wall potential** is created and added
to the simulation. 
A nice example for this application are small molecular clusters, e.g. (H<sub>2</sub>O)<sub>6</sub>.
The ellipsoid potential that is automatically determined for the input cluster is visualized in the figure below.
{: .text-justify }

{% include image.html file="example-3-1.png" alt="(H<sub>2</sub>O)<sub>6</sub> cluster" caption="Visualization of an ellipsoid potential around an (H<sub>2</sub>O)<sub>6</sub> cluster." max-width=300%}


Maximization of the RMSD, and hence a minimization of the MTD bias potential would simply 
ead to a dissociation of the NCI complex after a few picoseconds in the MTD.
Hence, the **ellipsoid potential is required in the MTDs to counteract the bias potential**.
In the subsequent geometry optimization, however, the surrounding potential must not be present 
due to the absence of the MTD bias potential and the structure would be artificially compressed 
by the ellipsoid. Therefore it is automatically removed in the geometry optimization steps.
{: .text-justify }

{% include tip.html content="The ellipsoid potential size can be scaled by the factor REAL with the flag `--wscal <REAL>`. Other options that apply for conformational search settings may also be applied. See the [**Keyword Documentation** <i class='fa-solid fa-book'></i>](../documentation/keywords.html#conformational-search-settings)." %}

In general, the task of finding new low lying aggregates is more challenging than finding (only)
conformers, since each fragment of the complex could also have several different low lying
conformations. For the H<sub>2</sub>O)<sub>6</sub> cluster, 3 examples are shown in the figure below.
Note that all three structures are also part of the well-established 
[WATER27 benchmark set](https://doi.org/10.1021/ct800549f), but were generated automatically 
by CREST from a single input structure. 
In total 69 different clusters were found of which only 3 are shown.
{: .text-justify }

{% include image.html file="example-3-2.png" alt="New (H<sub>2</sub>O)<sub>6</sub> clusters" caption="Three automatically generated structures for the (H<sub>2</sub>O)<sub>6</sub> cluster." %}

