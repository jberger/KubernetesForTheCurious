# Kubernetes for the Curious

### Joel Berger

---

# Part 1

## What is Kubernetes

---

## What is Kubernetes?

Short answer:

`docker-compose` but clustered

---

### Pros and Cons

Pros:
* clustered
* observable
* remote
* api-driven

===

### Pros and Cons

Cons:
* no building
* local file mount is harder
* much more verbose

---

### How Verbose Can It Be?

===

Wordpress example from Container talk

<pre>
  <code
    class="yaml"
    data-url="public/ex/wordpress/docker-compose.yaml"
  ></code>
</pre>

===

Becomes

<pre>
  <code
    class="yaml"
    data-url="public/ex/wordpress/k8s.yaml"
    data-line-numbers="|25"
  ></code>
</pre>

---

### So Why Is k8s This Way?

---

## Two Possible Coordination Mechanisms

* Centralized
  - Database
  - One or more controller(s)
* Decentralized
  - Distributed concensus DB
  - Muiltiple controllers

---

# The Goal is Clustering

## ... which is for resilence <!-- .element: class="fragment" data-fragment-index="2" -->

### ... and centralized controllers are a SPOF <!-- .element: class="fragment" data-fragment-index="3" -->

... which means ... <!-- .element: class="fragment" data-fragment-index="4" -->

---

## Decentralized Coordination

* distributed etcd database
* control plane nodes
* kubelet on each worker node

---

### etcd

* distributed concensus key-value store
* hierarchically organized (directories)
* http api
* watch keys for changes

===

Nearly everything about the operation of Kubernetes derives from this!

---

## Demystifying Kubernetes Manifests

---

### Manifests

* Look
  - intimidating
  - verbose
* Lots of yaml

===

### The Kube API

* Looks
  - intimidating
  - verbose
* even more yaml

===

### The Kube API

<pre>
  <code
    class="yaml"
    data-url="public/ex/pg.yaml"
  ></code>
</pre>

===

<pre>
  <code
    class="yaml"
    data-url="public/ex/pg-reduced.yaml"
    data-line-numbers="|1-2|3,8-9|3,6-7|3,4-5|3,10-11|12-29|30-72"
  ></code>
</pre>

note:
* what it is
* what its called
* how to associate to it
* annotations
* relationships
* what it should be
* how it is now

---

### The API is How Everything Interacts

* User creates and specifies goals
* Control plane communicates that to nodes
* How nodes indicate current state of those goals

---

### Wait? I communicate via the API?!

Manifests are just partial api documents! <!-- .element: class="fragment" -->

All k8s clients are just api clients <!-- .element: class="fragment" -->

---

## What is Kubernetes?

Longer answer:

* Container engine
* Networking engine
* Coordination controller
* Distributed-concensus database
* API

---

## One More Question

Why are the multiple api objects rather than just one?

To allow for asynchronous creation and late-binding. <!-- .element: class="fragment" -->

---

# Part 2

## Using Kubernetes

---

### Basic Types

* Namespace
* Pod
* Deployment
* PersistentVolumeClaim
* ConfigMap
* Secret
* Service
* Ingress
* Job/CronJob

---

### Namespace

* Scoped/independent<sup>*</sup> collection
  - objects
  - resources
* Boundary for permissions

---

### Pod

* The "atomic unit" of deploying
* "Application-specific 'logical host'"
* One or more containers
  - share storage
  - share network resources
* Attach volumes
* Environment
* Etc

---

### Deployment

* Mange Pod Deployments (and ReplicaSets)
  - Replication
  - Rollouts

The typical way to use Pods <!-- .element: class="fragment" -->

---

### PersistentVolumeClaim

* Request persistent storage from k8s provider
* The handle for mapping the request into the pod

---

### ConfigMap

YAML documents that can be

* used as environment variables
* mounted as directories/files

---

### Secrets

YAML documents that can be

* used as environment variables
* mounted as directories/files
* and as access creds for
  - container registries
  - tls certs
  - service accounts

===

### Secrets

* By default values are
  - obfuscated
  - not encrypted
* Only accessible from the same namespace
  - namespaces enforce access/perms

---

### Services

Define 
* Port mappings
* Discovery (DNS)
* External IP Assignment (Load Balancer)

---

### Ingresses

* Virtual hosting (LB)
* Define behaviors on attributes
* Declare TLS
  - behavior
  - issuance (cert-manager, LetsEncrypt)

---

### CronJob

* Create a Job/Pod on a recurring interval
* Like cron on a linux box but distributed!
