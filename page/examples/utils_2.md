---
layout: default
title: Calculating RMSDs
parent: Utility Tools
grand_parent: Examples
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
       ==============================================
       |                                            |
       |                 C R E S T                  |
       |                                            |
       |  Conformer-Rotamer Ensemble Sampling Tool  |
       |          based on the GFN methods          |
       |             P.Pracht, S.Grimme             |
       |          Universitaet Bonn, MCTC           |
       ==============================================
       Version 2.12,   Thu 19. Mai 16:32:32 CEST 2022
  Using the xTB program. Compatible with xTB version 6.4.0
 
   Cite work conducted with this code as

   • P.Pracht, F.Bohle, S.Grimme, PCCP, 2020, 22, 7169-7192.
   • S.Grimme, JCTC, 2019, 15, 2847-2862.

   and for works involving QCG as

   • S.Spicher, C.Plett, P.Pracht, A.Hansen, S.Grimme,
     JCTC, 2022, 18 (5), 3174-3189.
 
   with help from:
   C.Bannwarth, F.Bohle, S.Ehlert, S.Grimme,
   C.Plett, P.Pracht, S.Spicher
 
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

 Command line input:
 > crest --rmsd struc1.xyz struc2.xyz

 Calculated RMSD (Å):      1.48259461
{% endcapture %}
{% include codecell.html content=crest_output style="font-size:10px" %}

The RMSD will always be printed in Å, regardless of the input file format of `<FILE1>` and `<FILE2>`.
Since the RMSD is printed as the last line of this CREST printout, it can easily be 
read from the command line (e.g. for scripting purposes)
{: .text-justify }
```bash
crest --rmsd struc1.xyz struc2.xyz | tail -1
```

