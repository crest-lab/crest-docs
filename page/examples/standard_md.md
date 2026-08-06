---
layout: default
title: "Molecular Dynamics"
parent: "Standard Runtypes"
grand_parent: "Examples and Guides"
nav_order: 3
toc: false
summary: "Running a plain MD simulation with the internal dynamics module."
permalink: /page/examples/standard_md.html
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

## The `--dynamics` runtype

`--dynamics` (alias `--dyn`) runs a straightforward molecular dynamics simulation with the
internal MD module, a velocity Verlet integrator driving the same calculators as every other
runtype. It is the same engine that the metadynamics of the conformational search is built
on, here without any bias potential.
{: .text-justify }

The settings live in a `[dynamics]` block of a
[TOML input file]({{site.baseurl}}/page/documentation/inputfiles.html):
{: .text-justify }

<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-md-1" onclick="openTabId(event, 'md-1-cmd', 'tab-md-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-md-1" onclick="openTabId(event, 'md-1-toml', 'tab-md-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-md-1" onclick="openTabId(event, 'md-1-out', 'tab-md-1')">{{ site.data.icons.checkfile }} <code>output (excerpt)</code></button>
</div>
<!-- Tab content -->
<div id="md-1-cmd" class="tabcontent tab-md-1" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
<span markdown="span">
The runtype can also be selected directly on the command line with
`crest struc.xyz --dynamics --gfn2`, which uses the MD defaults: 20 ps at a 5 fs time
step, Berendsen thermostat, SHAKE enabled.
</span>
</div>
<div id="md-1-toml" class="tabcontent tab-md-1" style="font-size:10px">
{% capture md_toml %}
# Molecular dynamics simulation
input   = "struc.xyz"
runtype = "dynamics"
threads = 4

[calculation]
[[calculation.level]]
method = "gfn2"

[dynamics]
length = 2.0        # simulation length in ps
tstep  = 2.0        # time step in fs
dump   = 100.0      # write a snapshot every 100 fs
temp   = 300.0      # target temperature in K
shake  = 2          # constrain bonds (2 = all bonds)
{% endcapture %}
{% include codecell.html content=md_toml %}
</div>
<div id="md-1-out" class="tabcontent tab-md-1" style="font-size:10px">
{% capture md_out %}
  {% include outputs/std_md_output.txt %}
{% endcapture %}
{% include codecell.html content=md_out %}
</div>
{% include defaulttab.html %}

The settings block echoes what the simulation will actually do, which is worth reading
before a long run: the 2 ps length at a 2 fs time step gives 1000 steps, and the 100 fs dump
interval means every 50th step is written. Setting a target temperature implies a
thermostat, so the simulation type is reported as `NVT`.
{: .text-justify }

At the end, block averages of the potential, kinetic and total energy are printed together
with the mean temperature and its fluctuation. The trajectory is written to
`crest_dynamics.trj.xyz`, and a `crest_0.mdrestart` file holds the final state.
{: .text-justify }

{% include note.html content="The trajectory file was called <code>crest_dynamics.trj</code> before CREST 3.1 and now carries an explicit <code>.xyz</code> extension, matching the convention of the other trajectory outputs." %}

---

## Simulation settings

The keys of the `[dynamics]` block:
{: .text-justify }

| Key | Meaning |
|---|---|
| `length` (`length_ps`) | total simulation time in ps |
| `tstep` | time step in fs |
| `dump` | interval for writing trajectory snapshots, in fs |
| `temp` (`t`, `temperature`) | target temperature in K; setting it enables the thermostat |
| `thermostat` | thermostat algorithm, see below |
| `shake` | bond constraints: `0`/`false` off, `1` X–H bonds, `2` all bonds |
| `hmass` | hydrogen mass in u, for hydrogen mass repartitioning |

SHAKE removes the fastest vibrations from the integration, which is what allows a 2 fs step
to be used at all. With `shake = 2` the printout confirms how many bonds were constrained.
Increasing `hmass` (hydrogen mass repartitioning) permits even larger steps.
{: .text-justify }

{% include warning.html content="A time step that is too large for the constraints in use will not necessarily crash the run, it will silently heat the system. If the reported average temperature drifts far from the target, reduce <code>tstep</code> or enable <code>shake</code>." %}

---

## Thermostats

<span class="label label-green">CREST 3.1</span>

CREST 3.1 adds two stochastic thermostats alongside the existing Berendsen one, selected
with the `thermostat` key:
{: .text-justify }

| Value | Algorithm | Notes |
|---|---|---|
| `berendsen` | Berendsen weak coupling | the default; efficient, but does not reproduce the exact canonical ensemble |
| `langevin` (`bbk`) | Langevin dynamics | adds friction and a random force per atom; suited to an implicit solvent bath |
| `bussi` (`csvr`) | Bussi–Donadio–Parrinello | stochastic velocity rescaling; samples the correct canonical distribution |
| `off` (`nve`) | none | no temperature coupling, the simulation runs as `NVE` |

For example, to run the same simulation in the correct canonical ensemble:
{: .text-justify }

{% capture md_bussi %}
[dynamics]
length     = 2.0
tstep      = 2.0
dump       = 100.0
temp       = 300.0
thermostat = "bussi"    # stochastic velocity rescaling (BDP/CSVR)
{% endcapture %}
{% include codecell.html content=md_bussi style="font-size:12px" %}

The chosen algorithm is reported in the settings block, and `thermostat = "off"` switches
the header from `NVT` to `NVE`:
{: .text-justify }

{% capture md_thermo_out %}
  Simulation type       :       NVT
  thermostat            : Bussi-Donadio-Parrinello
{% endcapture %}
{% include codecell.html content=md_thermo_out style="font-size:12px" %}

{% include tip.html content="Berendsen is a reasonable choice for equilibration and for the sampling workflows, where the trajectory only has to explore structures. For anything where the <em>distribution</em> matters, for example computing ensemble averages from the trajectory, prefer <code>bussi</code>." %}

---

## Where MD is used internally

The conformational search workflows do not call this runtype, but they use the same module.
The [iMTD-GC algorithm]({{site.baseurl}}/page/overview/workflows.html#imtd-gc-algorithm) runs
*meta*dynamics, the same integrator with an additional history-dependent bias pushing the
system away from structures it has already visited, and regular MD is used for the
subsequent sampling steps. Settings such as `tstep`, `shake` and `hmass` carry over to those
workflows.
{: .text-justify }
