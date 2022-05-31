---
layout: default
title: Calculate <i>S</i><sub>msRRHO</sub>
parent: Utility Tools
grand_parent: "Examples and Guides"
nav_order: 5
toc: false
summary: "How to calculating an <i>averaged</i> <i>S</i><sub>msRRHO</sub> for CREST's entropy mode."
permalink: /page/examples/utilities/utils_5.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Calculating an averaged <i>S</i><sub>msRRHO</sub>

In [*Chem. Sci.*, **2021**, *12*, 6551-6568](https://doi.org/10.1039/D1SC00621E)
the conformational entropy is calculated as

\$$
S_\text{conf} = S'_\text{conf} + \bar{S}_\text{msRRHO}
$$

where $$S'_\text{conf}$$ is the conformational term proportional to the Gibbs-Shannon entropy,
and the *averaged* <i>S</i><sub>msRRHO</sub> is obtained as

\$$
\bar{S}_\text{msRRHO} = \sum_i^\text{ensemble} p_i S_{\text{msRRHO},i} - S_{\text{msRRHO},0}
$$

The *averaged* <i>S</i><sub>msRRHO</sub> is an ensemble average over all <i>S</i><sub>msRRHO</sub> contributions for each conformer.
Note that the <i>S</i><sub>msRRHO</sub> entropy *for the input structure*, <i>S</i><sub>msRRHO,0</sub> is substracted here in order to make the entire term <i>S</i><sub>conf</sub> an additive correction to the DFT-based molecular entropy. 
{: .test-justify }

The *averaged* <i>S</i><sub>msRRHO</sub> can be calculated in a standalone application of CREST, similar to  the `--mdopt` and `--screen` commands.
The respective calculation can be invoked by the `--rrhoav` command.

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" 
  id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.  icons.codefile}} <code>input-ensemble.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-4', 'tab-id-1')">{{ site.data.  icons.checkfile}} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd='crest <span class="nt">--rrhoav</span> input-ensemble.xyz' %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture inputfile %}

{% endcapture %}
{% include codecell.html content=inputfile style="font-size:10px" %}
</div>
<div id="tab-1-4" class="tabcontent tab-id-1" style="text-align:justify">
{% capture outputfile %}

{% endcapture %}
{% include codecell.html content=outputfile style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}
