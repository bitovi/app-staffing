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

if [[ "$BRANCH_NAME" != "$DEFAULT_BRANCH" ]]; then
  IMAGE_TAG="${GITHUB_SHA}"
else

echo $REGISTRY_AUTHENTICATION
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}
echo "About to push the image......."
docker push ${REGISTRY_URL}:${IMAGE_TAG}
fi



