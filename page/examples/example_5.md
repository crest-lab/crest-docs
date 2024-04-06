---
layout: default
title: Protonation Site Calculation
parent: "Examples and Guides"
nav_order: 5
toc: false
summary: "A guide to protonation/deprotonation sampling."
permalink: /page/examples/example_5.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

{% include important.html content="Due to technical reasons the atom order of the input coordinates for all protonation/deprotonation applications of CREST is **always** presorted. In the sorted structures all hydrogen atoms are written to the end of the file." %}


---


## Protonation site screening

The protonation site screening is one of CREST's [original workflows](../overview/workflows.html#protonation-site-screeining). 
In the following, it is demonstrated for the alanineglycine molecule from [Example 1](example_1.html).
{: .text-justify }


{% include image.html file="example-5-1.png" alt="Ala-Gly protonation" caption="Protonation of the alanineglycine molecule. The most stable protonated structure (GFN2-xTB, gasphase) is shown on the right." max-width=450 %}

Assuming the input coordinates are given as `struc.xyz`, then the screening procedure for the default settings of GFN2-xTB in the gasphase can be initiated via
{: .text-justify }


 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'command', 'tab-id-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'struc', 'tab-id-1')">{{ site.data.icons.codefile }}  <code>struc.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'output', 'tab-id-1')">{{ site.data.icons.checkfile }} <code>output</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'output2', 'tab-id-1')">{{ site.data.icons.checkfile }} <code>protonated.xyz</code></button>
</div>
<!-- Tab content -->
<div id="command" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--protonate</span>" %}
<span markdown="span">
</span>
</div>
<div id="struc" class="tabcontent tab-id-1" style="font-size:10px">
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
<div id="output" class="tabcontent tab-id-1" style="font-size:10px">
{% capture output_file %}
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
 > crest struc.xyz --protonate

  --protonate : automated protonation script
        __________________________________________
       |                                          |
       |       automated protonation script       |
       |__________________________________________|
  Universitaet Bonn, MCTC
  P.Pracht, Wed 28. Nov 13:11:52 CEST 2018
 
  Cite as:
  P.Pracht, C.A.Bauer, S.Grimme
  JCC, 2017, 38, 2618–2631.
 
 Input coordinate lines sorted:
 element   old   new
      C      1     1
      C      2     2
      N      3     3
      C      4     4
      C      5     5
      O      6     6
      N      7     7
      O      8     8
      O      9     9
      C     12    10
      H     10    11
      H     11    12
      H     13    13
      H     14    14
      H     15    15
      H     16    16
      H     17    17
      H     18    18
      H     19    19
      H     20    20
 
 LMO calculation ... done.
 
-----------------------
Multilevel Optimization
-----------------------
 -------------------------
 1. crude pre-optimization
 -------------------------
 Optimizing all 13 structures from file 'protonate_0.xyz' ...
 1 2 3 4 5 6 7 8 9 10 11 12 13
 done.
 12 structures remain within    90.00 kcal/mol window
 
 ---------------------
 2. loose optimization
 ---------------------
 Optimizing all 12 structures from file 'protonate_1.xyz' ...
 1 2 3 4 5 6 7 8 9 10 11 12
 done.
 12 structures remain within    60.00 kcal/mol window
 
 --------------------------------------------
 3. optimization with user-defined thresholds
 --------------------------------------------
 Optimizing all 12 structures from file 'protonate_2.xyz' ...
 1 2 3 4 5 6 7 8 9 10 11 12
 done.
 9 structures remain within    30.00 kcal/mol window
 
 ===================================================
 Identifying topologically equivalent structures:
 Equivalent to 2. structure: 7 structure(s).
 Done.
 Appending file 'protonated.xyz' with structures.
 
 Initial 9 structures from file protonate_3.xyz have
 been reduced to 3 topologically unique structures.
 
===================================================
============= ordered structure list ==============
===================================================
 written to file 'protonated.xyz'
 
 structure    ΔE(kcal/mol)   Etot(Eh)
    1            0.00        -33.953296
    2            2.33        -33.949576
    3           28.73        -33.907516
 
 
 -----------------
 Wall Time Summary
 -----------------
           LMO calc. wall time :         0h : 0m : 0s
      multilevel OPT wall time :         0h : 0m : 1s
--------------------
Overall wall time  : 0h : 0m : 1s
 
 CREST terminated normally.

{% endcapture %}
{% include codecell.html content=output_file %}
</div>
<div id="output2" class="tabcontent tab-id-1" style="font-size:10px">
{% capture output2_file %}
  21
  -33.9532959000000
 C         -2.2366791737       -0.5404887354        0.4121540226
 C         -1.0429992337        0.4322523796        0.1914454521
 N          0.1273541796        0.1106459377        0.7023931033
 C          1.3278207288        0.8751800087        0.4515985750
 C          2.3614961324        0.0883604762       -0.3544268772
 O          3.4019382844        0.5376718255       -0.7182378556
 N         -3.3679699719        0.2080825698       -0.1883769318
 O         -1.3010836947        1.4505236702       -0.4464138447
 O          1.9536631778       -1.1652077323       -0.5882065573
 C         -2.0132179689       -1.8610502140       -0.3099228628
 H         -4.0811789893        0.5155580127        0.4739802483
 H         -2.7888404050        1.0835923166       -0.5679217435
 H         -2.4016755803       -0.6998826513        1.4799666105
 H          0.2524997735       -0.7732256391        1.1756367513
 H          1.7942383798        1.1763825594        1.3944326754
 H          1.0646486020        1.7789046764       -0.1045882565
 H          2.6272233518       -1.6496791341       -1.0942029622
 H         -2.8786309063       -2.5099583009       -0.1976369980
 H         -1.8273047541       -1.6929201908       -1.3685540258
 H         -1.1545333109       -2.3849925613        0.0991147410
 H         -3.8091519880       -0.2910958199       -0.9639833735
  21
  -33.9495757800000
 C         -2.2115960779       -0.4232578796        0.3354146276
 C         -0.9849427338        0.4641131361        0.1133708322
 N          0.2286072373        0.0089398461        0.1068513485
 C          1.3971435222        0.8377542711       -0.1024011044
 C          2.6929687125        0.0343821360        0.0059880186
 O          3.7734614371        0.5173993474       -0.1038635457
 N         -3.3398788397        0.4952076123        0.2242818787
 O         -1.2324295873        1.7060056707       -0.0721443475
 O          2.4554161839       -1.2627297260        0.2339593620
 C         -2.2514600121       -1.5695854730       -0.6774397340
 H         -3.9570590462        0.4838042218        1.0250762361
 H         -3.8909606978        0.3287231337       -0.6099201196
 H         -2.1446928208       -0.8342484347        1.3494993462
 H          0.4282588123       -0.9763775539        0.2587012566
 H          1.4294852941        1.6512468588        0.6306086674
 H          1.3655535266        1.3068129482       -1.0922428687
 H          3.2887641565       -1.7590932864        0.2985989389
 H         -3.1563773476       -2.1533083300       -0.5276945700
 H         -2.2542621603       -1.1822765638       -1.6938410216
 H         -1.4031016048       -2.2366627382       -0.5583466487
 H         -2.2655920006        1.7583695831       -0.0105437454
  21
  -33.9075158100000
 C         -2.2251338634       -0.4294428722        0.3167057400
 C         -0.9673970868        0.3951686840        0.0040808989
 N          0.1637246544        0.0496888934        0.6771325603
 C          1.3462458434        0.8281808448        0.3749023518
 C          2.4195420743        0.0456529289       -0.2450549336
 O          3.6793896209        0.3562062589       -0.1680159273
 N         -3.4380171991        0.2195875500       -0.0687968484
 O         -0.9167601715        1.2971380917       -0.8032552399
 O          2.1118427387       -1.0152233335       -0.9009340344
 C         -2.0887015559       -1.7600847916       -0.4348043739
 H         -3.6357897789        1.0602413023        0.4564787570
 H         -3.4734267738        0.4186111579       -1.0606659913
 H         -2.2610286904       -0.6128585416        1.3966539808
 H          0.1829094047       -0.6824664346        1.3681234201
 H          1.7079861224        1.4211977385        1.2234150460
 H          0.8950301649        1.5380276922       -0.3873519278
 H          2.8714577997       -1.4734236430       -1.3105708653
 H         -2.9880426576       -2.3445332030       -0.2657102207
 H         -1.9927834847       -1.5794005368       -1.5025590225
 H         -1.2274775786       -2.3257246098       -0.0910275619
 H          3.9095477082        1.1696708650        0.3111684809
{% endcapture %}
{% include codecell.html content=output2_file %}
</div>
{% include defaulttab.html %}


The production run in this example yields 3 possible structures of Ala-Gly+H<sup>+</sup> at GFN2-xTB level in the gasphase.
Two of the structures have a relative energy within 3 kcal/mol. The third structure has a much larger relative energy of almost 30 kcal/mol.
These structures are written to the `protonated.xyz` ensemble file.
Note, that the atom order of hydrogen atoms does change in between the structures and as such the ensemble does not formally match the [ensemble file format](../documentation/coords.html), but due to the same atom type CREST can handle the file nonetheless.
{: .text-justify }

### Using other ions besides H<sup>+</sup>

It is possible to add other ions besides H<sup>+</sup> with the `--swel <symbol>` command (short for "`sw`itch `el`ement").
To do so, simply specify the element symbol and the charge as `<symbol>` argument, for example 
{: .text-justify }

```bash
crest struc.xyz --protonate --swel ca2+
```

to add Ca<sup>2+</sup> instead of H<sup>+</sup>.
There is basically no limitation to which element/charge combination can be added with this command.
However, **_adding polyatomic ions is currently not possible_**.
{: .text-justify }


---

## Deprotonation site screening

The deprotonation site screening is a very simple process. 
One-by-one, protons are removed from a given input structure and the resulting input geometries are optimized.
In the following, it is demonstrated for the alanineglycine molecule from [above {{site.data.icons.aup}}](#).
{: .text-justify }


{% include image.html file="example-5-2.png" alt="Ala-Gly deprotonation" caption="Deprotonation of the alanineglycine molecule. The most stable deprotonated structure (GFN2-xTB, gasphase) is shown on the right." max-width=450 %}

Assuming the input coordinates are given as `struc.xyz`, then the screening procedure for the default settings of GFN2-xTB in the gasphase can be initiated via
{: .text-justify }


 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-1', 'tab-id-2')" id="open2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2', 'tab-id-2')">{{ site.data.icons.codefile }}  <code>struc.xyz</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-3', 'tab-id-2')">{{ site.data.icons.checkfile }} <code>output</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-4', 'tab-id-2')">{{ site.data.icons.checkfile }} <code>deprotonated.xyz</code></button>
</div>
<!-- Tab content -->
<div id="tab-1" class="tabcontent tab-id-2" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--deprotonate</span>" %}
<span markdown="span">
</span>
</div>
<div id="tab-2" class="tabcontent tab-id-2" style="font-size:10px">
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
<div id="tab-3" class="tabcontent tab-id-2" style="font-size:10px">
{% capture output_file %}

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
 > crest struc.xyz --deprotonate

  --deprotonate : automated deprotonation script
        __________________________________________
       |                                          |
       |      automated deprotonation script      |
       |__________________________________________|
  Universitaet Bonn, MCTC
  P.Pracht, Wed 28. Nov 13:11:52 CEST 2018
 
 Input coordinate lines sorted:
 element   old   new
      C      1     1
      C      2     2
      N      3     3
      C      4     4
      C      5     5
      O      6     6
      N      7     7
      O      8     8
      O      9     9
      C     12    10
      H     10    11
      H     11    12
      H     13    13
      H     14    14
      H     15    15
      H     16    16
      H     17    17
      H     18    18
      H     19    19
      H     20    20
-----------------------
Multilevel Optimization
-----------------------
 -------------------------
 1. crude pre-optimization
 -------------------------
 Optimizing all 10 structures from file "deprotonate_0.xyz" ...
 1 2 3 4 5 6 7 8 9 10
 done.
 9 structures remain within    90.00 kcal/mol window
 
 ---------------------
 2. loose optimization
 ---------------------
 Optimizing all 9 structures from file "deprotonate_1.xyz" ...
 1 2 3 4 5 6 7 8 9
 done.
 7 structures remain within    60.00 kcal/mol window
 
 --------------------------------------------
 3. optimization with user-defined thresholds
 --------------------------------------------
 Optimizing all 7 structures from file "deprotonate_2.xyz" ...
 1 2 3 4 5 6 7
 done.
 5 structures remain within    30.00 kcal/mol window
 
 ===================================================
 Identifying topologically equivalent structures:
 Equivalent to 2. structure: 2 structure(s).
 Equivalent to 4. structure: 2 structure(s).
 Done.
 Appending file 'deprotonated.xyz' with structures.
 
 Initial 5 structures from file deprotonate_3.xyz have
 been reduced to 3 topologically unique structures.
 
===================================================
============= ordered structure list ==============
===================================================
 written to file 'deprotonated.xyz'
 
 structure    ΔE(kcal/mol)   Etot(Eh)
    1            0.00        -33.597012
    2           24.18        -33.558475
    3           24.44        -33.558057
 
 
 -----------------
 Wall Time Summary
 -----------------
    INPUT generation wall time :         0h : 0m : 0s
      multilevel OPT wall time :         0h : 0m : 1s
--------------------
Overall wall time  : 0h : 0m : 1s
 
 CREST terminated normally.

{% endcapture %}
{% include codecell.html content=output_file %}
</div>
<div id="tab-4" class="tabcontent tab-id-2" style="font-size:10px">
{% capture output2_file %}
  19
  -33.5970120600000
 C         -2.1708593998       -0.5337349548        0.3174329502
 C         -1.1300518302        0.5631764406       -0.0109828000
 N          0.1206150810        0.2013618108        0.2224174363
 C          1.3321836188        0.9000800714       -0.0990976369
 C          2.4989240716       -0.1817105892        0.0788604457
 O          3.6394124385        0.1997854687       -0.1663904019
 N         -3.5145828210        0.0257215331        0.4393815808
 O         -1.5000115017        1.6529887352       -0.4378797093
 O          2.0885706265       -1.2952519973        0.4542088317
 C         -2.1559906054       -1.5775218668       -0.7994319788
 H         -3.5368219047        0.6413357822        1.2486122040
 H         -3.6518357560        0.6345253879       -0.3671378904
 H         -1.9082787931       -1.0116891660        1.2677593853
 H          0.4014134301       -0.7570338018        0.5027596031
 H          1.5107597776        1.7382256168        0.5818246109
 H          1.3263801551        1.2797019383       -1.1244436706
 H         -2.9077873850       -2.3398362648       -0.6051867349
 H         -2.3815551635       -1.1004724333       -1.7514818083
 H         -1.1764827299       -2.0438403226       -0.8636745012
  19
  -33.5584748600000
 C         -2.1927584335       -0.4616043612        0.3440786365
 C         -0.9552581293        0.3929737503       -0.0314541700
 N          0.0746707491        0.1497799145        0.7312149580
 C          1.2634058933        0.9097598712        0.4112450897
 C          2.4176662088        0.0223878739        0.0810903851
 O          3.5192313290        0.0557773687        0.5950471942
 N         -3.4335471612        0.2433576147        0.0009454232
 O         -1.0793986160        1.2000279714       -0.9808987844
 O          2.1563918940       -0.8800339117       -0.8845041904
 C         -2.1334963814       -1.7717852649       -0.4380978387
 H         -3.5464154298        1.0130709993        0.6585739972
 H         -3.2245641905        0.6940212025       -0.8953163391
 H         -2.1778559810       -0.6749250459        1.4174900496
 H          1.5609611501        1.5455410066        1.2583048133
 H          1.0643516601        1.5513773159       -0.4696834509
 H          2.9336605171       -1.4482855323       -0.9998771010
 H         -3.0010004151       -2.3943363262       -0.2161852163
 H         -2.1207001621       -1.5550657049       -1.5047051136
 H         -1.2222575076       -2.3037500664       -0.1775085954
  19
  -33.5580574900000
 C         -2.1690752402       -0.5896911445        0.3007278255
 C         -1.0770071421        0.4696696924        0.0142832995
 N          0.1623498042        0.0267699146        0.1855561818
 C          1.3802255595        0.7017906623       -0.0182948372
 C          2.5626404067        0.0611685908        0.2016639002
 O          3.7297155720        0.4777116712        0.0801592636
 N         -3.4599663836        0.0497353208        0.5540210958
 O         -1.4116252199        1.6071148069       -0.3495343490
 O          2.4182039037       -1.3021064678        0.6393570478
 C         -2.3049547011       -1.5169584430       -0.9091156655
 H         -3.4010727265        0.5478312871        1.4393397960
 H         -3.5485107853        0.7806781467       -0.1540026061
 H         -1.8977951026       -1.1816934881        1.1843481101
 H          0.3058623525       -0.9263106819        0.4897142094
 H          1.3253072133        1.7195073133       -0.3521321533
 H          3.3270672171       -1.6049746565        0.7469409798
 H         -3.0981100285       -2.2434691439       -0.7396358968
 H         -2.5528476412       -0.9284333481       -1.7899106278
 H         -1.3689397936       -2.0398200288       -1.0912306054
{% endcapture %}
{% include codecell.html content=output2_file %}
</div>
{% include defaulttab.html id="open2" %}

The deprotonation yields 3 possible structures of Ala-Gly<sup>-</sup> at GFN2-xTB level in the gasphase.
Only one of these structures is favorable, while the other two isomers have relative energies at about 24 kcal/mol.
These structures are written to the `deprotonated.xyz` ensemble file.
Note, that like for the protonation procedure, the atom order of hydrogen atoms does change in between the structures and as such the ensemble does not formally match the [ensemble file format](../documentation/coords.html).
{: .text-justify }



---

## Tautomerism screening


The third application belonging to the protonation/deprotonation procedures described in this example
is the screening for *prototropic tautomers*.
This can be done simply by consecutive execution of protonation and deprotonation site screening for a molecule.
In the following, it is demonstrated for the alanineglycine molecule from [above {{site.data.icons.aup}}](#).
{: .text-justify }


Assuming the input coordinates are given as `struc.xyz`, then the screening procedure for the default settings of GFN2-xTB can be initiated as before.
However, since we expect zwitter ions as the possible tautomers of Ala-Gly, we also use ALPB implicit solvation (for water) in this example.
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-3" onclick="openTabId(event, 'tab-new1', 'tab-id-3')" id="open3">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-3" onclick="openTabId(event, 'tab-new2', 'tab-id-3')">{{ site.data.icons.codefile }}  <code>struc.xyz</code></button>
  <button class="tablinks tab-id-3" onclick="openTabId(event, 'tab-new3', 'tab-id-3')">{{ site.data.icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-new1" class="tabcontent tab-id-3" style="text-align:justify">
{% include command.html cmd="crest struc.xyz <span class='nt'>--tautomerize --alpb</span> water" %}
<span markdown="span">
</span>
</div>
<div id="tab-new2" class="tabcontent tab-id-3" style="font-size:10px">
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
<div id="tab-new3" class="tabcontent tab-id-3" style="font-size:10px">
{% capture output_file %}
 
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
 > crest struc.xyz --tautomerize --alpb water

  --tautomerize : automated tautomerization script
  --alpb water : implicit solvation
        __________________________________________
       |                                          |
       |     automated tautomerization script     |
       |__________________________________________|
  Universitaet Bonn, MCTC
  P.Pracht, Wed 28. Nov 13:11:52 CEST 2018
 
 Cite as:
 P.Pracht, R.Wilcken, A.Udvarhelyi, S.Rodde, S.Grimme
 JCAMD, 2018, 32, 1139-1149.
 
 Input coordinate lines sorted:
 element   old   new
      C      1     1
      C      2     2
      N      3     3
      C      4     4
      C      5     5
      O      6     6
      N      7     7
      O      8     8
      O      9     9
      C     12    10
      H     10    11
      H     11    12
      H     13    13
      H     14    14
      H     15    15
      H     16    16
      H     17    17
      H     18    18
      H     19    19
      H     20    20
 
******************************************************************************************
**                   P R O T O N A T I O N   C Y C L E     1 of 2                       **
******************************************************************************************
 
[....]
 
******************************************************************************************
**                 D E P R O T O N A T I O N   C Y C L E     1 of 2                     **
******************************************************************************************

[....] 

******************************************************************************************
**                   P R O T O N A T I O N   C Y C L E     2 of 2                       **
******************************************************************************************
Calculating LMOs for all structures in file 'tautomerize_1.xyz'
 1 2 3 4 5 6 7 8 9 10 11 12 13 14 
Collecting generated protomers ... done.
 
-----------------------
Multilevel Optimization
-----------------------
 -------------------------
 1. crude pre-optimization
 -------------------------
 Optimizing all 178 structures from file "protomers.xyz" ... done.
 Structures sorted out due to dissociation:   12
 160 structures remain within    60.00 kcal/mol window
 
 ---------------------
 2. loose optimization
 ---------------------
 Optimizing all 160 structures from file "protonate_0.xyz" ... done.
 Structures sorted out due to dissociation:    1
 99 structures remain within    30.00 kcal/mol window
 
 ===================================================
 Identifying topologically equivalent structures:
 Equivalent to 1. structure: 5 structure(s).
 Equivalent to 2. structure: 14 structure(s).
[....]
 Done.
 Appending file 'protonated.xyz' with structures.
 
 Initial 99 structures from file protonate_1.xyz have
 been reduced to 25 topologically unique structures.
 ===================================================
 ============= ordered structure list ==============
 ===================================================
 written to file 'protonated.xyz'

 structure    ΔE(kcal/mol)   Etot(Eh)
    1            0.00        -34.071561
    2            0.19        -34.071253
    3            0.85        -34.070211
[....]
   24           28.60        -34.025982
   25           29.34        -34.024801
 
******************************************************************************************
**                 D E P R O T O N A T I O N   C Y C L E     2 of 2                     **
******************************************************************************************
-----------------------
Multilevel Optimization
-----------------------
 -------------------------
 1. crude pre-optimization
 -------------------------
 Optimizing all 275 structures from file "deprotonate_0.xyz" ... done.
 Structures sorted out due to dissociation:   19
 217 structures remain within    60.00 kcal/mol window
 
 ---------------------
 2. loose optimization
 ---------------------
 Optimizing all 217 structures from file "deprotonate_1.xyz" ... done.
 167 structures remain within    30.00 kcal/mol window
 
 ===================================================
 Identifying topologically equivalent structures:
 Equivalent to 1. structure: 5 structure(s).
 Equivalent to 3. structure: 6 structure(s).
[...]
 Equivalent to 158. structure: 3 structure(s).
 Done.
 Appending file 'deprotonated.xyz' with structures.
 
 Initial 167 structures from file deprotonate_2.xyz have
 been reduced to 69 topologically unique structures.
 ===================================================
 ============= ordered structure list ==============
 ===================================================
 written to file 'deprotonated.xyz'

 structure    ΔE(kcal/mol)   Etot(Eh)
    1            0.00        -33.883352
    2            0.16        -33.883094
    3            0.21        -33.883010
    4            0.36        -33.882783
    5            1.12        -33.881568
[....]
   68           29.46        -33.836411
   69           29.79        -33.835885
 
******************************************************************************************
**                              T A U T O M E R I Z E                                   **
******************************************************************************************
 ---------------------------
 Final Geometry Optimization
 ---------------------------
 Optimizing all 69 structures from file "tautomerize_3.xyz" ... done.
 68 structures remain within    30.00 kcal/mol window
 
 ===================================================
 Identifying topologically equivalent structures:
 Equivalent to 1. structure: 2 structure(s).
 Equivalent to 3. structure: 2 structure(s).
 Done.
 Appending file 'tautomers.xyz' with structures.
 
 Initial 68 structures from file tautomerize_4.xyz have
 been reduced to 66 topologically unique structures.
 
===================================================
============= ordered structure list ==============
===================================================
 written to file 'tautomers.xyz'
 
 structure    ΔE(kcal/mol)   Etot(Eh)
    1            0.00        -33.883749
    2            0.00        -33.883749
    3            0.21        -33.883408
    4            0.23        -33.883384
    5            0.52        -33.882926
[....]
   65           29.56        -33.836645
   66           29.61        -33.836570
 
 
 -----------------
 Wall Time Summary
 -----------------
           LMO calc. wall time :         0h : 0m : 0s
      multilevel OPT wall time :         0h : 0m :31s
--------------------
Overall wall time  : 0h : 0m :31s
 
 CREST terminated normally.

{% endcapture %}
{% include codecell.html content=output_file %}
</div>
{% include defaulttab.html id="open3" %}

In general, a much larger variety of structures is obtained than for the standalone protonation or deprotonation procedure.
For Ala-Gly, as expected the zwitter ion is the most stable tautomer in implicit solvation.
Other tautomers, such as the (*S*)-isomer to the input (*R*)-structure are also generated.
However, since many chemical changes can occur in the protonation/deprotonation sequence,
also many artifacts at the respective level of theory are created.
When evaluating the output file (`tautomers.xyz`), the user must decide by his/her chemical intuition whether to consider a generated tautomer for further investigation or not.
{: .text-justify }

{% include image.html file="example-5-3.png" alt="Ala-Gly tautomers" caption="Some tautomers of the alanineglycine molecule (GFN2-xTB, ALPB water)." max-width=600 %}

Note, that the protonation/deprotonation sequence is performed twice for the tautomer screening.
This is because a single sequence swaps one proton position relative to the input structure.
Swapping more than one proton position squentially can therefore be achieved by multiple executions of the protonation/deprotonation.
{: .text-justify }

