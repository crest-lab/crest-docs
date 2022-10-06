---
layout: default
title: MECP Screening
parent: "MECP Calculations"
grand_parent: "Examples and Guides"
nav_order: 2
toc: false
summary: "(Semi-automated) Screening of benzene MECPs with GFN2-xTB"
permalink: /page/examples/mecp/mecp_screen.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0 preview</div>


---

## (Semi-automated) Screening of benzene MECPs with GFN2-xTB

An extension of the [minimum energy crossing point optimization](mecp_opt.html "Examples / MECP Optimization"), is the
metadynamics-based screening (analogously to conformational sampling).
It can be called *via* the new [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html  "Documentation / Input Files").
Again, for the GFN2-xTB *S*<sub>0</sub>/*T*<sub>1</sub> MECPs of benzene:
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{ site.data.  icons.codefile }} <code>input.toml</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--input</span> input.toml" %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
  12
 
 C          1.3830400000       -0.2213700000        0.0054100000
 C          0.8812100000        1.0799600000        0.0137400000
 C         -0.4965300000        1.2961400000        0.0106300000
 C         -1.3728900000        0.2109800000       -0.0044700000
 C         -0.8710300000       -1.0904600000       -0.0146100000
 C          0.5067700000       -1.3067000000       -0.0079300000
 H          2.4566500000       -0.3899700000        0.0090900000
 H          1.5639800000        1.9254500000        0.0228700000
 H         -0.8876100000        2.3099700000        0.0197800000
 H         -2.4463500000        0.3796100000       -0.0082500000
 H         -1.5536800000       -1.9359000000       -0.0272900000
 H          0.8977800000       -2.3206600000       -0.0132700000
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture toml_file %}
#This is a CREST input file
input = 'struc.xyz'
runtype='mecp_search'   # MECP sampling runtype

#parallelization
threads = 10

#calculation data
[calculation]
eprint = true
elog="energies.log" 

[[calculation.mecp]]  # This block automatically sets up a uhf=0 and uhf=2 calculation with xtb
method = "xtb"
binary = "xtb"
flags = "--gfn 2 --grad"

[[calculation.constraints]]
gapdiff2 = [7.5, 0.005, 0.25]

#molecular dynamics data, required for MECP sampling runtype
[dynamics]
length = 10.0
tstep = 2.5 
dump = 100.0
hmass = 4

{% endcapture %}
{% include codecell.html content=toml_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}

The sampling algorithm will run in parallel several (*i.e.*, ten) metadynamics simulations *on the mixed PES including the gap potential* and MECP-optimize the output trajectories.
While the metadynamics bias potentials are set up automatically, **the user is responsible for setting the MD parameters**, such as the simulation lengths in *ps*.
Some benzene MECPs that can be found with this method are shown below (in comparison with FOMO-CASCI(6,5) structures in transparent blue).
{: .text-justify }

{% include image.html file="example-mecp-2.png" alt="Benzene MECPs" caption="Some GFN2-xTB S<sub>0</sub>/T<sub>1</sub> MECPs for benzene, found with semi-automated metadynamics sampling. Transparent blue are FOMO-CASCI(6,5) reference structures." max-width=700%}


