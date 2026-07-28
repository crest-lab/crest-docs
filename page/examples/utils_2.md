---
layout: default
title: Calculating RMSDs
parent: "Sorting"
grand_parent: "Examples and Guides"
nav_order: 2
toc: false
summary: "How to calculate a Cartesian RMSD with CREST."
permalink: /page/examples/utilities/utils_2.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Calculating Cartesian RMSDs

The calculation of Cartesian RMSDs as a standalone tool in CREST is straight-forward with the `--rmsd <FILE1> <FILE2>` option.
Assuming the two structures to be compared are named `struc1.xyz` and `struc2.xyz`, the CREST command would be
{: .test-justify }

```bash
crest --rmsd struc1.xyz struc2.xyz
```

In the following, the two structures are conformers of alanineglycine that differ by a
rotation of the carboxyl group:
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-rmsd" onclick="openTabId(event, 'rmsd-struc1', 'tab-rmsd')" id="defaultOpen">{{ site.data.icons.codefile }} <code>struc1.xyz</code></button>
  <button class="tablinks tab-rmsd" onclick="openTabId(event, 'rmsd-struc2', 'tab-rmsd')">{{ site.data.icons.codefile }} <code>struc2.xyz</code></button>
</div>
<!-- Tab content -->
<div id="rmsd-struc1" class="tabcontent tab-rmsd" style="font-size:10px">
{% capture struc1_rmsd %}
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
{% include codecell.html content=struc1_rmsd %}
</div>
<div id="rmsd-struc2" class="tabcontent tab-rmsd" style="font-size:10px">
{% capture struc2_rmsd %}
20

C       2.081440      0.615100     -0.508430
C       2.742230      1.824030     -1.200820
N       4.117790      1.799870     -1.190410
C       4.943570      2.827040     -1.822060
C       6.440080      2.569360     -1.637600
O       7.192128      3.169549     -0.890864
N       0.610100      0.695090     -0.538780
O       2.095560      2.724940     -1.739670
O       6.904976      1.547802     -2.400176
H       0.303080      1.426060      0.103770
H       0.338420      1.050680     -1.460480
C       2.488753     -0.593400     -1.198448
H       2.416500      0.557400      0.532050
H       4.614100      1.081980     -0.670550
H       4.699850      3.794460     -1.373720
H       4.722890      2.844690     -2.894180
H       7.856649      1.502460     -2.158231
H       2.029201     -1.457008     -0.719999
H       2.170233     -0.542411     -2.238576
H       3.572730     -0.688405     -1.154998
{% endcapture %}
{% include codecell.html content=struc2_rmsd %}
</div>
{% include defaulttab.html %}

which produces the outcome

{% capture crest_output %}
  {% include outputs/utils_2_output.txt %}
{% endcapture %}
{% include codecell.html content=crest_output style="font-size:10px" %}

The RMSD will always be printed in Å, regardless of the input file format of `<FILE1>` and `<FILE2>`.
Since the RMSD is printed as the last line of this CREST printout, it can easily be 
read from the command line (e.g. for scripting purposes)
{: .text-justify }
```bash
crest --rmsd struc1.xyz struc2.xyz | tail -1
```

