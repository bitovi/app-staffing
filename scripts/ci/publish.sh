#!/bin/bash

set -e


###
### PUBLISH - environment setup
###

#Defining the Default branch variable
if [ -z "$DEFAULT_BRANCH" ]; then
    DEFAULT_BRANCH="main"
fi

#Defining the Branch name variable
BRANCH_NAME=$(echo $GITHUB_REF | awk -F"  +|/" '{print $5, $NF}' | xargs)

PR_NUMBER=$(echo $GITHUB_REF | awk 'BEGIN { FS = "/" } ; { print $3 }')

#Defining the repo name variable
REPO_NAME=$(echo $GITHUB_REPOSITORY | sed 's/^.*\///')
ORG_NAME=$(echo $GITHUB_REPOSITORY | sed 's/\/.*//')
echo "Debugging"
echo "  GITHUB_REF: $GITHUB_REF"
echo "  BRANCH_NAME: $BRANCH_NAME"
echo "  PR_NUMBER: $PR_NUMBER"
echo "  REPO_NAME: $REPO_NAME"
echo "  ORG_NAME: $ORG_NAME"



###
### PUBLISH DOCKER
###
echo "###"
echo "### PUBLISH DOCKER"
echo "###"

#Defining the Image name variable
IMAGE_NAME="$REPO_NAME"

#Defining the Registry url variable
DEFAULT_ECR_REGISTRY_ID="app-staffing"
if [ -z "$ECR_REGISTRY_ID" ]; then
    ECR_REGISTRY_ID="$DEFAULT_ECR_REGISTRY_ID"
fi

REGISTRY_URL="${AWS_ACCOUNT_NO}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECR_REGISTRY_ID}"

#Building the docker image...
if [ -z "$PROD_TARGET_STAGE_NAME" ]; then
    PROD_TARGET_STAGE_NAME="production"
fi
docker build --target=${PROD_TARGET_STAGE_NAME}  -t ${IMAGE_NAME} .


#prepping image tag variable
DEFAULT_IMAGE_TAG="latest"
echo "Determining image tag:"
if [ -n "$IMAGE_TAG" ]; then
    echo "  IMAGE_TAG set: $IMAGE_TAG"
elif [[ ${BRANCH_NAME} == ${DEFAULT_BRANCH} ]]; then
    echo "  BRANCH is default branch ($BRANCH_NAME). Using default: $DEFAULT_IMAGE_TAG"
    IMAGE_TAG="$DEFAULT_IMAGE_TAG"
else
    IMAGE_TAG="${BRANCH_NAME}"
    echo "  Using branch name: ${IMAGE_TAG}"
fi
# TODO: Properly handle PRs (i.e. tag with $PR_NUMBER)
# elif [[ -n "$GITHUB_HEAD_REF" ]]; then
#     # https://github.com/actions/checkout/issues/58
#     # PR_NUMBER=$(echo $GITHUB_REF | awk 'BEGIN { FS = "/" } ; { print $3 }')
#     # if -z $PR_NUMBER
#     echo "  is PR. Using PR branch: $GITHUB_HEAD_REF"
#     IMAGE_TAG="$GITHUB_HEAD_REF"
# else
#     SHORT_SHA="$(echo ${GITHUB_SHA} | cut -c1-8)"
#     IMAGE_TAG="${BRANCH_NAME}-${SHORT_SHA}"
#     echo "  Using SHA: ${IMAGE_TAG}"
# fi

#docker image deploy function
aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REGISTRY_URL}
echo "docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}"
docker tag ${IMAGE_NAME} ${REGISTRY_URL}:${IMAGE_TAG}

echo "Pushing the docker image to the ecr repository..."
docker push ${REGISTRY_URL}:${IMAGE_TAG}


if [[ ${BRANCH_NAME} != ${DEFAULT_BRANCH} ]]; then
  echo "Branch is not default. Do not publish helm.  We're done here."
  exit 0
fi


###
### PUBLISH HELM
###
echo "###"
echo "### PUBLISH HELM"
echo "###"

HELM_PUBLISH_REPO_NAME="$REPO_NAME"
NOTIFY_PUBLISH_MESSAGE="    publish helm chart to s3 (repo: ${HELM_PUBLISH_REPO_NAME}, bucket: ${HELM_PUBLISH_S3_BUCKET})"
if [ -d "helm" ]; then
  echo "Has helm/ directory"
  echo "$NOTIFY_PUBLISH_MESSAGE"
else
  echo "Helm directory does not exist. skipping helm publish."
  exit 0
fi


# TODO: put all of this "helm publish" stuff in a docker container, and bake in the depenedencies
# install helm and such
echo "installing helm..."
# ./scripts/ci/install-helm.sh
# Install Helm
echo "Installing helm..."
curl https://get.helm.sh/helm-v3.5.3-linux-amd64.tar.gz -o /usr/local/bin/helm.tgz
tar -zxvf /usr/local/bin/helm.tgz -C /usr/local/bin
mv /usr/local/bin/linux-amd64/helm /usr/local/bin
chmod +x /usr/local/bin/helm
rm /usr/local/bin/helm.tgz
rm -rf /usr/local/bin/linux-amd64
echo "Installing helm... Done"

# Install Helm S3 Plugin
echo "Installing helm s3 plugin..."
helm plugin install https://github.com/hypnoglow/helm-s3.git --version 0.10.0
echo "Installing helm s3 plugin... Done"

echo "installing helm...Done"



# vars
helmVersionString=""
ignoreIfExistsString="--ignore-if-exists"
forceString=""
# set +e
# isPr="TODO"
# set -e


#TODO: handle PR and branches
# # handle merge requests and branches
# if [ -n "$isPr" ] || [ ${BRANCH_NAME} != ${DEFAULT_BRANCH} ]; then
#   # TODO: use existing version from Chart.yaml (yq r)
#   tag="TODO"
#   helmVersionString="--version 0.0.0-$tag"
#   ignoreIfExistsString=""
#   forceString="--force"
#   echo "helmVersionString: $helmVersionString"
# fi


# TODO: 
#   For now assuming you have the initial repo initialized. 
#   Will add further functionality to initialize a new repo later

# Add repo to environment
helm repo add ${HELM_PUBLISH_REPO_NAME} s3://${HELM_PUBLISH_S3_BUCKET}/charts

cd helm

  echo "Packaging chart..."
  helm package -u $helmVersionString -d dist/ .
  echo "Packaging chart... Done"


  echo "Uploading the chart to s3..."
  helm s3 push dist/*.tgz ${HELM_PUBLISH_REPO_NAME} \
  --content-type="application/gzip" \
  $ignoreIfExistsString \
  $forceString
  
  echo "Uploading the chart to s3... Done"

cd -