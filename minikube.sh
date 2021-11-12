#!/bin/bash

# feed minikube with docker environment variables
minikube docker-env

# direct shell to minikube's Docker Daemon
eval $(minikube -p minikube docker-env)

# build docker image
docker build -f ./Dockerfile -t nosaugowe/internalstaffingapp .

# Create Kubernetes namespace
kubectl create ns internalstaffing

helm install bitovi-internalstaffingapps /Users/nosaugowe/internalstaffingapp/local/helm/my-chart/.