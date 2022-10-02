---
layout: default
title: MECP Optimization
parent: "MECP Calculations"
grand_parent: "Examples and Guides"
nav_order: 1
toc: false
summary: "Optimization of a benzene MECP with GFN2-xTB"
permalink: /page/examples/mecp/mecp_opt.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0 preview</div>


---

## Optimization of a benzene MECP with GFN2-xTB

A specialized new feature of CREST 3 is the mixing of two potential energy surfaces with an
 additional bias potential to find minimum energy crossing points, as described in 
[DOI: 10.1021/acs.jctc.2c00578](https://doi.org/10.1021/acs.jctc.2c00578 "Fast Screening of Minimum Energy Crossing Points with Semiempirical Tight-Binding Methods").
It can be called *via* the new [**input file reader** {{site.data.icons.book}}](../documentation/inputfiles.html  "Documentation / Input Files"), e.g., for the GFN2-xTB *S*<sub>0</sub>/*T*<sub>1</sub> MECP of benzene:
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
runtype='ancopt'

#parallelization
threads = 4

#calculation data
[calculation]
type = -1   # specify energy & gradient from [calculation.level] to be used
            # -1 is for MECPs
eprint = true
elog="energies.log" 

[[calculation.level]]
method = "xtb"
prog = "xtb"
uhf = 0  # GFN2-xTB S0 state
flags = "--gfn 2 --grad"
dir = 's0'

[[calculation.level]]
method = "xtb"
prog = "xtb"
uhf = 2  # GFN2-xTB T1 state
dir = 's1'
flags = "--gfn 2 --grad"

[[calculation.constraints]]
gapdiff2 = [10.0, 0.005, 0.25]  #bias parameter to minimize the gap, [10, 0.005, 0.25] is ok for most molecules
{% endcapture %}
{% include codecell.html content=toml_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}

The optimization trajectory (written to `crestopt.log`) will look like something in the following. Notice that the gap minimization between the two states (shown in red) is the initial driving force of the procedure.
{: .text-justify }

{% include image.html file="example-mecp-1.png" alt="Benzene MECP optimization" caption="Optimization of the GFN2-xTB S<sub>0</sub>/T<sub>1</sub> MECP for benzene, starting from the ground state structure." max-width=700%}


