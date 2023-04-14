import { Box } from '@chakra-ui/react'
import React from 'react'

interface WrapperProps {
    variant?:"small" | "regular"
}
//@ts-expect-error
export const Wrapper: React.FC<WrapperProps> = ({children , variant = "regular"}) => {
    return (
        <Box
            mt={8}
            mx='auto'
            maxW={variant === "regular" ? "800px" : "400px"}
            w="100%" >
            {children}
        </Box>
        // box component in chakra is like a div but you can style it however you want
        // we are gonna use it wrap pages
        )
}   