---
layout: default
title: Calculating RMSDs
parent: Utility Tools
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

