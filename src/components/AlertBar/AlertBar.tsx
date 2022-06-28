import React from "react"

import { Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/alert"

type AlertBarProps = {
    status: 'info' | 'warning' | 'success' | 'error',
    title?: string,
    description: string
  };

  
export default function AlertBar ({status = 'info', title, description}: AlertBarProps): JSX.Element {

    return (
        <Alert status={status}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}