---
layout: default
title: ML Interatomic Potentials (via <code>fmlip-relay</code>)
parent: "Special Calculators"
grand_parent: "Examples and Guides"
nav_order: 2
toc: false
summary: "Using CREST with ML interatomic potentials via the fmlip-relay Python server."
permalink: /page/examples/mlip.html
---

# {{page.title}}
{: .no_toc }

{{ page.summary }}
{: .fs-6 .fw-300 }

<div class="label label-green">CREST 3.1</div>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## The fmlip-relay Server

CREST can use ML interatomic potentials (MLIPs) and classical potentials through [**fmlip-relay** {{ site.data.icons.github }}](https://github.com/pprcht/fmlip-relay), a persistent Python server that ships as a subproject in `subprojects/fmlip_relay/` of the CREST source tree.
When CREST encounters an MLIP calculation, it automatically spawns the server, which loads the model once at startup and then communicates with CREST over a local TCP socket.
This architecture avoids the overhead of repeated Python interpreter startup during iterative calculations such as geometry optimizations or molecular dynamics.
{: .text-justify }

{% include warning.html content="MLIP evaluations are <em>not</em> cheap compared to the semiempirical methods CREST is built around. For small and medium-sized molecules a single GFN-FF or GFN2-xTB gradient is orders of magnitude faster than one round-trip through the socket server, so running a full conformational search directly at an MLIP level is <b>not recommended</b> — a search easily needs 10<sup>5</sup>–10<sup>6</sup> energy+gradient calls. Sample with a semiempirical workhorse and use the MLIP only to refine the final ensemble, see <a href='composite.html'>Composite calculators</a>." %}

The following backends are available out of the box:
{: .text-justify }

| Backend | Description | Requirements |
|---------|-------------|-------------|
| `lj` | Lennard-Jones potential with PBC support | `numpy` only |
| `mace_off` | MACE-OFF organic foundation model (H, C, N, O, P, S, F, Cl, Br, I) | `mace-torch`, `ase` |
| `mace_mp` | MACE-MP foundation model (89 elements, Materials Project) | `mace-torch`, `ase` |
| `mace` | Custom MACE model from a `.model` file | `mace-torch`, `ase` |
| `uma` | FairChem UMA universal foundation model (Meta FAIR), multi-task | `fairchem-core`, `ase` |
| `dummy` | Random numbers (testing only) | `numpy` only |


---


## Installation

The `fmlip-relay` Python package must be installed separately from the main CREST Fortran build.
From the CREST source root directory, install it with:
{: .text-justify }

{% include command.html cmd="pip install ./subprojects/fmlip_relay" %}

To include the optional MACE dependencies (for `mace`, `mace_mp`, and `mace_off` backends):
{: .text-justify }

{% include command.html cmd="pip install './subprojects/fmlip_relay[mace]'" %}

For the FairChem UMA backend, install the `uma` extra instead:
{: .text-justify }

{% include command.html cmd="pip install './subprojects/fmlip_relay[uma]'" %}

{% include note.html content="The UMA checkpoints are gated on the Hugging Face Hub. Authenticate once with <code>huggingface-cli login</code> (and request access to the model on Hugging Face) before the <code>uma</code> backend can download them." %}

{% include tip.html content="The <code>[mace]</code> and <code>[uma]</code> extras pull in <code>mace-torch</code> / <code>fairchem-core</code> with default settings, which may not match your platform (CUDA version, PyTorch build). For a working GPU setup, follow the official installation instructions of <a href='https://github.com/ACEsuit/mace'>MACE</a> and <a href='https://github.com/facebookresearch/fairchem'>fairchem/UMA</a>." %}

After installation, verify that the server executable and backends are available:
{: .text-justify }

{% include command.html cmd="fmlip-relay-check" %}

{% include tip.html content="It is recommended to install fmlip-relay into a virtual environment or conda environment. Make sure the environment is active when running CREST so that the <code>fmlip-relay-server</code> command is on your <code>$PATH</code>." %}

{% include important.html content="The <code>fmlip-relay-server</code> executable must be found on <code>$PATH</code> for CREST to use it. If CREST cannot find the server, you will get an error at runtime." %}


---


## Example 1: Geometry Optimization with Lennard-Jones

As a minimal example, we optimize an Ar<sub>4</sub> cluster using the Lennard-Jones potential.
The LJ backend requires only `numpy` and is useful for testing the fmlip-relay setup before moving to ML potentials.
The initial structure places four argon atoms in a slightly compressed tetrahedral arrangement; optimization should converge to the LJ minimum near ~3.82 &Aring;.
{: .text-justify }


<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-mlip-1" onclick="openTabId(event, 'mlip-1-cmd', 'tab-mlip-1')" id="defaultOpen">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-mlip-1" onclick="openTabId(event, 'mlip-1-toml', 'tab-mlip-1')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-mlip-1" onclick="openTabId(event, 'mlip-1-struc', 'tab-mlip-1')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
</div>
<!-- Tab content -->
<div id="mlip-1-cmd" class="tabcontent tab-mlip-1" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
</div>
<div id="mlip-1-toml" class="tabcontent tab-mlip-1" style="font-size:10px">
{% capture toml_lj %}
# Geometry optimisation of an Ar4 cluster with Lennard-Jones potential
input   = "struc.xyz"
runtype = "optimize"

[calculation]
optlev = "normal"

[[calculation.level]]
method       = "mlip"        # use fmlip-relay socket server
mlip_backend = "lj"          # Lennard-Jones (default Ar parameters)
{% endcapture %}
{% include codecell.html content=toml_lj %}
</div>
<div id="mlip-1-struc" class="tabcontent tab-mlip-1" style="font-size:10px">
{% capture struc_ar4 %}
4
Ar4 cluster (compressed, for LJ optimization)
Ar   0.000   0.000   0.000
Ar   3.300   0.000   0.000
Ar   1.650   2.860   0.000
Ar   1.650   0.953   2.694
{% endcapture %}
{% include codecell.html content=struc_ar4 %}
</div>
{% include defaulttab.html %}


The key TOML settings here are:
{: .text-justify }

- `method = "mlip"` tells CREST to use the fmlip-relay calculator instead of a semiempirical or *ab initio* method.
- `mlip_backend = "lj"` selects the Lennard-Jones backend with default argon parameters (&epsilon; = 0.0104 eV, &sigma; = 3.40 &Aring;).

The optimized structure is written to `crestopt.xyz`.
{: .text-justify }


---


## Example 2: MACE-OFF for Organic Molecules

The MACE-OFF backend provides a pre-trained foundation model for organic molecules (MACE-OFF23), covering H, C, N, O, P, S, F, Cl, Br, and I.
It requires `mace-torch` and `ase` to be installed.
In the following, MACE-OFF is used to optimize the alanineglycine molecule.
{: .text-justify }


<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-mlip-2" onclick="openTabId(event, 'mlip-2-cmd', 'tab-mlip-2')" id="open2">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-mlip-2" onclick="openTabId(event, 'mlip-2-toml', 'tab-mlip-2')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
  <button class="tablinks tab-mlip-2" onclick="openTabId(event, 'mlip-2-struc', 'tab-mlip-2')">{{ site.data.icons.codefile }} <code>struc.xyz</code></button>
</div>
<!-- Tab content -->
<div id="mlip-2-cmd" class="tabcontent tab-mlip-2" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
</div>
<div id="mlip-2-toml" class="tabcontent tab-mlip-2" style="font-size:10px">
{% capture toml_maceoff %}
# Geometry optimisation of alanineglycine with MACE-OFF
input   = "struc.xyz"
runtype = "optimize"

[calculation]
optlev = "tight"

[[calculation.level]]
method         = "mlip"        # use fmlip-relay socket server
mlip_backend   = "mace_off"   # MACE-OFF organic foundation model
mlip_modelsize = "medium"     # small / medium / large
{% endcapture %}
{% include codecell.html content=toml_maceoff %}
</div>
<div id="mlip-2-struc" class="tabcontent tab-mlip-2" style="font-size:10px">
{% capture struc_alagly %}
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
{% include codecell.html content=struc_alagly %}
</div>
{% include defaulttab.html id="open2" %}


The `mlip_modelsize` keyword controls the trade-off between accuracy and speed.
The `"small"` model is fastest, while `"large"` is most accurate.
The default is `"medium"`.
{: .text-justify }

{% include tip.html content="If PyTorch detects a CUDA-capable GPU, the MACE model will automatically run on the GPU. No additional configuration is needed." %}

If you have a **custom-trained MACE model** (a `.model` file), use the `mace` backend with `mlip_modelpath` instead:
{: .text-justify }

```toml
[[calculation.level]]
method         = "mlip"
mlip_backend   = "mace"
mlip_modelpath = "/path/to/my_model.model"
```


---


## Example 3: FairChem UMA

The `uma` backend serves the [FairChem UMA {{ site.data.icons.ext }}](https://github.com/facebookresearch/fairchem) universal foundation model from Meta FAIR.
It is a multi-task model: the `mlip_uma_task` keyword selects the domain head, and `mlip_uma_model` selects the checkpoint.
The `uma` backend requires `fairchem-core` and `ase` (install with the `[uma]` extra) and a one-time `huggingface-cli login`.
{: .text-justify }

For molecular systems, use the `omol` task, which consumes the total charge and spin multiplicity passed through from CREST.
{: .text-justify }


<!-- Tab links -->
<div class="tab card">
  <button class="tablinks tab-mlip-3" onclick="openTabId(event, 'mlip-3-cmd', 'tab-mlip-3')" id="open3">{{ site.data.icons.code }} <code>command</code></button>
  <button class="tablinks tab-mlip-3" onclick="openTabId(event, 'mlip-3-toml', 'tab-mlip-3')">{{ site.data.icons.codefile }} <code>input.toml</code></button>
</div>
<!-- Tab content -->
<div id="mlip-3-cmd" class="tabcontent tab-mlip-3" style="text-align:justify">
{% include command.html cmd="crest input.toml" %}
</div>
<div id="mlip-3-toml" class="tabcontent tab-mlip-3" style="font-size:10px">
{% capture toml_uma %}
# Geometry optimisation with the FairChem UMA foundation model
input   = "struc.xyz"
runtype = "optimize"

[calculation]
optlev = "tight"

[[calculation.level]]
method        = "mlip"        # use fmlip-relay socket server
mlip_backend  = "uma"         # FairChem UMA universal model
mlip_uma_task = "omol"        # domain head: omol / omat / omc / oc20 / odac
mlip_uma_model = "uma-s-1p2"  # checkpoint (default; also uma-s-1, uma-s-1p1, uma-m-1)
mlip_device   = "cuda"        # torch device: cpu (default) / cuda / cuda:0
{% endcapture %}
{% include codecell.html content=toml_uma %}
</div>
{% include defaulttab.html id="open3" %}


The available task heads are `omol` (molecules), `omat` (materials), `omc` (molecular crystals), `oc20` (catalysis), and `odac` (MOFs/direct air capture).
Only the `omol` task uses the per-structure charge and spin multiplicity.
{: .text-justify }

{% include tip.html content="UMA is a torch-based model and benefits greatly from a GPU. Set <code>mlip_device = &quot;cuda&quot;</code> to run on the GPU; the default is <code>&quot;cpu&quot;</code>." %}


---


## Parallelization and CPU Threads

In parallel workflows (ensemble optimizations, ensemble refinement, metadynamics) CREST spawns **one server instance per parallel job**, each holding its own copy of the model.
On the CPU this is a problem: torch and the underlying BLAS libraries grab *all* available cores by default, so several server instances running at the same time would heavily oversubscribe the machine and each of them would become slower than if it ran alone.
{: .text-justify }

To avoid this, the `threads` key (alias `ncores`) can be set inside the `[[calculation.level]]` block.
It is passed on to every server instance as `--max-threads`, which caps the inference thread pools (`OMP_NUM_THREADS`, `MKL_NUM_THREADS`, `torch.set_num_threads`, ...), and at the same time tells CREST to run only as many concurrent jobs as fit into the global thread budget:
{: .text-justify }

{% capture toml_threads %}
# Optimization of an existing ensemble with MACE-OFF on 16 cores
input           = "struc.xyz"
ensemble_input  = "crest_conformers.xyz"
runtype         = "optimize_ensemble"
threads         = 16          # total cores available to CREST

[[calculation.level]]
method         = "mlip"
mlip_backend   = "mace_off"
mlip_modelsize = "medium"
threads        = 4            # cores per server -> 4 servers x 4 threads
{% endcapture %}
{% include codecell.html content=toml_threads %}

Here CREST runs **4 parallel jobs**, each with its own fmlip-relay server that is limited to 4 CPU threads &mdash; instead of 16 servers all fighting over the same 16 cores.
The setting is echoed in the calculation summary printout as `Server thread cap`.
The same applies when the MLIP is used as the refinement level of a
[composite setup](composite.html), which is the recommended way to combine it with a
conformational search.
{: .text-justify }

{% include note.html content="Without <code>threads</code>, CREST keeps its historical behavior: one job per core, and each server inherits <code>OMP_NUM_THREADS</code> from the environment. For the cheap <code>lj</code> or <code>dummy</code> backends this is perfectly fine; for torch-based models it is usually not." %}

The general rules for the per-level `threads` reservation (idle-core warnings, interaction with the global `threads`) are described in the
[Input File Documentation]({{site.baseurl}}/page/documentation/inputfiles.html#per-level-thread-reservation).
{: .text-justify }

{% include tip.html content="On the GPU (<code>mlip_device = &quot;cuda&quot;</code>) the CPU thread cap matters much less &mdash; there the limit is GPU memory, since every parallel server loads its own copy of the model onto the device. Reducing the number of parallel jobs with a larger <code>threads</code> value is also the simplest way to keep the GPU memory footprint in check." %}


---


## Command-Line Shortcuts

For quick setups without writing a TOML file, two ML potentials are available directly on the command line via the `-mlip` flag:
{: .text-justify }

{% include command.html cmd="crest struc.xyz -mlip uma" %}

selects the UMA foundation model with the `omol` task, and
{: .text-justify }

{% include command.html cmd="crest struc.xyz -mlip maceoff" %}

selects the MACE-OFF23 (medium) organic force field.
For finer control (model size, task, device, custom checkpoints), use the TOML `[[calculation.level]]` block as shown in the examples above.
{: .text-justify }


---


## MLIP TOML Keywords Reference

The following keywords can be set within a `[[calculation.level]]` block when using the fmlip-relay interface:
{: .text-justify }

| Keyword | Description | Values |
|---------|-------------|--------|
| `method` | Calculator selection, must be `"mlip"` | `"mlip"` |
| `mlip_backend` | Backend to use | `"lj"`, `"mace"`, `"mace_mp"`, `"mace_off"`, `"uma"`, `"dummy"` |
| `mlip_modelpath` | Path to a custom MACE `.model` file | file path string |
| `mlip_modelsize` | Size variant for MACE foundation models | `"small"`, `"medium"`, `"large"` |
| `mlip_device` | Torch device for NN backends (`mace*`, `uma`) | `"cpu"` (default), `"cuda"`, `"cuda:0"` |
| `mlip_uma_task` | UMA domain head (`uma` backend) | `"omol"`, `"omat"`, `"omc"`, `"oc20"`, `"odac"` |
| `mlip_uma_model` | UMA checkpoint (`uma` backend) | `"uma-s-1p2"` (default), `"uma-s-1"`, `"uma-s-1p1"`, `"uma-m-1"` |
| `mlip_port` | Base TCP port for the socket server | integer (default `54320`) |
| `mlip_timeout` | Server startup timeout in seconds | integer (default `120`) |
| `threads` (`ncores`) | CPU threads per server instance (`--max-threads`), also caps the number of parallel jobs | integer (default unset) |


---


## Adding a Custom Calculator

The fmlip-relay subproject is designed to be extensible.
Any potential can be wrapped as a standalone or an [ASE calculator {{ site.data.icons.ext }}](https://wiki.fysik.dtu.dk/ase/ase/calculators/calculators.html) and plugged into CREST through fmlip-relay.
This requires editing the subproject source and re-installing with pip.
{: .text-justify }

### Step 1: Create a backend file

Create a new file in `subprojects/fmlip_relay/src/python/fmlip_relay/backends/`, for example `mybackend.py`.
A ready-to-use template is provided as `_template_ase_backend.py` in the backends directory. Copy it and adapt to your needs.
The simplest approach is to inherit from `_ASEComputeMixin`, which implements the `compute()` method on top of any ASE calculator stored as `self._calc`:
{: .text-justify }

```python
from ._ase_base import _ASEComputeMixin

class MyBackend(_ASEComputeMixin):

    def __init__(self, model_path: str, device: str = "cpu"):
        from my_package import MyCalculator
        self._calc = MyCalculator(model=model_path, device=device)
        self._model_path = model_path

    @property
    def name(self) -> str:
        return f"mybackend({self._model_path})"
```

Alternatively, you can inherit directly from `BackendBase` and implement the `compute()` method yourself.
This is useful when no ASE calculator is available:
{: .text-justify }

```python
from .base import BackendBase
import numpy as np

class MyBackend(BackendBase):

    def compute(self, atomic_numbers, positions, cell, pbc,
                compute_stress, charge, spin):
        energy = 0.0  # your energy evaluation
        forces = np.zeros((len(atomic_numbers), 3), dtype=np.float64)
        stress = np.zeros((3, 3), dtype=np.float64)
        return energy, forces, stress

    @property
    def name(self) -> str:
        return "mybackend"
```

### Step 2: Register the backend

In `subprojects/fmlip_relay/src/python/fmlip_relay/backends/__init__.py`, add your backend to the registry inside the `_register_optional()` function:
{: .text-justify }

```python
try:
    from .mybackend import MyBackend
    _REGISTRY["mybackend"] = MyBackend
except ImportError:
    pass
```

Wrapping the import in a `try`/`except` ensures that missing optional dependencies do not break the entire package.
{: .text-justify }

### Step 3: Re-install and test

After editing the source, re-install the package so that the changes take effect:
{: .text-justify }

{% include command.html cmd="pip install ./subprojects/fmlip_relay" %}

To test the backend with a single-point calculation (without starting a full server), use the `--test` flag with a geometry file:
{: .text-justify }

{% include command.html cmd="fmlip-relay-server --backend mybackend --test struc.xyz" %}

This loads the backend, evaluates energy, forces, and stress for the given geometry, prints a summary, and exits.
Once the test passes, the new backend can be used in CREST input files via `mlip_backend = "mybackend"`.
{: .text-justify }

Optionally, you can also make `fmlip-relay-check` aware of the new backend by adding an entry to the `_BACKENDS` list in `check.py`:
{: .text-justify }

```python
# In fmlip_relay/check.py, add to the _BACKENDS list:
("mybackend", "fmlip_relay.backends.mybackend", "MyBackend", "Short description", None),
```

{% include tip.html content="Use the provided <code>_template_ase_backend.py</code> as a starting point for ASE-based backends. The existing <code>lj.py</code> backend is a good reference for implementing <code>compute()</code> directly, while <code>mace_off.py</code> shows the ASE calculator pattern via <code>_ASEComputeMixin</code>." %}

{% include important.html content="Whenever you modify the fmlip-relay source code, you must re-install with <code>pip install</code> for CREST to pick up the changes." %}
