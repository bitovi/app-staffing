#!/bin/bash

#prepping image tag variable
IMAGE_TAG="latest"

PROD_TARGET_STAGE_NAME="production"

#Defining the Image name variable
IMAGE_NAME=$(echo $GITHUB_REPOSITORY | sed 's/^.*\///')


#Defining the Registry url variable
REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")

#Defining the Branch name variable
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}')


#Defining the Default branch variable
DEFAULT_BRANCH="main"


#Building the docker image...
docker build --target=${PROD_TARGET_STAGE_NAME}  -t ${IMAGE_NAME} -f Dockerfile



#docker image deploy function
image_deploy(){
aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL}    
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}
echo "About to push the docker image to the ecr repository....."
docker push ${REGISTRY_URL}:${IMAGE_TAG}
}

if [[ ${BRANCH_NAME} != ${DEFAULT_BRANCH} ]]; then
   IMAGE_TAG=${GITHUB_SHA}

fi

image_deploy

