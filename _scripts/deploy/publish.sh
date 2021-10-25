#!/bin/bash

#Defining the Registry url variable
REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")

#Defining the Branch name variable
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}')

#Defining Registry Authentication variablee
REGISTRY_AUTHENTICATION=$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL})

#Defining the Default branch variable
DEFAULT_BRANCH="main"

#Defining the IMAGE_TAG variable 
IMAGE_TAG="latest"

#Building the docker image...
docker build -f Dockerfile.dev -t ${IMAGE_NAME} .

if [[ BRANCH_NAME == 'main' ]]; then
IMAGE_TAG="latest"
echo $REGISTRY_AUTHENTICATION
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}
docker push ${REGISTRY_URL}:${IMAGE_TAG}
else
echo $REGISTRY_AUTHENTICATION
echo ${REGISTRY_URL}:${BRANCH_NAME}${GITHUB_SHA}
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${GITHUB_SHA}
docker push ${REGISTRY_URL}:${GITHUB_SHA}
fi


