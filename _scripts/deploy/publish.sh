#!/bin/bash


REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}')
ECR_CRED=$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION}) 

aws ecr --region ${AWS_DEFAULT_REGION} | docker login -u AWS -p ${ECR_CRED} ${REGISTRY_URL}

