import React, {ReactNode, useEffect, useState} from 'react';
import {
    Text,
    Image,
    Box,
    Stack,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Center, SimpleGrid, Badge, Icon,
} from '@chakra-ui/react';
import {
    IconButton,HStack
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {FiShoppingCart,FiTrash2} from "react-icons/fi";
import {HamburgerIcon,CloseIcon} from "@chakra-ui/icons"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import {selectCart} from "../redux/feature/counter/counterSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useGetAllProductsQuery, useGetOneProductQuery} from "../generated/graphql";

import {
    deleteFromCart,
    increment,
    decrement
} from '../redux/feature/counter/counterSlice';
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
import InputField from "./Inputs/InputFIeld";
import InputTextAreaField from "./Inputs/InputTextAresField";
import InputSelectField from "./Inputs/InputSelectField";
import FixedInputSelectField from "./Inputs/FixedInputSelectField";

const NavLink = ({ children,color,href }: { children: ReactNode,color:string,href:string }) => {
    const router = useRouter()
    return(
        <Link
            onClick={()=>{
                router.push(href)
            }}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
                color:`${color}`
            }}>
            {children}
        </Link>
    )
}

const BuyItem=({item})=>{
    const [variables,setV] = useState({_id: item.id})
    const [{data,fetching}] = useGetOneProductQuery({
        variables,
    })
    return(
        <>
            <Box>
                <Text>
                    {data.getOneProduct.name} : {item.num}, Цена: {(parseInt(item.num)*parseInt(data.getOneProduct.price))}₽
                </Text>
            </Box>
        </>
    )
}

const CartItem=({sum,hook,item,color})=>{
    const dispatch = useAppDispatch();
    const [variables,setV] = useState({_id: item.id})
    const [{data,fetching}] = useGetOneProductQuery({
        variables,
    })
    useEffect(() => {
        if(data){
            hook(sum+parseInt(data?.getOneProduct.price))
        }
    },[fetching])

    if(!data||fetching){
        return (
            <>
               Загрузка
            </>
        )
    }
    return(
        <Box>
            <Box p={5} sx={{
                '@media screen and (max-width: 540px) ':{
                    width:"200px"
                }
            }} width={"800px"}>
                <SimpleGrid columns={[1,null,4]}>
                    <Image
                        rounded={'lg'}
                        height={50}
                        width={"50%"}
                        mx={5}
                        objectFit={'cover'}
                        src={data.getOneProduct.image}
                    />
                    <SimpleGrid columns={[1,null,3]} mr={5}>
                        <Button onClick={()=>{
                            if(sum<(parseInt(data?.getOneProduct.price)*data?.getOneProduct.value)){
                                dispatch(increment({id:item.id}))
                                hook(sum+parseInt(data?.getOneProduct.price))
                            }
                        }} p={2} bg={"black"}>+</Button>
                        <Box width={"50px"} color={color} mx={5} p={2}>
                            {item.num}
                        </Box>
                        <Button onClick={()=>{
                            dispatch(decrement({id:item.id}))
                            if(sum>parseInt(data?.getOneProduct.price))
                                hook(sum-parseInt(data?.getOneProduct.price))
                        }} p={2} bg={"black"}>-</Button>
                    </SimpleGrid>
                    <Box color={color}>
                        {data.getOneProduct.name}
                    </Box>
                    <Button mr={5} bg={"black"} ml={5} onClick={()=>{
                        dispatch(deleteFromCart({id:item.id,num:1}))
                        hook(sum-parseInt(data?.getOneProduct.price))
                    }}>
                        <FiTrash2/>
                    </Button>
                </SimpleGrid>
            </Box>
            <MenuDivider />
        </Box>
    )
}


const Cart =({color})=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sum,setSum] = useState(0)
    const cart = useAppSelector(selectCart);
    useEffect(() => {
        console.log(sum)
    },[sum])
    return(
        <>
            <Menu>
                <MenuButton p={1} borderRadius="lg" _hover={{
                    background:"hsl(360 360% 360%)",
                    color:"black",
                    textShadow:"none",
                }} sx={{
                    background:"hsl(0 0% 0%)",
                    color:"hsl(360 360% 360%)",
                    border:"hsl(360 360% 360%) 0.125em solid",
                    textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                    boxShadow:"inset 0 0 0.5em 0 hsl(360 360% 360%), 0 0 0.5em 0 hsl(360 360% 360%)",
                }}>
                    <Flex>
                        <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                        <Center px={1}>
                            {cart?.length||0}
                        </Center>
                    </Flex>
                </MenuButton>
                <MenuList zIndex={10}>
                    {
                        !cart?.length
                        &&
                        <Text color={color} px={5}>
                            Корзина пуста
                        </Text>
                    }
                    {
                        cart?.length!==0
                        &&
                        cart?.map(item=>(
                            <CartItem sum={sum} hook={setSum} color={color} item={item}/>
                        ))
                    }
                    <Button onClick={onOpen} bg={"black"} mx={10}>
                        Купить все за {sum} ₽
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Оформление заказа (Дотавка только по Антрациту)</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Formik
                                    initialValues={
                                        {
                                            name:'',
                                            lastname:'',
                                            number:'',
                                            adress:'',
                                            email:''
                                        }}
                                    onSubmit={async (values, actions) => {
                                        console.log(values,cart)
                                        alert("Письмо о подтверждении заказа было отослано на почту " + values.email)
                                        onClose()
                                    }}
                                >
                                    {(props) => (
                                        <Form
                                        >
                                            <InputField
                                                placeholder={"Введите свое имя"}
                                                label={"Ваше имя"}
                                                name={"name"}
                                                type={"name"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите свою фамилию"}
                                                label={"Ваша фамилия"}
                                                name={"lastname"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите ваш контактный номер"}
                                                label={"Ваш контактный номерва"}
                                                name={"number"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите вашу почту"}
                                                label={"Ваша почта"}
                                                name={"email"}
                                                type={"email"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите ваш адрес"}
                                                label={"Ваш адрес"}
                                                name={"adress"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <Button
                                                isDisabled={(cart.length === 0)}
                                                mt={4}
                                                mb={10}
                                                width={"100%"}
                                                bg='black'
                                                color={"white"}
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                            >
                                                Купить
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                            <ModalFooter>
                                <Stack>
                                    {
                                        cart?.length!==0
                                        &&
                                        cart?.map(item=>(
                                            <Box>
                                                <BuyItem item={item}/>
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </MenuList>
            </Menu>
        </>
    )
}

export default function Nav() {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box
                 w="full" bg={"black"} px={4} color={"white"}>
                <Flex py={5} alignItems={'center'} justifyContent={'space-around'}>
                    <Box>
                        <Flex>
                            <Box mx={10} rounded={"lg"}>
                                <svg width="161" height="30" viewBox="0 0 161 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M119.245 0.608887C110.191 0.608887 102.793 9.809 100.336 22.2676C100.309 22.3908 100.282 22.7057 100.268 22.8289C100.499 22.8289 101.273 22.9111 101.544 22.1854C106.268 12.1638 112.051 5.962 119.245 5.962C126.535 5.962 132.63 13.3549 136.295 22.8152C137.055 22.0759 138.236 20.9122 138.236 19.7896C135.236 8.7275 127.756 0.608887 119.245 0.608887Z" fill="white"/>
                                    <path d="M13.6916 1.14294C7.04018 1.14294 3.11718 2.79954 0.809479 4.31914L3.34788 5.59244C5.46548 4.19594 7.96318 2.85424 12.8364 2.85424C22.5421 2.85424 24.2389 8.71394 24.5376 11.0276L24.5104 10.9591C24.4154 10.9865 24.3204 11.0139 24.2389 11.0413C23.1666 11.3699 21.8227 11.7806 19.5965 11.7806C18.6191 11.7806 17.9811 11.5478 17.1803 11.233C16.1757 10.8496 14.9133 10.3841 12.7957 10.3841C11.0039 10.3841 9.45638 10.7538 8.30258 11.096V13.4508C9.38848 13.1223 10.9767 12.6431 12.7957 12.6431C14.5197 12.6431 15.4291 12.9854 16.3929 13.355C17.2888 13.6973 18.2119 14.0395 19.5965 14.0395C21.9313 14.0395 23.4516 13.6288 24.5919 13.2866C24.5783 13.6973 24.5783 14.0395 24.5647 14.1491C24.3475 16.1616 22.8408 21.6379 12.8364 21.6379C7.37948 21.6379 5.24838 20.5837 3.13068 19.0367L0.714478 20.5153C3.30718 22.1308 6.32068 23.3492 13.6916 23.3492C23.3566 23.3492 30.0217 19.023 30.0217 12.7937C30.0217 6.55074 23.3702 1.14294 13.6916 1.14294Z" fill="white"/>
                                    <path d="M31.298 8.17984H37.6237V22.8288H42.1168V8.17984H48.2389V6.16724H31.298V8.17984Z" fill="white"/>
                                    <path d="M73.404 6.16724L64.079 19.2556L55.581 6.16724H50.7757L61.608 22.7604L56.952 29.3045H59.979L76.418 6.16724H73.404Z" fill="white"/>
                                    <path d="M87.333 5.87988C81.387 5.87988 77.274 7.13938 77.138 9.98708H77.125V10.5758H81.835C81.835 9.00138 82.704 7.89238 87.618 7.89238C92.681 7.89238 93.17 8.93288 93.17 10.5758V12.9169H85.989C79.351 12.9169 76.025 15.1622 76.025 18.2015C76.025 20.8301 78.794 22.8016 84.224 22.8016H97.663V10.3978C97.676 6.97508 95.152 5.87988 87.333 5.87988ZM93.17 20.8164H85.351C81.957 20.8164 80.817 19.6938 80.817 18.0098C80.817 16.3396 82.215 14.9705 85.758 14.9705H93.17V20.8164Z" fill="white"/>
                                    <path d="M151.946 12.9304H145.186V6.16724H140.625V22.8151H153.249C158.326 22.8151 161 20.6931 161 17.7222C161 14.3132 156.901 12.9304 151.946 12.9304ZM152.177 20.8163H145.186V14.9704H151.81C155.136 14.9704 156.439 16.1204 156.439 17.8043C156.439 19.7347 155.367 20.8163 152.177 20.8163Z" fill="white"/>
                                </svg>
                            </Box>
                            <Box display={{ base: 'none',md:"flex" }}>
                                <Center>
                                    <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/"}>Каталог</NavLink>
                                    <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/categories"}>Категории</NavLink>
                                    <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/about"}>О нас</NavLink>
                                </Center>
                            </Box>

                        </Flex>
                    </Box>
                    <IconButton
                        bg={"white"}
                        color={"black"}
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                        <Flex alignItems={'center'}>
                            <SimpleGrid columns={[1,null,2]} spacingX={"20px"}>
                                <Cart color={colorMode === 'light' ? "black" : "white"}/>
                                <Button _hover={{
                                    background:"hsl(360 360% 360%)",
                                    color:"black",
                                    textShadow:"none",
                                }} sx={{
                                    background:"hsl(0 0% 0%)",
                                    color:"hsl(360 360% 360%)",
                                    border:"hsl(360 360% 360%) 0.125em solid",
                                    textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                    boxShadow:"inset 0 0 0.5em 0 hsl(360 360% 360%), 0 0 0.5em 0 hsl(360 360% 360%)",
                                }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                            </SimpleGrid>
                        </Flex>
                        <Button _hover={{
                            background:"hsl(360 360% 360%)",
                            color:"black",
                            textShadow:"none",
                        }} sx={{
                            background:"hsl(0 0% 0%)",
                            color:"hsl(360 360% 360%)",
                            border:"hsl(360 360% 360%) 0.125em solid",
                            textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                            boxShadow:"inset 0 0 0.5em 0 hsl(360 360% 360%), 0 0 0.5em 0 hsl(360 360% 360%)",
                        }} onClick={()=>{
                            router.push("/enter")
                        }}>
                            Вход
                        </Button>
                    </HStack>
                </Flex>
                {isOpen ? (
                    <Box pl={10} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/"}>Каталог</NavLink>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/categories"}>Категории</NavLink>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/about"}>О нас</NavLink>
                            <Flex alignItems={'center'}>
                                <SimpleGrid columns={[2,null,2]} spacingX={"20px"}>
                                    <Button py={2} _hover={{
                                        background:"hsl(360 360% 360%)",
                                        color:"black",
                                        textShadow:"none",
                                    }} sx={{
                                        background:"hsl(0 0% 0%)",
                                        color:"hsl(360 360% 360%)",
                                        border:"hsl(360 360% 360%) 0.125em solid",
                                        textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                        boxShadow:"inset 0 0 0.5em 0 hsl(360 360% 360%), 0 0 0.5em 0 hsl(360 360% 360%)",
                                    }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                    </Button>
                                    <Cart color={colorMode === 'light' ? "black" : "white"}/>
                                </SimpleGrid>
                            </Flex>
                            <Button _hover={{
                                background:"hsl(360 360% 360%)",
                                color:"black",
                                textShadow:"none",
                            }} sx={{
                                background:"hsl(0 0% 0%)",
                                color:"hsl(360 360% 360%)",
                                border:"hsl(360 360% 360%) 0.125em solid",
                                textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                boxShadow:"inset 0 0 0.5em 0 hsl(360 360% 360%), 0 0 0.5em 0 hsl(360 360% 360%)",
                            }} onClick={()=>{
                                router.push("/enter")
                            }}>
                                Вход
                            </Button>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}