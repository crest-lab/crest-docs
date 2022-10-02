---
layout: default
title: Metal-organic Systems
parent: Publication Examples
grand_parent: "Examples and Guides"
nav_order: 2
toc: false
summary: "An example for sampling conformers of metal-organic systems."
permalink: /page/examples/publication/example_2.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Sampling of conformations for metal-organic systems

In CREST's original publication two examples for sampling of metal-organic
systems were provided: *trans*-Cu(II)(L-valine)<sub>2</sub> and
[Pt(COMe)<sub>2</sub>(2-py)<sub>3</sub>COH]. 
{: .test-justify }

### Calculation of <i>trans</i>-Cu(II)(L-valine)<sub>2</sub> conformers in the gas phase

{% include image.html file="pub-example-2-1.png" alt="<i>trans</i>-Cu(II)(L-valine)<sub>2</sub>" caption="<i>trans</i>-Cu(II)(L-valine)<sub>2</sub>" max-width=300 %}

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>coord</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{ site.data.  icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd='crest coord <span class="nt">--nci</span>' %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture struc_file %}
$coord
 -0.002022192318         -0.000684522852          1.349121896005     CU
  2.028671941135          2.818125977315          1.174767316951     O
  4.406562542342          2.529552834523          0.838287117696     C
  5.900488893190          4.242544277537          0.591753944418     O
  5.382406579092         -0.254197829091          0.699650595616     C
  3.456927714843         -1.958681435237          1.737975874213     N
  3.442953703137         -3.661542617496          0.846227450863     H
  3.710547158869         -2.249430796311          3.618554595139     H
  7.133224715719         -0.349791899055          1.804782999185     H
  6.007018333138         -0.877714812490         -2.069473442827     C
  7.266213509953         -3.466799912264         -2.312238367182     C
  8.881995597301         -3.618089140164         -1.050454618739     H
  7.930334466002         -3.738254167109         -4.236839656939     H
  5.952357752542         -4.994107920656         -1.890594175637     H
  3.663534173447         -0.712885768717         -3.746419767180     C
  4.156219468360         -1.164942859389         -5.689573088070     H
  2.890265219159          1.189883399588         -3.704912704715     H
  2.203522204085         -2.025873622846         -3.126878925482     H
  7.355957431563          0.567207315613         -2.680683804317     H
 -2.033163868813         -2.819780021566          1.179505209377     O
 -4.409877555278         -2.530551975348          0.835068556898     C
 -5.903043316660         -4.243023566156          0.580387940800     O
 -5.384798675016          0.253509426488          0.697143335052     C
 -3.461334991004          1.955672873602          1.742931448447     N
 -3.448757571238          3.662158486139          0.858135081470     H
 -3.716247763220          2.238184300034          3.624611253622     H
 -7.138671974341          0.348502264395          1.797538738740     H
 -6.001307995929          0.880859137312         -2.072901114603     C
 -7.255902292489          3.472119634743         -2.316426880308     C
 -7.917767124579          3.744910887179         -4.241612390481     H
 -5.939710712311          4.997073845686         -1.893506102537     H
 -8.872648523224          3.626011270865         -1.056195385178     H
 -3.653380600330          0.714736239795         -3.743504646086     C
 -2.884657484645         -1.189944325855         -3.704494974332     H
 -2.192229886598          2.022965931298         -3.116395721134     H
 -4.139423979729          1.172691111744         -5.686934420106     H
 -7.350580840264         -0.561585906341         -2.689213500551     H
$end
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
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
       Version 2.11, Tue 13. Jul 16:11:14 CEST 2021
  Using the xTB program. Compatible with xTB version 6.4.0

<.......>

T /K                                  :   298.15
E lowest                              :   -57.69401
ensemble average energy (kcal)        :    0.430
ensemble entropy (J/mol K, cal/mol K) :   45.253   10.816
ensemble free energy (kcal/mol)       :   -3.225
population of lowest in %             :    7.134
 number of unique conformers for further calc           52
 list of relative energies saved as "crest.energies"

 -----------------
 Wall Time Summary
 -----------------
             test MD wall time :         0h : 0m : 5s
                 MTD wall time :         0h :15m :51s
      multilevel OPT wall time :         0h :49m :17s
--------------------
Overall wall time  : 1h : 6m :47s

 CREST terminated normally.
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-1" %}

Results in 52 conformers within an energy window of 6 kcal/mol.
{: .text-justify }


---

### [Pt(COMe)<sub>2</sub>(2-py)<sub>3</sub>COH] conformers in methanol


{% include image.html file="pub-example-2-2.png" alt="[Pt(COMe)<sub>2</sub>(2-py)<sub>3</sub>COH]" caption="[Pt(COMe)<sub>2</sub>(2-py)<sub>3</sub>COH]" max-width=200 %}


<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-1', 'tab-id-2')" id="open-2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-2', 'tab-id-2')">{{ site.data.icons.codefile }} <code>coord</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-3', 'tab-id-2')">{{ site.data.  icons.checkfile }} <code>output</code></button>
</div>
<!-- Tab content -->
<div id="tab-2-1" class="tabcontent tab-id-2" style="text-align:justify">
{% include command.html cmd='crest coord <span class="nt">--gbsa</span> methanol <span class="nt">--ewin</span> 10' %}
</div>
<div id="tab-2-2" class="tabcontent tab-id-2" style="text-align:justify">
{% capture struc_file %}
$coord
    1.48235976014562      0.32575477023909      0.83983586742930      pt
    4.37233116325056     -2.04701937728251      0.66066526359202       c
    5.11582123352082     -2.89977152283009     -1.35531347223172       o
    5.60331010456907     -2.97886601012202      3.10440618630801       c
    5.11582123352082     -1.79782119213888      4.71363082065877       h
    4.96457322302306     -4.90914755554552      3.43123243126445       h
    7.64542186308448     -3.03767428737742      2.85382472163511       h
    3.90413261656682      3.15849014823120      0.32067896584616       c
    3.77547628198769      4.50973504009881     -1.55263489557537       o
    5.78086877201500      3.82467530185737      2.40255812110202       c
    6.44902868945004      5.75938447561023      2.16769917785472       h
    4.93481948506077      3.56859662386391      4.26032709535443       h
    7.38167845589603      2.54234683232997      2.24297074917982       h
   -1.45880054444693     -2.37015120764916      1.99982157738756       n
   -1.37380633216814     -3.71993156176379      4.12084829921227       c
   -3.47313332880892     -4.91477704969539      5.12088380983082       c
   -5.76730431783315     -4.67836853101913      3.87619679514437       c
   -5.86160354159028     -3.26072055256804      1.67926544374004       c
   -3.65812239940936     -2.14869231241016      0.79621720883004       c
   -3.66283159693252     -0.54983471562441     -1.60480456492594       c
   -1.36490194262998     -1.28858913220566     -3.20027766220770       c
   -1.32606807059918     -3.74293708770554     -3.74494019740640       n
    0.45445456851927     -4.60152659727760     -5.28248940926294       c
    2.25936790283487     -3.06404352583571     -6.38168829870466       c
    2.17878809080250     -0.49502320914006     -5.86813254537940       c
    0.32467195716495      0.43733364975533     -4.26146660021256       c
    0.14833216307473      2.45190076015779     -3.96574713712955       h
    3.52744783732032      0.78490530819858     -6.70693851206628       h
    3.68438581320421     -3.84772429150018     -7.60737222739882       h
    0.39857914622211     -6.61487483432435     -5.63264243360372       h
   -5.86517134452916     -0.98949461824931     -3.04219073283502       o
   -5.69660399402350     -2.62769064394335     -3.83817172589844       h
   -3.63492223167593      2.20020246734036     -0.78356738209650       c
   -1.79344269668899      2.91320936536104      0.78584828153889       n
   -1.75920841806563      5.28509912105245      1.61658700736449       c
   -3.54797404257573      7.05739011313605      0.91252418313075       c
   -5.45207721188036      6.32967358689699     -0.73330822586627       c
   -5.50553000527517      3.85501674464698     -1.58299523562631       c
   -6.94955289136293      3.18275045232518     -2.84989409127871       h
   -6.87435123990475      7.65734792470912     -1.34159783995923       h
   -3.43966438926938      8.95769115346132      1.63587922145511       h
   -0.24274666012596      5.76489302728759      2.90140613593504       h
   -7.59878342212486     -2.99720202278941      0.64743151148342       h
   -7.44966324325272     -5.57429713925087      4.59918333687282       h
   -3.30863455866736     -5.99888080678762      6.83682316863177       h
    0.45096235462570     -3.84321729467325      5.03295296314152       h
$end
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
<div id="tab-2-3" class="tabcontent tab-id-2" style="text-align:justify">
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
       Version 2.11, Tue 13. Jul 16:11:14 CEST 2021
  Using the xTB program. Compatible with xTB version 6.4.0

<.......>

T /K                                  :   298.15
E lowest                              :   -78.08070
ensemble average energy (kcal)        :    0.551
ensemble entropy (J/mol K, cal/mol K) :   37.238    8.900
ensemble free energy (kcal/mol)       :   -2.654
population of lowest in %             :   43.032
 number of unique conformers for further calc           43
 list of relative energies saved as "crest.energies"

 -----------------
 Wall Time Summary
 -----------------
             test MD wall time :         0h : 0m :11s
                 MTD wall time :         0h :24m : 9s
      multilevel OPT wall time :         0h :55m : 9s
                  MD wall time :         0h :13m :46s
                  GC wall time :         0h : 0m :14s
--------------------
Overall wall time  : 1h :36m :42s

 CREST terminated normally.
{% endcapture %}
{% include codecell.html content=struc_file style="font-size:10px" %}
</div>
{% include defaulttab.html id="open-2" %}

The search for the Pt-complex conformers results in 43 conformers within an energy window of 10 kcal/mol.
{: .test-justify }

