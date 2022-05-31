---
layout: default
title: Topology Check
parent: Utility Tools
grand_parent: "Examples and Guides"
nav_order: 3
toc: false
summary: "Checking the molecular topology with CREST."
permalink: /page/examples/utilities/utils_3.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Checking molecular topologies

The molecular topology used by CREST, and in particular used for the structure sorting in CREGEN,
can be printed with the command `--testtopo <FILE>`.
Taking the caffeine molecule as an example 
{: .text-justify }

```bash
crest --testtopo caffeine.xyz
```
{% include image.html file="caffeine.png" alt="caffeine" max-width=400 %}

will provide the output 

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
 > crest --testtopo caffeine.xyz

 
 -----------------
 TOPOLOGY ANALYSIS
 -----------------
 Coordinates (Bohr):
          0.888171196170          4.854328018555          0.001133835570     O 
         -5.909362016047         -0.838282431108         -0.000566917785     O 
         -1.830388554489         -2.480265308453          0.000000000000     N 
          4.191790100731          0.266829304041         -0.000566917785     N 
         -2.546783661868          2.040337107456         -0.000188972595     N 
          2.668104067813         -3.660777108979          0.000377945190     N 
          1.621195891902          0.489816966058         -0.001511780759     C 
          0.736426202441         -1.939614714359         -0.000755890380     C 
          0.058014586643          2.687190299901         -0.001133835570     C 
         -3.602006631955         -0.471486624350         -0.000755890380     C 
          4.730361996281         -2.267293193967          0.000566917785     C 
         -2.697772765217         -5.094701159305          0.001511780759     C 
          6.033139065726          2.279198467447          0.000566917785     C 
         -4.340511532941          4.134909349657          0.001322808165     C 
          6.644843355514         -2.983310356156          0.001511780759     H 
         -1.974952589611         -6.042020777688         -1.688848080887     H 
         -4.759463775900         -5.214887729681          0.002078698544     H 
         -1.974196699231         -6.040131051739          1.692627532786     H 
          7.935337206289          1.474175213047          0.000377945190     H 
          5.757617022319          3.418892187469         -1.699241573608     H 
          5.757239077129          3.417191434114          1.701509244747     H 
         -3.417947324494          5.981171602121         -0.000566917785     H 
         -5.541054428529          3.973526753587          1.678265615571     H 
         -5.545589770808          3.972392918018         -1.672218492533     H 
 
             CN         neighbours
 O (1)       1.0619     9 
 O (2)       1.0561     10 
 N (3)       3.1322     8 10 12 
 N (4)       3.2817     7 11 13 
 N (5)       3.1440     9 10 14 
 N (6)       2.2107     8 11 
 C (7)       3.4651     4 8 9 
 C (8)       3.6067     3 6 7 
 C (9)       3.1545     1 5 7 
 C (10)      3.1799     2 3 5 
 C (11)      3.5116     4 6 15 
 C (12)      4.0689     3 16 17 18 
 C (13)      4.0547     4 19 20 21 
 C (14)      4.0789     5 22 23 24 
 H (15)      1.0011     11 
 H (16)      0.9979     12 
 H (17)      0.9981     12 
 H (18)      0.9979     12 
 H (19)      0.9982     13 
 H (20)      0.9985     13 
 H (21)      0.9985     13 
 H (22)      0.9981     14 
 H (23)      0.9980     14 
 H (24)      0.9980     14 
 
 Number of fragments in the system:  1
 
 Total number of rings in the system: 2

 ring size: 6
           3           5           7           8           9          10
 ring size: 5
           4           6           7           8          11

 Total number of rings in the system: 2
{% endcapture %}
{% include codecell.html content=crest_output style="font-size:10px" %}


