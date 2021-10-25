#!/bin/bash

#defining Registry url variable
REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")

#defining Branch name variable
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}')

#defining Registry Authentication variablee
REGISTRY_AUTHENTICATION=$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL})

#defining Default branch variable
DEFAULT_BRANCH="main"

#defining IMAGE_TAG variable 
IMAGE_TAG="latest"

#building the docker image...
docker build -f Dockerfile.dev -t ${IMAGE_NAME} .

if [[ "$BRANCH_NAME" != "$DEFAULT_BRANCH" ]]; then
  IMAGE_TAG="${GITHUB_SHA}"
else

echo $REGISTRY_AUTHENTICATION
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}
echo "About to push the image......."
docker push ${REGISTRY_URL}:${IMAGE_TAG}
fi



