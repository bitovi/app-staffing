#!/bin/bash

kubeconfig_path="$KUBECONFIG"
k8s_path="/var/run/secrets/kubernetes.io/serviceaccount"
sa_token="$(cat "${k8s_path}/token")"
cert_path="${k8s_path}/ca.crt"
namespace="$(cat "${k8s_path}/namespace")"

echo "
apiVersion: v1
kind: Config
preferences: {}
clusters:
- cluster:
    certificate-authority: ${cert_path}
    server: https://kubernetes.default.svc
  name: cluster
contexts:
- context:
    cluster: cluster
    namespace: ${namespace}
    user: token
  name: token
current-context: token
users:
- name: token
  user:
    token: \"${sa_token}\"
" > "$kubeconfig_path"
