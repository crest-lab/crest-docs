---
layout: default
title: "Metadynamics-based Conformational Sampling"
# parent: "Examples and Guides"
parent: "Sampling Applications"
grand_parent: "Examples and Guides"
nav_order: 1
toc: false
summary: "A simple conformational search based on metadynamics simulations."
permalink: /page/examples/example_1.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---


## Standard Conformational Search (iMTD-GC)

The default application of CREST is the [iMTD-GC workflow]({{site.baseurl}}/page/overview/workflows.html#imtd-gc-algorithm). 
In the following, a standard production run with this workflow is shown for the alanineglycine molecule.
{: .text-justify }


{% include image.html file="example_1_1.png" alt="Ala-Gly input structure" caption="Input structure of the alanineglycine molecule." max-width=300%}

Let’s assume that we are interested in the conformations of Ala-Gly at the GFN2-xTB level with GBSA implicit solvation for water, and that we are using 4 CPU threads. 
Assuming further that our initial input structure (atomic coordinates, here in Ångström) are given in a file `struc.xyz`, then the conformational search can be initiated from the command line via:
{: .text-justify }


 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-1-1" onclick="openTabId(event, 'command', 'tab-1-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-1-1" onclick="openTabId(event, 'toml', 'tab-1-1')" id="defaultOpen">{{ site.data.icons.codefile }} <code>input.toml</code></button> 
  <button class="tablinks tab-1-1" onclick="openTabId(event, 'struc', 'tab-1-1')">{{ site.data.icons.codefile }}  <code>struc.xyz</code></button>
  <button class="tablinks tab-1-1" onclick="openTabId(event, 'output', 'tab-1-1')">{{ site.data.icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="command" class="tabcontent tab-1-1" style="text-align:justify">
 {% include command.html cmd="crest input.toml" %}   
<b>OR</b> use
{% include command.html cmd="crest struc.xyz --gfn2 --gbsa h2o -T 4" %}
<span markdown="span">
These commands need to be executed from the command line. In the first case, settings are provided entirely via a separate `input.toml` file (CREST >= 3.0), while the second version is the standard CMD version.
Here, `--gfn2` specifies   the usage of the SQM level GFN2-xTB, `--gbsa h2o` implements 
the GBSA implicit solvation  for water, and `-T 4` requests the usage of 4 CPU threads.
You can save the terminal output of this command by adding `> crest.out` at the end of the line.
The output will look something like the one in the `output` tab above.
</span>
</div>
<div id="toml" class="tabcontent tab-1-1" style="font-size:10px"> 
{% capture toml_input %}
# This is a CREST input file
input = "struc.xyz"
runtype = "imtd-gc"
threads = 4

[calculation]
[[calculation.level]]
method = "gfn2"
alpb = "h2o"
{% endcapture %}                                                   
{% include codecell.html content=toml_input %}                      
</div>                                                             
<div id="struc" class="tabcontent tab-1-1" style="font-size:10px">
{% capture struc_xyz %}
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
{% include codecell.html content=struc_xyz %}
</div>
<div id="output" class="tabcontent tab-1-1" style="font-size:10px">
{% capture output_file %}
  {% include outputs/example_1_output.txt %}
{% endcapture %}
{% include codecell.html content=output_file %}
</div>
{% include defaulttab.html %}


{% include tip.html content="It's usually wise to pre-optimze your input structure with <code>xtb</code> at the same level on which the conformational search shall be conducted. Since the input structure is taken as a reference for several topology checks within the sorting routine, such as unchanging coordination numbers of the atoms, providing a structure on the same level of theory is recommended." %}

The program call first creates a `coord` file from the given input structure. 
Then, settings such as the length of the MTD simulation are automatically determined from a molecular flexibility measure.
With these settings, the workflow as presented [here]({{site.baseurl}}/page/overview/workflows.html#imtd-gc-algorithm) is conducted.
{: .text-justify }


The production run in this example yields 147 structures of Ala-Gly, distributed over 61 different conformers within 6 kcal/mol above the lowest conformer that was found at the search level.
The three lowest conformers at the search level are shown below.
{: .text-justify }

{% include image.html file="example_1_2.png" alt="Ala-Gly conformers" caption="Three lowest conformers of alanineglycine generated by CREST at the GFN2-xTB/GBSA(H<sub>2</sub>O) level." %}

Each of the 61 conformers may shows several rotamers, which by definition are degenerate forms of the respective confromer.
The final ensemble of all the found conformers is written to an ensemble file in the Xmol format called `crest_conformers.xyz`. The corresponding CRE, *i.e.*, the ensemble containing conformers *and* rotamers is written to the file `crest_rotamers.xyz`.
{: .text-justify }


