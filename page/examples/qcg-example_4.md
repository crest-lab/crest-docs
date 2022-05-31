---
layout: default
title: QCG Example 4
parent: QCG Examples
grand_parent: "Examples and Guides"
nav_order: 4
toc: false
summary: "An example for the calculation of Solvation Free Energies with QCG."
permalink: /page/examples/qcg/example_4.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Calculationg solvation free energies


The solvation free energy can be computed **for any solute-solvent combination** with QCG. 
Again, only input geometries are required. 
Let’s consider 1-pentanol in benzene. 
We provide the input coordinates `pentanol.xyz` and `benzene.coord`. 
The following call will initiate the solvation free energy computation.
{: .text-justify }


 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>pentanol.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{ site.data.  icons.codefile }} <code>benzene.coord</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-4', 'tab-id-1')">{{ site.data.  icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd='crest pentanol.xyz <span class="nt">--qcg</span> benzene.coord <span class="nt">--nsolv</span> 25 <span class="nt">--T</span> 12 <span class="nt">--gsolv</span> <span class="nt">--nclus</span> 4 <span class="nt">--fscal</span> 0.65 <span class="nt">--gbsa</span> benzene' %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
 18

C          1.1956067224        0.3810439760        0.2749699821
C          2.6993267582        0.1988054806        0.4398058012
C          3.3048739621       -0.5930561241       -0.7170407712
C          4.8104223372       -0.7810968097       -0.5556226318
C          5.4141490570       -1.5692919510       -1.7184358828
O          6.7925871816       -1.8090235819       -1.5591217978
H          0.7847307317        0.9460737154        1.1083269558
H          0.6967141904       -0.5847813396        0.2356859339
H          0.9746565928        0.9171147501       -0.6455272552
H          2.9009463902       -0.3234896023        1.3776341886
H          3.1790981167        1.1786519338        0.4972352731
H          3.1045811920       -0.0710584163       -1.6560239285
H          2.8240160617       -1.5719984791       -0.7751608993
H          5.0195701758       -1.3132022816        0.3749761863
H          5.2956555541        0.1982438034       -0.4961001357
H          5.2241018357       -1.0388860571       -2.6640512701
H          4.9541986817       -2.5581683607       -1.7828096756
H          7.2421309110       -0.9635515651       -1.4497510164
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
$coord
  -13.87039726485370    2.82210248171752   -0.00000000000001      c
  -12.01481772929320    4.66684409238559    0.00000000000005      c
  -13.20059388975830    0.29275302437682   -0.00000000000006      c
  -15.84108693251735    3.35633820529181    0.00000000000002      h
  -9.48943548457286     3.98223577676367   -0.00000000000002      c
  -12.53750229368448    6.64062893972117    0.00000000000005      h
  -10.67521101562521   -0.39185500509649    0.00000000000005      c
  -14.64860105080699   -1.14679576913850   -0.00000000000008      h
  -8.81963207801176     1.45288625624259    0.00000000000002      c
  -8.04142898121708     5.42178558198453   -0.00000000000009      h
  -6.84894223900865     0.91865045782779   -0.00000000000001      h
  -10.15253022931515   -2.36564093901184    0.00000000000007      h
$end
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-4" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
       ==============================================
       |                                            |
       |                 C R E S T                  |
       |                                            |
       |  Conformer-Rotamer Ensemble Sampling Tool  |
       |          based on the GFN methods          |
       |             P.Pracht, S.Grimme             |
       |          Universitaet Bonn, MCTC           |
       ==============================================
       Version 2.11, Mon 19. Apr 11:43:20 CEST 2021
  Using the xTB program. Compatible with xTB version 6.4.0

   Cite work conducted with this code as

   P. Pracht, F. Bohle, S. Grimme, PCCP, 2020, 22, 7169-7192.

   and  S. Grimme, JCTC, 2019, 15, 2847-2862.

   with help from:
   C.Bannwarth, F.Bohle, S.Ehlert, S.Grimme,
   C. Plett, P.Pracht, S. Spicher

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

 Command line input:
 > crest pentanol.xyz --qcg benzene.coord -nsolv 25 -T 12 -gsolv -nclus 4 -fscal 0.65 -gbsa benzene

 Solute-file: pentanol.xyz
 Solvent-file: benzene.coord
  -T 12 (CPUs/Threads selected)
  Use of GFN-FF for ensemble search requested.
  Use of GFN-FF for frequency computation requested.
  --gbsa benzene : implicit solvation
  -mdtime 10 (MD length in ps)

  ========================================
  |           ----------------           |
  |                 Q C G                |
  |           ----------------           |
  |        Quantum Cluster Growth        |
  |       University of Bonn, MCTC       |
  ========================================
   S. Grimme, S. Spicher, C.Plett, unpublished.


  =========================================
  |   quantum cluster growth: INPUT       |
  =========================================

  QCG: Calculation of delta G_solv
  Ensemble generated via CREST

  input parameters
  solute                 : pentanol.xyz
  charge                 : 0
  uhf                    : 0
  solvent                : benzene.coord
  # of solvents to add   : 25
  # of cluster generated : 4
  # of CPUs used         : 12
  Solvation model        : benzene
  xtb opt level          : normal
  System temperature [K] : 298.0
  RRHO scaling factor    : 0.65

 Solute geometry
  molecular radius (Bohr**1):    6.52
  molecular area   (Bohr**2):  651.12
  molecular volume (Bohr**3): 1159.46
 Solvent geometry
  molecular radius (Bohr**1):    6.06
  molecular area   (Bohr**2):  516.08
  molecular volume (Bohr**3):  931.74

  radius of solute    :    10.51
  radius of solvent   :     9.77

  =========================================
  |            Preoptimization            |
  =========================================

 -------------------------
 xTB Geometry Optimization
 -------------------------
 Geometry successfully optimized.
 Generating LMOs for solute
  Total Energy of solute:     -20.8872146 Eh

 -------------------------
 xTB Geometry Optimization
 -------------------------
 Geometry successfully optimized.
 Generating LMOs for solvent
  Total energy of solvent:    -15.8796407 Eh

  ________________________________________________________________________

  __________________     Solute Cluster Generation   _____________________

  ________________________________________________________________________


  =========================================
  |   quantum cluster growth: GROW        |
  =========================================
  [...]

  =========================================
  |   quantum cluster growth: ENSEMBLE    |
  =========================================
  [...]

  ________________________________________________________________________

  _________________     Solvent Cluster Generation   _____________________

  ________________________________________________________________________

 Method for CFF: GFN2-xTB

  =========================================
  |   quantum cluster growth: CFF         |
  =========================================

  CUT-FREEZE-FILL Algorithm to generate reference solvent cluster
  now adding solvents to fill cluster...
  Size  Cluster   E /Eh        De/kcal   Detot/kcal  Opt
  ------------------------------------------------------------------------
  adding solvent is repulsive for cluster: 1
  previous cluster taken...
  26       2   -413.211286     -2.24       -2.24    tight
  26       3   -413.210426     -3.44       -3.44    tight
  26       4   -413.216554     -7.37       -7.37    tight
  ------------------------------------------------------------------------
  volume filled
  Starting optimizations + SP  of structures
  4 jobs to do.

  done.

  Cluster   E /Eh        Density  Efix       R   av/act. Surface   Opt
    1      -397.332086   1.067    0.000     0.0   0.0     5955.5   tight
    2      -397.318544   1.060    0.000     0.0   0.0     6373.5   tight
    3      -397.317717   1.057    0.000     0.0   0.0     6591.9   tight
    4      -397.323610   1.058    0.000     0.0   0.0     6433.2   tight

  ------------------------------------------------------------------------
  ------------------------------------------------------------------------
  Boltz. averaged energy of final cluster:
       G /Eh     : -397.33208567
       T*S /kcal :  -0.001

  Solvent cluster generation finished.
  Results can be found in solvent_cluster directory
  Structures on file 'crest_ensemble.xyz'
  Energies on file 'cluster_energy.dat'
  Population on file 'population.dat'

  =========================================
  |   quantum cluster growth: ESOLV       |
  |                                       |
  |           -10.21 kcal/mol             |
  =========================================

  =========================================
  |          Frequency evaluation         |
  =========================================

 Method for CFF: GFN-FF
   SOLUTE MOLECULE
  Starting reoptimizations + Frequency computation of ensemble
  1 jobs to do.

  done.
   SOLUTE CLUSTER
  Starting reoptimizations + Frequency computation of ensemble
  4 jobs to do.

  done.
   SOLVENT CLUSTER
  Starting reoptimizations + Frequency computation of ensemble
  4 jobs to do.

  done.

   Solute Gas properties
  #       H(T)       SVIB      SROT       STRA      G(T)
       [kcal/mol]    [      cal/mol/K        ]    [kcal/mol]
  --------------------------------------------------------
      108.59     20.37     27.20     39.32     82.68

   Solute cluster properties
  #       H(T)       SVIB      SROT       STRA      G(T)
       [kcal/mol]    [      cal/mol/K        ]    [kcal/mol]
  --------------------------------------------------------
  1     1794.49    762.14     44.60     48.69   1539.44
  2     1794.49    763.02     44.55     48.69   1539.19
  3     1794.21    766.70     44.64     48.69   1537.80
  4     1794.06    761.65     44.61     48.69   1539.16

   Solvent cluster properties
  #       H(T)       SVIB      SROT       STRA      G(T)
       [kcal/mol]    [      cal/mol/K        ]    [kcal/mol]
  --------------------------------------------------------
  1     1683.97    718.09     44.20     48.55   1442.21
  2     1683.88    721.14     44.26     48.55   1441.20
  3     1683.17    730.73     44.55     48.55   1437.54
  4     1683.61    722.85     44.32     48.55   1440.40


  ________________________________________________________________________

  _________________________     Evaluation    ____________________________

  ________________________________________________________________________


  -----------------------------------------------------
  Gsolv and Hsolv ref. state: [1 M gas/solution]
  G_solv (incl.RRHO)      =    3.65 kcal/mol
  H_solv (incl.RRHO)      =   -7.64 kcal/mol
  -----------------------------------------------------

  -----------------------------------------------------
  Gsolv and Hsolv ref. state: [1 M gas/solution]
  G_solv (incl.RRHO)      =    1.75 kcal/mol
  H_solv (incl.RRHO)      =   -9.54 kcal/mol
  -----------------------------------------------------

  -----------------------------------------------------
  Solvation free energies with scaled translational
  and rotational degrees of freedom: Gsolv (scaling)
          >>    -16.93 (0.05)    <<
          >>    -15.95 (0.10)    <<
          >>    -14.97 (0.15)    <<
          >>    -13.98 (0.20)    <<
          >>    -13.00 (0.25)    <<
          >>    -12.01 (0.30)    <<
          >>    -11.03 (0.35)    <<
          >>    -10.05 (0.40)    <<
          >>     -9.06 (0.45)    <<
          >>     -8.08 (0.50)    <<
          >>     -7.10 (0.55)    <<
          >>     -6.11 (0.60)    <<
          >>     -5.13 (0.65)    <<
          >>     -4.15 (0.70)    <<
          >>     -3.16 (0.75)    <<
          >>     -2.18 (0.80)    <<
          >>     -1.20 (0.85)    <<
          >>     -0.21 (0.90)    <<
          >>      0.77 (0.95)    <<
          >>      1.75 (1.00)    <<
  -----------------------------------------------------

  ==================================================
  |  Gsolv with SCALED RRHO contributions: 0.75    |
  |  [1 bar gas/ 1 M solution]                     |
  |                                                |
  |  G_solv (incl.RRHO)+dV(T)=   -5.13 kcal/mol    |
  ==================================================


 -----------------
 Wall Time Summary
 -----------------
             test MD wall time :         0h : 0m :13s
                 MTD wall time :         0h :39m : 3s
      multilevel OPT wall time :         0h :46m :35s
                  MD wall time :         5h :23m :24s
                 CFF wall time :         0h :16m : 7s
         Frequencies wall time :         0h : 1m :48s
--------------------
Overall wall time  : 7h : 7m :12s

 CREST terminated normally.
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}

The call will cause the grow algorithm to start with subsequent ensemble generation. 
In addition to the solute-solvent ensemble also a pure solvent ensemble will be 
created from the solute-solvent ensemble. These reference clusters can be found in 
the directory `solvent_ensemble`.
{: .text-justify }

{% include note.html content="The reference ensemble is created per default with the CFF algorithm. This can be switched off by `--nocff`. Then, the second ensemble is generated similar to the solute-solvent cluster but without the solvent. However, this procedure is usually computationally more demanding and yields worse results. Therefore, it is recommended to always use the CFF algorithm." %}

The number of clusters that are considered for the solvation free energy were set 
to 4 with `--nclus 4`. This reduces the computational costs as only four reference 
clusters are computed and only 4 frequency calculations are performed per ensemble. 
Therefore, only the 4 energetically best clusters are written to `final_ensemble.xyz`.
{: .text-justify }

The solvation free energy for 1-pentanol in benzene at the given scaling factor can be read from the output. Additionally, the results for some other scaling factors are also provided.
{: .text-justify }

{% include note.html content="The scaling factor of the translational and rotational entropy is empirically determined to be 0.75. As different solvents will quench these parts differently, also the scaling factor has to be adjusted. For example, 0.65 yielded better solvation free energies in case of benzene as solvent." %}

{% include important.html content="As finding an almost complete ensemble for a cluster containing many molecules is only feasible with a large computational effort, QCG suffers from a statistical error. As this is often no problem for many uses of the ensemble, the solvation free energy is in a way sensitive to the completeness. It is recommended to repeat the solvation free energy computation a few times and average the results to reduce this uncertainty." %}
