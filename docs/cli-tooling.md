# Container Runtime Interface (CRI) & CLI Tools

This document compares the tools used to interact with the container runtime on a Kubernetes Node.

| Tool | Purpose | Context |
| :--- | :--- | :--- |
| **docker** | Development | Building and running containers locally. |
| **nerdctl** | Pro-ContainerD | Docker-compatible CLI for containerd (supports lazy pulling). |
| **crictl** | K8s Debugging | Standard tool for inspecting CRI-compatible runtimes on Nodes. |
| **kubectl** | Orchestration | The primary CLI to manage the Kubernetes Cluster. |

## Why ContainerD?
Kubernetes (v1.24+) removed support for **Docker Shim**. We now use the **CRI** to communicate directly with **containerd**, reducing overhead and improving security.

---

## Practical Examples

### 1. Using kubectl (Orchestration)
To deploy the full stack defined in `/k8s` to the cluster:
```bash
# Apply all manifests (app, mongodb, redis, envoy)
kubectl apply -f k8s/

# Verify that all Pods are running
kubectl get pods -w
```

### 2. Using nerdctl (Node Level)
Since we use containerd, we use nerdctl to list images or containers directly on a worker node:

```bash
# List all containers running on this node
sudo nerdctl ps

# List all available images
sudo nerdctl images
```
### 3. Using crictl (Debugging)
Standardized tool for any CRI-compatible runtime:

```bash
# Inspect container logs for troubleshooting
sudo crictl logs <container-id>
```