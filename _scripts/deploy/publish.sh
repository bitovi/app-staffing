#!/bin/bash


REGISTRY_URL=$(printf %s.dkr.ecr.%s.amazonaws.com/%s "$AWS_ACCOUNT_NO" "$AWS_DEFAULT_REGION" "$IMAGE_NAME")
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}')
#REGISTRY_AUTHENTICATION=$(aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL})
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 832297766686.dkr.ecr.us-west-2.amazonaws.com



