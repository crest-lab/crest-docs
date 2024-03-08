---
layout: default
title: Restarting QCG
parent: QCG Examples
grand_parent: "Examples and Guides"
nav_order: 6
toc: false
summary: "A guide on how to restart QCG calculations."
permalink: /page/examples/qcg/example_restart.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

---

## Restarting QCG calculations

QCG has a restart functionality. If, for example, a `grow` directory is present from a 
previous QCG calculation, it will be read automatically. If the solute and solvent geometry, 
as well as the number of solvent molecules to add, match the cluster found in the directory, 
QCG will skip the grow algorithm and start with the ensemble search.
{: .text-justify }

{% include important.html content="Be very careful. If the number of solvents to add is larger than the solvent molecules of the cluster in the grow directory, it will be deleted, as well as all other results files. Also, if directories are present that are a step further than the keyword, they will also be deleted. For example, using `--grow` in a directory where an ensemble folder is placed, will cause it to be deleted." %}

As an example, we again use benzoic acid from the [QCG Example 2](../qcg/example_2.html) and add 30 water molecules with QCG.
This is done by
{: .text-justify }

```bash
crest benzoic_acid.xyz --qcg water.xyz --nsolv 30 --T 12 --alpb water
```


The resulting cluster looks good and we decide to generate an ensemble out of it. 
Using just the normal CREST NCI-MTD would yield a non-physical structure as the inner 
wall potential is missing. The hydrophilic moiety of the solute would thus move to the 
outer wall. Hence, we need to re-activate QCG. To do so, we have just to go into the 
directory we called QCG the last time and execute
{: .text-justify }

```bash
crest benzoic_acid.xyz --qcg water.xyz --nsolv 30 --T 12 --alpb water --ensemble
```

{% include important.html content="It's important that the input structures and the number of solvent that are given after `--nsolv` are matching the data in the `grow` directory. All other settings can be changed. Also, a solvation free energy computation can be done by substituting `--ensemble` by `--gsolv`." %}


QCG will read the cluster in the grow directory and start directly with the ensemble generation. After this, we can restart the calculation of solvation free energies with
{: .text-justify }

```bash
crest benzoic_acid.xyz --qcg water.xyz --nsolv 30 --T 12 --alpb water --gsolv
```
