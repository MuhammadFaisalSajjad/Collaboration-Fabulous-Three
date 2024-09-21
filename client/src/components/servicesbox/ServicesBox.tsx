import React from "react";
import {Box} from "@mantine/core";
import { IconBraces } from "@tabler/icons-react";

type BoxDetails={
    name:string,
    description:string,
};

const ServiceBox= ({ name,description }: BoxDetails): React.JSX.Element=>{
    return(
        <>
        <Box mt="xl" bg="#672f7f">
            <Box ml='lg'>
        <IconBraces size={50} stroke={2} />
        <h1 style={{
            marginTop:'1vh',
            marginBottom:'2vh',
        }}>{name}</h1>
        <p>{description}</p>
        </Box>
        </Box>
        </>
    );
}

export default ServiceBox;