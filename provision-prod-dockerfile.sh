#!/bin/bash

PROD_FINAL_IMAGE=bitovi/internalstaffingprod

PROD_TARGET_STAGE_NAME=production

docker build --target=${PROD_TARGET_STAGE_NAME} -t ${PROD_FINAL_IMAGE} .