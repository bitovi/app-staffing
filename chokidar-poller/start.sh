#!/bin/bash

echo "Starting chokidar poller..."

# TODO: find a better way (maybe a dedicated repo, or maybe just add the dependency to the root package.json)
cd /usr/src/app/chokidar-poller
npm install
cd -

DEFAULT_KUBE_PATH="/usr/src/kube"
if [ -z "$KUBE_PATH" ]; then
    KUBE_PATH="$DEFAULT_KUBE_PATH"
fi

KUBECONFIG="${KUBE_PATH}/kubeconfig"
echo "generating kubeconfig: $KUBECONFIG"
mkdir -p "$KUBE_PATH"

KUBECONFIG="$KUBECONFIG" \
bash /usr/src/app/chokidar-poller/generate-kubeconfig.sh

node /usr/src/app/chokidar-poller/index.js
