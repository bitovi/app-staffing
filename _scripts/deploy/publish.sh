#!/bin/bash


REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")
BRANCH_NAME=$(echo $github_ref | awk -F"  +|/" '{print $5, $NF}')
REGISTRY_AUTHENTICATION=$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL})



if [[ -z "$AWS_ACCOUNT_NO" ]]; then
  echo "check the AWS_ACCOUNT_NO Variable"
  exit 1
elif [[ -z "$BRANCH_NAME" ]]; then
  echo "check the BRANCH_NAME
   Variable"
  exit 1 
elif [[ -z "$REGISTRY_URL" ]]; then
  echo "check the REGISTRY_URL Variable"
  exit 1 
elif [[ -z "$REGISTRY_AUTHENTICATION" ]]; then
  echo "check the REGISTRY_AUTHENTICATION Variable"
  exit 1 
else
  echo "Variables defined and ready to publish the image"
fi

 #building the docker image
 docker build -t ${IMAGE_NAME} .



if [[ BRANCH_NAME == 'main' ]]; then
  IMAGE_TAG="latest"
  echo $REGISTRY_AUTHENTICATION
  docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}
  echo ${REGISTRY_URL}:${IMAGE_TAG}
  docker push ${REGISTRY_URL}:${IMAGE_TAG}
else
  echo $REGISTRY_AUTHENTICATION
  echo ${REGISTRY_URL}:${GITHUB_SHA}
  docker tag ${IMAGE_NAME}  ${REGISTRY_URL}:${GITHUB_SHA}
  echo ${REGISTRY_URL}:${GITHUB_SHA}
  docker push  ${REGISTRY_URL}:${GITHUB_SHA}
fi
