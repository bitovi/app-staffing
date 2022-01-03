#!/bin/bash

echo "using kubectl to copy file"
echo "
FILEPATH=${FILEPATH}
CONTAINER=${CONTAINER}
"
kubectl \
--kubeconfig "$KUBECONFIG" \
cp "$FILEPATH" "${CURRENT_POD}:${FILEPATH}" -c "$CONTAINER"