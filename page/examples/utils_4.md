---
layout: default
title: <code>thermo</code> Calculations
parent: Utility Tools
grand_parent: Examples
nav_order: 4
toc: false
summary: "How to evaluate thermodynamical partition functions with the <i>thermo</i> submodule."
permalink: /page/examples/utilities/utils_4.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Evaluating rotational/vibrational/translational partition functions


{% include image.html file="utils-example-4-1.png" alt="Thymine input structure" caption="Input structure of the thymine molecule used to obtain the vibrational frequencies." max-width=200 %}


 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{site.data.icons.code}} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{site.data.icons.codefile}} <code>struc.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{site.data.icons.codefile}} <code>vibspectrum</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-4', 'tab-id-1')">{{site.data.icons.checkfile}} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--thermo</span> struc.xyz" %}
{% include note.html content="The <code>vibspectrum</code> file must be present <i>in the same directory</i> and is not explicitly specified via the command line!" %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture inputfile %}
  15
 
 O          1.6295236631       -1.6750880104        0.0273337989
 C          0.8505026159       -0.7502234227        0.0134304505
 N         -0.5218781169       -0.9874374197       -0.0063526997
 C         -1.5401115163       -0.0659265702       -0.0253285595
 O         -2.7097403039       -0.3600312267       -0.0416029833
 N         -1.1000479488        1.2392522165       -0.0242265895
 C          0.2235337218        1.5858124075       -0.0036680534
 C          1.2067187753        0.6684447723        0.0152381391
 C          2.6606979446        1.0088396987        0.0381263685
 H         -0.8083247148       -1.9604112352       -0.0073629285
 H         -1.8173110585        1.9499835714       -0.0379190725
 H          0.4295022336        2.6464257401       -0.0036869221
 H          2.8109266091        2.0846097420        0.0364195981
 H          3.1545530447        0.5713072437       -0.8278672347
 H          3.1254195278        0.5782828637        0.9235387765
{% endcapture %}
{% include codecell.html content=inputfile style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture vibfile %}
$vibrational spectrum
#  mode     symmetry     wave number   IR intensity    selection rules
#                         cm**(-1)      (km*mol⁻¹)       IR     RAMAN
     1                      -0.00         0.00000        -       - 
     2                      -0.00         0.00000        -       - 
     3                      -0.00         0.00000        -       - 
     4                       0.00         0.00000        -       - 
     5                       0.00         0.00000        -       - 
     6                       0.00         0.00000        -       - 
     7        a             70.05         0.38846       YES     YES
     8        a            105.13         0.44816       YES     YES
     9        a            147.88         4.81587       YES     YES
    10        a            261.06         3.14819       YES     YES
    11        a            301.90         0.50209       YES     YES
    12        a            360.79         7.68669       YES     YES
    13        a            377.25        25.99351       YES     YES
    14        a            431.27        13.50432       YES     YES
    15        a            522.33         2.07831       YES     YES
    16        a            583.19         4.66771       YES     YES
    17        a            587.91       102.69438       YES     YES
    18        a            664.09        13.87677       YES     YES
    19        a            685.26        10.36450       YES     YES
    20        a            720.79       217.35379       YES     YES
    21        a            755.25         2.31369       YES     YES
    22        a            777.49         2.22428       YES     YES
    23        a            860.72        15.31103       YES     YES
    24        a            958.79         1.79962       YES     YES
    25        a           1006.53         1.51584       YES     YES
    26        a           1035.98         6.36000       YES     YES
    27        a           1126.59        38.23933       YES     YES
    28        a           1153.10        45.04718       YES     YES
    29        a           1212.04        55.76099       YES     YES
    30        a           1273.30        29.07111       YES     YES
    31        a           1303.81        96.17203       YES     YES
    32        a           1327.48        68.41479       YES     YES
    33        a           1400.54        60.93027       YES     YES
    34        a           1410.68       139.45727       YES     YES
    35        a           1454.52         5.40728       YES     YES
    36        a           1472.57         1.05534       YES     YES
    37        a           1663.21       141.68596       YES     YES
    38        a           1739.67       685.35070       YES     YES
    39        a           1779.98       830.38911       YES     YES
    40        a           3016.25         8.53182       YES     YES
    41        a           3034.18         7.87679       YES     YES
    42        a           3052.46        20.26137       YES     YES
    43        a           3076.43        17.81182       YES     YES
    44        a           3398.16        26.97265       YES     YES
    45        a           3444.01        49.06620       YES     YES
$end
{% endcapture %}
{% include codecell.html content=vibfile style="font-size:10px" %}
</div>
<div id="tab-1-4" class="tabcontent tab-id-1" style="text-align:justify">
{% capture outfile %}
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
 > crest --thermo struc.xyz

Mol. weight /amu  :   126.11
Rot. const. /MHz  :  3209.69 1425.53  993.12
Rot. const. /cm-1 :     0.11    0.05    0.03
Symmetry:    cs 

          ...................................................
          :                      SETUP                      :
          :.................................................:
          :  # frequencies                          39      :
          :  # imaginary freq.                       0      :
          :  linear?                                 F      :
          :  symmetry                               cs      :
          :  rotational number                       1      :
          :  scaling factor                  1.0000000      :
          :  rotor cutoff                   25.0000000 cm⁻¹ :
          :  imag. cutoff                  -50.0000000 cm⁻¹ :
          :.................................................:

    mode    ω/cm⁻¹     T·S(HO)/kcal·mol⁻¹    T·S(FR)/kcal·mol⁻¹   T·S(vib)
   ------------------------------------------------------------------------
       1     70.05    -1.23790 ( 98.40%)    -0.95645 (  1.60%)    -1.23341
       2    105.13    -1.00086 ( 99.68%)    -0.83625 (  0.32%)    -1.00034
       3    147.88    -0.80480 ( 99.92%)    -0.73521 (  0.08%)    -0.80475
       4    261.06    -0.49334 ( 99.99%)    -0.56689 (  0.01%)    -0.49335
   ------------------------------------------------------------------------

   temp. (K)  partition function   enthalpy   heat capacity  entropy
                                   cal/mol     cal/K/mol   cal/K/mol   J/K/mol
 298.15  VIB   79.3                 3380.390     24.301     20.012
         ROT  0.407E+06              888.752      2.981     28.650
         INT  0.323E+08             4269.143     27.282     48.662
         TR   0.137E+28             1481.254      4.968     40.391
         TOT                        5750.3966    32.2500    89.0530   372.5979

       T/K    H(0)-H(T)+PV         H(T)/Eh          T*S/Eh         G(T)/Eh
   ------------------------------------------------------------------------
    278.15    0.816352E-02    0.118775E+00    0.385087E-01    0.802659E-01
    288.15    0.865677E-02    0.119268E+00    0.403947E-01    0.788731E-01
    298.15    0.916384E-02    0.119775E+00    0.423120E-01    0.774629E-01 (used)
    308.15    0.968460E-02    0.120296E+00    0.442601E-01    0.760355E-01
    318.15    0.102189E-01    0.120830E+00    0.462389E-01    0.745910E-01
    328.15    0.107666E-01    0.121378E+00    0.482481E-01    0.731295E-01
    338.15    0.113275E-01    0.121939E+00    0.502874E-01    0.716511E-01
    348.15    0.119015E-01    0.122513E+00    0.523565E-01    0.701560E-01
    358.15    0.124883E-01    0.123099E+00    0.544552E-01    0.686442E-01
    368.15    0.130878E-01    0.123699E+00    0.565831E-01    0.671158E-01
    378.15    0.136998E-01    0.124311E+00    0.587399E-01    0.655710E-01
   ------------------------------------------------------------------------
 
 -----------------
 Wall Time Summary
 -----------------
--------------------
Overall wall time  : 0h : 0m : 0s
 
 CREST terminated normally.
{% endcapture %}
{% include codecell.html content=outfile style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}


