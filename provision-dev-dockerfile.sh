#!/bin/bash

DEV_FINAL_IMAGE=bitovi/internalstaffingdev

DEV_TARGET_STAGE_NAME=development

docker build --target=${DEV_TARGET_STAGE_NAME} -t ${DEV_FINAL_IMAGE} .