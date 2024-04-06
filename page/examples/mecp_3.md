---
layout: default
title: Tristate MECP optimization
parent: "MECP Calculations"
grand_parent: "Examples and Guides"
nav_order: 3
toc: false
summary: "S0/S1/S2 tristate MECP optimization with GFN0-xTB"
permalink: /page/examples/mecp/mecp_gfn0.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.0</div>


---

## S0/S1/S2 tristate MECP optimization with GFN0-xTB

An extension of the [minimum energy crossing point optimization](mecp_opt.html "Examples / MECP Optimization").
The tristate MECP of uracil, calculated with a specialized implementation of GFN0-xTB, was presented in the publication
 [J. Phys. Chem. B 2024, 128,  13, 3145–3156](https://doi.org/10.1021/acs.jpcb.4c00104).
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

O          2.31950        0.85423       -0.01010
C          1.23973        0.27519       -0.00872
C          1.16985       -1.20027       -0.01591
C         -0.03006       -1.78533       -0.00161
N         -1.17425       -1.03842        0.01329
C         -1.18624        0.33110        0.01012
O         -2.23220        0.97104        0.01628
N          0.04104        0.93178       -0.00006
H          2.10218       -1.74785       -0.03031
H         -0.14959       -2.86395       -0.00295
H         -2.08401       -1.48575        0.02387
H          0.06135        1.93866        0.00277
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture toml_file %}
#This is a CREST input file
input = 'struc.xyz'
runtype='ancopt'
threads = 9

#calculation data
[calculation]
type = -1  # specify  energy & gradient from[calculation.level] to be used
eprint = true
elog="energies.log" 
maxcycle = 1000

#calculation level
[[calculation.level]]
method = "gfn0*"
uhf = 0
chrg = 0
dir = 's0'
config = [2,0]
print = true
etemp = 1500.0
 
[[calculation.level]]
method = "gfn0*"
uhf = 0
chrg = 0
dir = 's1'
config = [1,1,0,0]
print = true
etemp = 1500.0

[[calculation.level]]
method = "gfn0*"
uhf = 0
chrg = 0
dir = 's2'
config = [1,2,1,0]
print = true    
etemp = 1500.0

[[calculation.constraints]]
gapdiff2 = [10.0, 0.005, 0.25]  #bias parameter to minimize the gap

{% endcapture %}
{% include codecell.html content=toml_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}


{% include image.html file="tristate-mecp.png" alt="Uracil tristate MECPs" caption="a) Optimized tristate MECP of uracil at the GFN0-xTB level. b) Energy levels of uracil at different MECPs." max-width=500%}


