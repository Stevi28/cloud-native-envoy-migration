#!/bin/bash
# script to install standalone containerd (cri-compliant runtime)
# based on k8s v1.24+ standards (removal of docker shim)

echo "Starting standalone containerd installation..."

# detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ]; then
  ARCH="arm64"
else
  ARCH="amd64"
fi

# download the containerd binary 
wget https://github.com/containerd/containerd/releases/download/v2.0.0/containerd-2.0.0-linux-${ARCH}.tar.gz

# extract the binaries to /usr/local
sudo tar -C /usr/local -xzvf containerd-2.0.0-linux-${ARCH}.tar.gz

# clean up the archive
rm containerd-2.0.0-linux-${ARCH}.tar.gz

# verify the installation using the 'ctr' tool
echo "Verifying installation with 'ctr'..."
sudo ctr version

echo "ContainerD is now ready to serve as a CRI for Kubernetes."