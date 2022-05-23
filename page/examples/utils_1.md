---
layout: default
title: Ensemble Optimization
parent: Utility Tools
grand_parent: Examples
nav_order: 1
toc: false
summary: "An example on how te (re-)optimize ensembles with CREST."
permalink: /page/examples/utilities/utils_1.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Optimize along ensemble or trajectory files

Optimizations along ensemble or trajectory files are one of the core functions of the CREST code.
For utility, the respective routines have been implemented as standalone applications and can be
invoked by the `--mdopt` and `--screen` commands.
{: .test-justify }

`--mdopt <ensemble>` simply performs the optimization of each point on a given file
and writes the optimized structure to a new ensemble file `crest_ensemble.xyz` *in the same order* as the original.
In the below example, the input `input-esnemble.xyz` contains *n*-butane structures optimized at the GFN-FF level, while the refined ensemble has the GFN2-xTB energies and geometries.
Note, that for demonstration purposes the *highest* energy structure was placed as the first point in the input ensemble and `--mdopt` does not change this order.
{: .text-justify }

 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-1', 'tab-id-1')" id="open-1">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-2', 'tab-id-1')">{{ site.data.icons.codefile }} <code>input-ensemble.xyz</code></button>
  <button class="tablinks tab-id-1" onclick="openTabId(event, 'tab-1-3', 'tab-id-1')">{{ site.data.icons.checkfile }}  <code>crest_ensemble.xyz</code></button>
</div>
<!-- Tab content -->
<div id="tab-1-1" class="tabcontent tab-id-1" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--mdopt</span> input-ensemble.xyz" %}
</div>
<div id="tab-1-2" class="tabcontent tab-id-1" style="text-align:justify">
{% capture file_1 %}
  14
         -1.95476831
 C         -1.8280514558        0.1026283679       -0.3378109356
 C         -0.6096777513       -0.4807999039        0.3626338277
 C          0.6096679585        0.4807861256        0.3626336492
 C          1.8280554740       -0.1026120684       -0.3378127654
 H         -2.6737183814       -0.5895996214       -0.3384876099
 H         -1.6051787878        0.3482893729       -1.3783393521
 H         -2.1588537968        1.0236078559        0.1469845806
 H         -0.3239394543       -1.4268049722       -0.1182711212
 H         -0.8704029060       -0.7659987748        1.3922403082
 H          0.8703773548        0.7659540027        1.3922522276
 H          0.3239374558        1.4268002601       -0.1182574316
 H          1.6052556663       -0.3480468876       -1.3784082402
 H          2.1587507058       -1.0237028671        0.1468484919
 H          2.6738409543        0.5894715887       -0.3381226983
  14
         -1.95933513
 C         -1.9450668421        0.1311167672       -0.0001772545
 C         -0.5674743975       -0.5132672899        0.0001933101
 C          0.5674752787        0.5132638115        0.0001915171
 C          1.9450638093       -0.1311175361       -0.0001779077
 H         -2.0853782627        0.7646639932        0.8782051254
 H         -2.7466842224       -0.6116573212       -0.0004139053
 H         -2.0848832626        0.7646834243       -0.8786240987
 H         -0.4586079390       -1.1740559621       -0.8706321703
 H         -0.4589068044       -1.1737556210        0.8712831745
 H          0.4588981405        1.1737728909        0.8712658721
 H          0.4586137126        1.1740687810       -0.8706234929
 H          2.0850227749       -0.7644118141       -0.8787988057
 H          2.0852599026       -0.7649044717        0.8780496213
 H          2.7466915989        0.6116467123       -0.0000648118
  14
         -1.95861370
 C         -1.5634429064        0.0307829908        0.5671856584
 C         -0.6780400299       -0.3575310612       -0.6072767893
 C          0.6780374832        0.3575328640       -0.6072807936
 C          1.5634444854       -0.0307786855        0.5671868578
 H         -1.7381548026        1.1085042885        0.5904194743
 H         -1.1085086806       -0.2426226956        1.5210355320
 H         -2.5399702240       -0.4581336702        0.5235479812
 H         -1.2059135035       -0.1493891533       -1.5491742664
 H         -0.5130824651       -1.4435518231       -0.6080674515
 H          0.5130888273        1.4435548434       -0.6080686466
 H          1.2059008586        0.1493974488       -1.5491848268
 H          1.1087081819        0.2429933207        1.5210259608
 H          2.5401620514        0.4577301888        0.5232639016
 H          1.7377812886       -1.1085555327        0.5906966592
{% endcapture %}
{% include codecell.html content=file_1 style="font-size:10px"  %}
</div>
<div id="tab-1-3" class="tabcontent tab-id-1" style="text-align:justify">
{% capture file_2 %}
  14
        -13.66103671
 C         -1.8189570311        0.1081182839       -0.3386195268
 C         -0.6003361267       -0.4812669222        0.3627086339
 C          0.6003332769        0.4812333014        0.3627646448
 C          1.8189747557       -0.1080993350       -0.3385718921
 H         -2.6452834880       -0.5996606573       -0.3297329893
 H         -1.5843571400        0.3472810277       -1.3737470764
 H         -2.1438184799        1.0191234683        0.1597802222
 H         -0.3205601634       -1.4095157615       -0.1393589481
 H         -0.8730158184       -0.7389888621        1.3877883008
 H          0.8729817345        0.7388756115        1.3878727551
 H          0.3205734286        1.4095212839       -0.1392393028
 H          1.5844214615       -0.3471335953       -1.3737396356
 H          2.1437868862       -1.0191720928        0.1597368360
 H          2.6453197400        0.5996567278       -0.3295590909
  14
        -13.66512776
 C         -1.9378776420        0.1349368813       -0.0001081753
 C         -0.5610352612       -0.5177004414        0.0000506021
 C          0.5610386129        0.5177070576        0.0001079710
 C          1.9378809964       -0.1349302612       -0.0000855289
 H         -2.0638764712        0.7599162365        0.8815598623
 H         -2.7207589066       -0.6200754522       -0.0001652173
 H         -2.0636923965        0.7598567385       -0.8818443961
 H         -0.4615354382       -1.1553777317       -0.8815520107
 H         -0.4616978624       -1.1553045239        0.8817229081
 H          0.4616847622        1.1552317536        0.8818361648
 H          0.4615552388        1.1554637305       -0.8814387524
 H          2.0637421337       -0.7597076170       -0.8819160206
 H          2.0638334572       -0.7600520754        0.8814882103
 H          2.7207622638        0.6200820692        0.0000205563
  14
        -13.66417742
 C         -1.5701818259        0.0341541241        0.5669980083
 C         -0.6722058440       -0.3642502197       -0.5984716668
 C          0.6721959716        0.3642001521       -0.5985057684
 C          1.5701916459       -0.0341317860        0.5669740172
 H         -1.7279994660        1.1107209346        0.5744336871
 H         -1.1293887314       -0.2561977056        1.5169777595
 H         -2.5388317596       -0.4533661830        0.4810842653
 H         -1.1899167863       -0.1401654483       -1.5344769575
 H         -0.4964239626       -1.4421497023       -0.5687647172
 H          0.4964157705        1.4421015361       -0.5688640776
 H          1.1898906010        0.1400553580       -1.5345056863
 H          1.1294519108        0.2563472549        1.5169394335
 H          2.5388668910        0.4533220799        0.4809723015
 H          1.7279461492       -1.1107070713        0.5745186526
{% endcapture %}
{% include codecell.html content=file_2  style="font-size:10px"  %}
</div>
{% include defaulttab.html id="open-1" %}

---

`--screen <ensemble>` does in principal the same as `--mdopt`.
However, the final ensemble written to `crest_ensemble.xyz` *is additionally sorted with the CREGEN routine*.
In the below example, the input `input-esnemble.xyz` again contains *n*-butane structures optimized at the GFN-FF level, while the refined ensemble has the GFN2-xTB energies and geometries.
For demonstration purposes, the [`--ewin 1.0` command](../../documentation/keywords.html#ensemble-sorting-options) was added to this calculation.
As can be seen, the output ensemble `crest_ensemble.xyz` contains only two structures due to the adjusted energy window.
{: .text-justify }




 <!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-1', 'tab-id-2')" id="open-2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-2', 'tab-id-2')">{{ site.data.icons.codefile }} <code>input-ensemble.xyz</code></button>
  <button class="tablinks tab-id-2" onclick="openTabId(event, 'tab-2-3', 'tab-id-2')">{{ site.data.icons.checkfile }}  <code>crest_ensemble.xyz</code></button>
</div>
<!-- Tab content -->
<div id="tab-2-1" class="tabcontent tab-id-2" style="text-align:justify">
{% include command.html cmd="crest <span class='nt'>--screen</span> input-ensemble.xyz <span class='nt'>--ewin</span> 1.0" %}
</div>
<div id="tab-2-2" class="tabcontent tab-id-2" style="text-align:justify">
{% capture file_1 %}
  14
         -1.95476831
 C         -1.8280514558        0.1026283679       -0.3378109356
 C         -0.6096777513       -0.4807999039        0.3626338277
 C          0.6096679585        0.4807861256        0.3626336492
 C          1.8280554740       -0.1026120684       -0.3378127654
 H         -2.6737183814       -0.5895996214       -0.3384876099
 H         -1.6051787878        0.3482893729       -1.3783393521
 H         -2.1588537968        1.0236078559        0.1469845806
 H         -0.3239394543       -1.4268049722       -0.1182711212
 H         -0.8704029060       -0.7659987748        1.3922403082
 H          0.8703773548        0.7659540027        1.3922522276
 H          0.3239374558        1.4268002601       -0.1182574316
 H          1.6052556663       -0.3480468876       -1.3784082402
 H          2.1587507058       -1.0237028671        0.1468484919
 H          2.6738409543        0.5894715887       -0.3381226983
  14
         -1.95933513
 C         -1.9450668421        0.1311167672       -0.0001772545
 C         -0.5674743975       -0.5132672899        0.0001933101
 C          0.5674752787        0.5132638115        0.0001915171
 C          1.9450638093       -0.1311175361       -0.0001779077
 H         -2.0853782627        0.7646639932        0.8782051254
 H         -2.7466842224       -0.6116573212       -0.0004139053
 H         -2.0848832626        0.7646834243       -0.8786240987
 H         -0.4586079390       -1.1740559621       -0.8706321703
 H         -0.4589068044       -1.1737556210        0.8712831745
 H          0.4588981405        1.1737728909        0.8712658721
 H          0.4586137126        1.1740687810       -0.8706234929
 H          2.0850227749       -0.7644118141       -0.8787988057
 H          2.0852599026       -0.7649044717        0.8780496213
 H          2.7466915989        0.6116467123       -0.0000648118
  14
         -1.95861370
 C         -1.5634429064        0.0307829908        0.5671856584
 C         -0.6780400299       -0.3575310612       -0.6072767893
 C          0.6780374832        0.3575328640       -0.6072807936
 C          1.5634444854       -0.0307786855        0.5671868578
 H         -1.7381548026        1.1085042885        0.5904194743
 H         -1.1085086806       -0.2426226956        1.5210355320
 H         -2.5399702240       -0.4581336702        0.5235479812
 H         -1.2059135035       -0.1493891533       -1.5491742664
 H         -0.5130824651       -1.4435518231       -0.6080674515
 H          0.5130888273        1.4435548434       -0.6080686466
 H          1.2059008586        0.1493974488       -1.5491848268
 H          1.1087081819        0.2429933207        1.5210259608
 H          2.5401620514        0.4577301888        0.5232639016
 H          1.7377812886       -1.1085555327        0.5906966592
{% endcapture %}
{% include codecell.html content=file_1 style="font-size:10px" %}
</div>
<div id="tab-2-3" class="tabcontent tab-id-2" style="text-align:justify">
{% capture file_2 %}
  14
        -13.66512776
 C         -1.9379628968        0.1336606095       -0.0000667939
 C         -0.5607123276       -0.5180521254        0.0000722379
 C          0.5607123347        0.5180521309        0.0000722067
 C          1.9379628907       -0.1336606119       -0.0000667761
 H         -2.0643552047        0.7585953214        0.8815711926
 H         -2.7203681725       -0.6218367629       -0.0000713296
 H         -2.0642286761        0.7584728219       -0.8818100402
 H         -0.4608418122       -1.1557076807       -0.8815053991
 H         -0.4609576574       -1.1555856233        0.8817510478
 H          0.4609572808        1.1555865342        0.8817503301
 H          0.4608421800        1.1557067794       -0.8815061371
 H          2.0642516918       -0.7584258880       -0.8818399157
 H          2.0643321650       -0.7586422889        0.8815412836
 H          2.7203681923        0.6218367498       -0.0000106228
  14
        -13.66417743
 C         -1.5703228906        0.0340785398        0.5636242134
 C         -0.6721073498       -0.3644271090       -0.6016224225
 C          0.6721068847        0.3644268194       -0.6016224341
 C          1.5703232540       -0.0340780913        0.5636242243
 H         -1.7286877225        1.1105826870        0.5706663561
 H         -1.1294494187       -0.2556853962        1.5137545190
 H         -2.5387370680       -0.4539555910        0.4778560132
 H         -1.1897350121       -0.1406378965       -1.5377481364
 H         -0.4960484199       -1.4422911637       -0.5717088872
 H          0.4960487505        1.4422909540       -0.5717100530
 H          1.1897337115        0.1406361009       -1.5377481357
 H          1.1294779612        0.2557370494        1.5137520045
 H          2.5387576375        0.4539102626        0.4778247298
 H          1.7286407926       -1.1105888990        0.5707000338

{% endcapture %}
{% include codecell.html content=file_2  style="font-size:10px"  %}
</div>
{% include defaulttab.html id="open-2" %}


---

## Singlepoint energy calculations along ensemble files

While there is no dedicated function for singlepoint energy calculations in the same way
as `--mdopt` or `--screen`, this still can be done via the `--for` command.
The respective command call would be
{: .text-justify }

```bash
crest -for input-ensemble.xyz --prop singlepoint
```

The output ensemble will be sorted with CREGEN, but also the unsorted ensemble just containing the singlepoint energies is available.

