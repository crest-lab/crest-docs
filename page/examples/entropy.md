---
layout: default
title: Conformational Entropy
parent: "Examples and Guides"
nav_order: 6
toc: false
summary: "A guide to the calculation of conformational entropies with CREST."
permalink: /page/examples/eentropy.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

{% include important.html content="CREST's conformational entropy procedure currently does not work well for non-covalent systems and should be considered mainly for covalent molecular systems." %}

---

## Conformational Entropy Overview

The *conformation* (or *configurational*) entropy mode of CREST was introduced with [*Chem. Sci.*, **2021**, *12*, 6551-6568](https://doi.org/10.1039/D1SC00621E).
It is based on the idea to provide absolute molecular entropies of systems from a single DFT entropy calculation for the lowest conformer and correct this by the conformational entropy contribution of the ensemble at a cheaper FF or SQM level.
{: .text-justify }

$$
S_\text{abs} = S_\text{rot,trans,vib}^\text{DFT} + S_\text{conf}^\text{SQM}
$$

The conformational term can be further separated into 

$$
S_\text{conf} = S'_\text{conf} + \bar{S}_\text{msRRHO}
$$

where the *averaged S*<sub>msRRHO</sub> term 

$$
\bar{S}_\text{msRRHO}=\left(\sum p_i S_\text{msRRHO,i}\right)-S_\text{msRRHO,ref} 
$$

describes the Boltzmann population-averaged trans., rot., and vib. entropy contributions of the conformer ensemble at SQM level (corrected by the value for the reference structure in order to be additive).
The "pure" confromational contribution
{: .text-justify }

$$
S'_\text{conf} = R\left( \ln\sum g'_i e^{-E_i\beta} +\frac{\sum g'_i (E_i\beta) e^{-E_i\beta}}{\sum g'_i e^{-E_i\beta}}\right)
$$

corresponds to the Gibbs-Shannon entropy and depends *only* on the ensembles' energy distribution.
It is due to this term that the conformational entropy has an inherent dependence on the respective potential energy surface at a given level of theory.
{: .text-justify}

In the above mentioned publication, a four step procedure was proposed for the calculation of *S*<sub>abs</sub>:

1. Find the lowest conformer (ideally at a DFT level, which requires refinement).
2. Calculate harmonic frequencies for the lowest conformer at DFT level and
   get the $$S_\text{rot,trans,vib}^\text{DFT}$$ contribution.
3. Calculate $$S_\text{conf}$$ with CREST at a SQM or FF level.
4. Add the entropies from step 2 and 3 to obtain *S*<sub>abs</sub>. 

Some comments to these four steps are presented in the following.
For options specific to the entropy mode, such as defining a temperature range, see the [**Keyword Documentation** {{site.data.icons.book}}](../documentation/keywords.html#entropy-mode-settings).

---

### 1. Finding the lowest conformer

Run the CREST standard procedure (*e.g.* see [Example 1](./example_1.html))
and DFT refine your ensemble to identify the lowest conformer.
The refinement could be done with [CENSO](https://xtb-docs.readthedocs.io/en/latest/CENSO_docs/censo.html) or just some script of your own.
You will likely need access to some QM software of your choice that is capable of performing DFT calculations for the refinement.
{: .text-justify }

### 2. DFT frequency calculation

This has also to be done by a QM software package of your choice.
Most of those software packages should offer the ability to compute harmonic frequencies.
In the original publication we employed the B97-3c and B3LYP-D3/def2-TZVP methods.
The respective partition functions were evaluated in a 
*modified and scaled rigid-rotor harmonic-oscillator* (msRRHO) approximation that was 
adjusted ***specifically*** for the calculation of absolute molecular entropies.
Since it can not be ensured that your QM software has the scaling and the modification (a specific interpolation for low frequency normal modes) implemented, CREST offers a standalone tool for this evaluation.
See [Example: `thermo`](./utilities/utils_4.html). 
Use `--sthr 25.0` in order to be consistent with the publication and choose a scaling factor (`--fscal`) appropriate to your DFT functional.
{: .text-justify }

### 3. CREST entropy calculation

Initiate the conformational entropy calculation in CREST by

```bash
crest <input> --entropy [other options]
```

where `<input>` is your DFT-refined lowest conformer from steps 1/2.
The usual method selection options such as the GFN method or implicit solvation are available as `[other options]`, but ***special runtypes*** such as `--nci` or `--quick` ***are incopatible with the entropy mode***.
{: .text-justify }

This will calculate the additive terms $$S'_\text{conf}$$ and $$\bar{S}_\text{msRRHO}$$ at the SQM or FF level.
As described in the publication, the separate sampling algorithm is necessary to enable the entropy extrapolation.
In theory, steps 1 and 3 could be combined, but note that some slight deviations (mainly with regards to $$\bar{S}_\text{msRRHO}$$) will be the result.
{: .text-justify }

For a more statistically secure result it is also advisable to repeat the entropy calculation of step 3 several times and average the results.


### 4. Add everything up

The final printout of step 3 will summarize the conformational quantities for different temperatures.


{% capture output %}
[....]

 ----------------------
 TEMPERATURE DEPENDENCE
 ----------------------
 
 Final CONFORMATIONAL quantities at given T:
       T/K        S(total)           Cp(T)     [H(T)-H(0)]        G(total)
   -----------------------------------------------------------------------
    278.15        5.604582        1.913630        0.495345       -1.063569
    288.15        5.683492        1.904816        0.504876       -1.132822
    298.15        5.757901        1.895427        0.514176       -1.202542
    308.15        5.828199        1.885206        0.523259       -1.272700
    318.15        5.894721        1.873990        0.532131       -1.343274
    328.15        5.957760        1.861695        0.540797       -1.414242
    338.15        6.017572        1.848290        0.549259       -1.485583
    348.15        6.074384        1.833788        0.557518       -1.557279
    358.15        6.128396        1.818233        0.565573       -1.629313
    368.15        6.179791        1.801689        0.573422       -1.701668
    378.15        6.228732        1.784234        0.581066       -1.774329
   -----------------------------------------------------------------------
   S and Cp in cal/mol*K; H and G in kcal/mol
   G(total) is the ensemble free energy (H-T*S) and S(total) = S(conf,extrapol.) + δSrrho
 
 ------------------------------------------
 | FINAL MOLECULAR ENTROPY AT T= 298.15 K |
 ------------------------------------------
   Sconf   =          4.851731
 + δSrrho  =          0.906170
 ----------------------------------------
 = S(total)  =          5.757901
 
   H(T)-H(0) =          0.514176
   G         =         -1.716718   (-T*S)
 ----------------------------------------
 = G(total)  =         -1.202542  (H-T*S)
 
   Cp(total) =          1.895427
 
{% endcapture %}
{% include codecell.html content=output style="font-size:10px" %} 

Herein, `Sconf` corresponds to $$S'_\text{conf}$$ while `δSrrho` corresponds to $$\bar{S}_\text{msRRHO}$$.
Their sum, `S(total)`, corresponds to the additive $$S_\text{conf}^\text{SQM}$$ from above and can be added to 
$$ S_\text{rot,trans,vib}^\text{DFT}$$ from step 2.
Note that the entropy and heat capacity are given in **cal mol<sup>-1</sup>K<sup>-1</sup>** while the enthalpy and free energy are provided in **kcal mol<sup>-1</sup>**.
{: .text-justify }
