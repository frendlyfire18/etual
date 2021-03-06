import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    Center,
    useColorModeValue, Image,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const Logo = (props: any) => {
    return (
        <>
            <svg width="161" height="30" viewBox="0 0 161 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M119.245 0.608887C110.191 0.608887 102.793 9.809 100.336 22.2676C100.309 22.3908 100.282 22.7057 100.268 22.8289C100.499 22.8289 101.273 22.9111 101.544 22.1854C106.268 12.1638 112.051 5.962 119.245 5.962C126.535 5.962 132.63 13.3549 136.295 22.8152C137.055 22.0759 138.236 20.9122 138.236 19.7896C135.236 8.7275 127.756 0.608887 119.245 0.608887Z" fill="white"/>
                <path d="M13.6916 1.14294C7.04018 1.14294 3.11718 2.79954 0.809479 4.31914L3.34788 5.59244C5.46548 4.19594 7.96318 2.85424 12.8364 2.85424C22.5421 2.85424 24.2389 8.71394 24.5376 11.0276L24.5104 10.9591C24.4154 10.9865 24.3204 11.0139 24.2389 11.0413C23.1666 11.3699 21.8227 11.7806 19.5965 11.7806C18.6191 11.7806 17.9811 11.5478 17.1803 11.233C16.1757 10.8496 14.9133 10.3841 12.7957 10.3841C11.0039 10.3841 9.45638 10.7538 8.30258 11.096V13.4508C9.38848 13.1223 10.9767 12.6431 12.7957 12.6431C14.5197 12.6431 15.4291 12.9854 16.3929 13.355C17.2888 13.6973 18.2119 14.0395 19.5965 14.0395C21.9313 14.0395 23.4516 13.6288 24.5919 13.2866C24.5783 13.6973 24.5783 14.0395 24.5647 14.1491C24.3475 16.1616 22.8408 21.6379 12.8364 21.6379C7.37948 21.6379 5.24838 20.5837 3.13068 19.0367L0.714478 20.5153C3.30718 22.1308 6.32068 23.3492 13.6916 23.3492C23.3566 23.3492 30.0217 19.023 30.0217 12.7937C30.0217 6.55074 23.3702 1.14294 13.6916 1.14294Z" fill="white"/>
                <path d="M31.298 8.17984H37.6237V22.8288H42.1168V8.17984H48.2389V6.16724H31.298V8.17984Z" fill="white"/>
                <path d="M73.404 6.16724L64.079 19.2556L55.581 6.16724H50.7757L61.608 22.7604L56.952 29.3045H59.979L76.418 6.16724H73.404Z" fill="white"/>
                <path d="M87.333 5.87988C81.387 5.87988 77.274 7.13938 77.138 9.98708H77.125V10.5758H81.835C81.835 9.00138 82.704 7.89238 87.618 7.89238C92.681 7.89238 93.17 8.93288 93.17 10.5758V12.9169H85.989C79.351 12.9169 76.025 15.1622 76.025 18.2015C76.025 20.8301 78.794 22.8016 84.224 22.8016H97.663V10.3978C97.676 6.97508 95.152 5.87988 87.333 5.87988ZM93.17 20.8164H85.351C81.957 20.8164 80.817 19.6938 80.817 18.0098C80.817 16.3396 82.215 14.9705 85.758 14.9705H93.17V20.8164Z" fill="white"/>
                <path d="M151.946 12.9304H145.186V6.16724H140.625V22.8151H153.249C158.326 22.8151 161 20.6931 161 17.7222C161 14.3132 156.901 12.9304 151.946 12.9304ZM152.177 20.8163H145.186V14.9704H151.81C155.136 14.9704 156.439 16.1204 156.439 17.8043C156.439 19.7347 155.367 20.8163 152.177 20.8163Z" fill="white"/>
            </svg>
        </>
    );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer() {
    return (
        <Box
            bg={"black"}
            color={"white"}
            >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <Center>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                        <Stack align={'flex-start'}>
                            <ListHeader>??????????????</ListHeader>
                            <Link href={'#'}>??????????</Link>
                            <Stack direction={'row'} align={'center'} spacing={2}>
                                <Link href={'#'}>??????????????????????</Link>
                                <Tag
                                    size={'sm'}
                                    bg={useColorModeValue('green.300', 'green.800')}
                                    ml={2}
                                    color={'white'}>
                                    New
                                </Tag>
                            </Stack>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>????????????????</ListHeader>
                            <Link href={'#'}>?? ??????</Link>
                            <Link href={'#'}>????????????</Link>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>??????????</ListHeader>
                            <Link href={'#'}>?????????? ????????????????</Link>
                            <Link href={'#'}>?????????????? ??????????????????????????????????</Link>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>?????????????????????? ???? ??????</ListHeader>
                            <Link href={'#'}>Facebook</Link>
                            <Link href={'#'}>Twitter</Link>
                        </Stack>
                    </SimpleGrid>
                </Center>
            </Container>
            <Box py={10}>
                <Flex
                    align={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        ml: 8,
                    }}>
                    <Logo />
                </Flex>
                <Text  pt={6} fontSize={'sm'} textAlign={'center'}>
                    ?? 2022 Etual. ?????? ?????????? ????????????????
                </Text>
            </Box>
        </Box>
    );
}