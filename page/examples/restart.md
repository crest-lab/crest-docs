---
layout: default
title: "Restarting a Conformational Search"
parent: "Sampling Applications"
grand_parent: "Examples and Guides"
nav_order: 6
toc: false
summary: "How to resume an interrupted iMTD-GC or entropy-mode conformational search from its last checkpoint."
permalink: /page/examples/restart.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<span class="label label-green">CREST 3.1</span>

---

## The checkpoint mechanism

Conformational searches can run for a long time, and a run that is killed by a
walltime limit, a node failure, or a stray <kbd>Ctrl</kbd>+<kbd>C</kbd> used to mean
starting over from scratch.
Since CREST 3.1, the [iMTD-GC]({{site.baseurl}}/page/overview/workflows.html#imtd-gc-algorithm)
and the [entropy mode]({{site.baseurl}}/page/examples/entropy.html) workflows write a small
checkpoint file called `crest.restart` at every stage boundary of the algorithm.
{: .text-justify }

The checkpoint is a plain text file recording *where* the algorithm was, not *what* it
found. No ensemble data is stored in it. The actual structures stay in the
backup files (`.cre_*.xyz`) that CREST writes anyway after each metadynamics iteration:
{: .text-justify }

{% capture restart_file %}
# CREST restart checkpoint - do not edit manually
version 1
runtype 2
main_iter 0
mtd_iter 2
nmetadyn 12
stage mtd_loop
last_file .cre_2.xyz
elowest        -34.376274418000000
eprivious        -34.376274418000000
{% endcapture %}
{% include codecell.html content=restart_file %}

The `stage` entry is the important one. It can take the following values:
{: .text-justify }

| `stage` | meaning |
|:---|:---|
| `mtd_trj` | an MTD trajectory was written, but its (re-)optimization is incomplete |
| `mtd_loop` | an MTD iteration finished completely, including sorting |
| `post_collect` | the MTD loop is done and all ensembles were collected and sorted |
| `entropy_smtd` | entropy mode only: the static MTD (sMTD) part has finished |
| `done` | the run completed; the file is removed |

Because the checkpoint refers to files in the working directory, a restart **must** be
started from the same directory as the original run, with the same input structure.
{: .text-justify }

{% include important.html content="Do not edit <code>crest.restart</code> by hand and do not delete the <code>.cre_*.xyz</code> backup files. If the ensemble file referenced by <code>last_file</code> is missing, CREST will stop with an error and ask you to delete <code>crest.restart</code> and start over." %}

---

## Example

We use the alanineglycine molecule from the
[standard conformational search example]({{site.baseurl}}/page/examples/example_1.html) again.
The search is started as usual:
{: .text-justify }

{% include command.html cmd="crest struc.xyz --gfn2 --alpb h2o -T 4 > crest.out" %}

Assume the job is killed during the third metadynamics iteration.
The working directory then contains the backup ensembles of the completed iterations
together with the checkpoint file:
{: .text-justify }

{% capture dir_listing %}
$ ls
.cre_1.xyz  .cre_2.xyz  coord  crest.restart  crest.out  struc.xyz  ...
{% endcapture %}
{% include codecell.html content=dir_listing %}

To resume, simply issue the **same command again** in the **same directory**:
{: .text-justify }

{% include command.html cmd="crest struc.xyz --gfn2 --alpb h2o -T 4 >> crest.out" %}

CREST detects the checkpoint and reports it right after the header:
{: .text-justify }

{% capture restart_out %}
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  RESTART DETECTED (crest.restart)
   runtype  : iMTD-GC
   stage    : mtd_loop
   MTD iter : 2 (MAINLOOP 0)
   last file: .cre_2.xyz
   elowest  :        -34.3762744180
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
{% endcapture %}
{% include codecell.html content=restart_out %}

The already completed metadynamics iterations are skipped, the lowest structure found so
far is restored as the new reference geometry, and the search continues with iteration 3.
Once the run finishes successfully, `crest.restart` is deleted automatically, so no stale
checkpoint is left behind for the next calculation in that directory.
{: .text-justify }

{% include note.html content="The restart resumes at the granularity of the algorithm's stages. Work done <i>within</i> an unfinished stage (for example, the multilevel optimization of a trajectory that was interrupted halfway) is repeated. If the interruption happened after the MTD loop, at the <code>post_collect</code> stage, CREST picks up directly at the final optimization steps." %}

---

## Disabling the restart

The checkpointing is active by default. It only writes a few hundred bytes and does not
change the results of a completed run, but it can be turned off entirely with
`--norestart`:
{: .text-justify }

{% include command.html cmd="crest struc.xyz --gfn2 --alpb h2o -T 4 --norestart" %}

With this flag no `crest.restart` file is written, and an existing one is ignored.
Use it if you deliberately want to start a fresh search in a directory that still contains
files from a previous, interrupted run.
{: .text-justify }
