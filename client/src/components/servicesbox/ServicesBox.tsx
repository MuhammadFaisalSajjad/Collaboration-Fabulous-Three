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
        <Box mt="xl" bg="light-dark" style={{
            border:'2px solid #424242',
            borderRadius:'10px',
        }}>
            <Box pb="lg" mt='lg' ml='lg'>
        <IconBraces size={60} stroke={2} />
        <h1 style={{
            marginTop:'2vh',
            marginBottom:'2vh',
            fontSize:'1.4em',
            color:'#FFFFFF',
            fontWeight:'500'
        }}>{name}</h1>
        <p style={{
            fontSize:'1.2rem',
            color:'#746F84'
        }}>{description}</p>
        </Box>
        </Box>
        </>
    );
}

export default ServiceBox;