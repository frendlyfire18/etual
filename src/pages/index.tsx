import React, {useEffect, useState} from 'react';
import {
    SimpleGrid,
    Box,
    Center,
    Heading,
    Badge,
    Button,
    Radio,
    RadioGroup,
    Spinner,
    MenuDivider,
    MenuList,
    Stack,
    MenuItemOption, MenuButton, Menu, MenuOptionGroup
} from "@chakra-ui/react"
import NextLink from "next/link"
import Main from "../layouts/Main";
import {
    useGetAllAnimalsQuery, useGetAllBrandsQuery,
    useGetAllCountriesQuery,
    useGetAllProductsQuery,
    useGetMaxPriceFromAllProductsQuery, useUpdateProductsMutation
} from "../generated/graphql";
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../utils/CreateURQLClient";
import {useRouter} from "next/router";
import AdminCard from "../component/AdminCard";
import Head from "next/head"
import Card from "../component/Card";
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react'
import {data} from "browserslist";
import LoadingCard from "../component/LoadingCard";
import {UpDownIcon} from "@chakra-ui/icons";

const ListOfCountries=({variable,hook})=>{
    const [{data,fetching}] = useGetAllCountriesQuery()
    if(!data||fetching){
        return (
            <>
                Загрузка...
            </>
        )
    }
    return (
        <>
            <Heading my={2} mx={4} fontSize={"15px"}>Какая страна</Heading>
            <RadioGroup onChange={(country)=>{
                if(variable?.animal !== ""){
                    hook({country:(country === "")?undefined:country,forWho:(variable.animal === "")?undefined:variable.anima})
                }else{
                    hook({country:(country === "")?undefined:country})
                }
            }} value={variable}>
                <Stack mx={5}>
                    <Radio value={""}>{"Все"}</Radio>
                    {
                        data.getAllCountries.countries.map(country=>(
                            <Radio value={country}>{country}</Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>
        </>
    )
}

const ListOfBrands=({variable,hook})=>{
    const [{data,fetching}] = useGetAllBrandsQuery()
    if(!data||fetching){
        return (
            <>
                Загрузка...
            </>
        )
    }
    return (
        <>
            <Heading my={2} mx={4} fontSize={"15px"}>Какого бренда</Heading>
            <RadioGroup onChange={(brand)=>{
                if(variable?.brand !== ""){
                    hook({country:(variable.country === "")?undefined:variable.country,forWho:(variable.forWho === "")?undefined:variable.forWho,brand:(brand === "")?undefined:brand})
                }else{
                    hook({brand:(brand === "")?undefined:brand})
                }
            }} value={variable}>
                <Stack mx={5}>
                    <Radio value={""}>{"Все"}</Radio>
                    {
                        data.getAllBrands.brands.map(brand=>(
                            <Radio value={brand}>{brand}</Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>
        </>
    )
}

const ListOfAnimals=({variable,hook})=>{
    const [{data,fetching}] = useGetAllAnimalsQuery()
    if(!data||fetching){
        return (
            <>
                Загрузка...
            </>
        )
    }
    return (
        <>
            <Heading my={2} mx={4} fontSize={"15px"}>Для чего</Heading>
            <RadioGroup onChange={(animal)=>{
                if(variable?.country !== ""){
                    hook({country:(variable.country === "")?undefined:variable.country,forWho:(animal === "")?undefined:animal})
                }else{
                    hook({forWho:(animal === "")?undefined:animal})
                }
            }} value={variable}>
                <Stack mx={5}>
                    <Radio value={""}>{"Все"}</Radio>
                    {
                        data.getAllAnimals.forWho.map(animal=>(
                            <Radio value={animal}>{animal}</Radio>
                        ))
                    }
                </Stack>
            </RadioGroup>
        </>
    )
}

const SlideMark=({variable,hook})=>{
    const [{data,fetching}] = useGetMaxPriceFromAllProductsQuery()
    const [sliderValue, setSliderValue] = useState([0,data?.getMaxPrice])
    useEffect(() => {
        console.log(sliderValue)
    },[sliderValue])
    if(!data||fetching){
        return(
            <>
                Загрузка
            </>
        )
    }
    return(
        <>
            <Heading mx={4} fontSize={"15px"}>Цена: от {sliderValue[0]}₽ до {sliderValue[1]}₽</Heading>
            <Box mx={6}>
                <RangeSlider aria-label={['min', 'max']} defaultValue={[0,100]} onChangeEnd={(val) =>{
                    val[0] = parseInt(String(((val[0] * data?.getMaxPrice) / 100)))
                    val[1] = parseInt(String(((val[1]*data?.getMaxPrice)/100)))
                    setSliderValue(val)
                    hook({priceRange:val[0],secondRange:val[1]})
                }}>
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
            </Box>
        </>
    )
}

const SortButton=({variable,hook})=>{
    return(
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} color={"white"} bg={"black"} >
                <UpDownIcon mr={1}/>Сортировка
            </MenuButton>
            <MenuList minWidth='240px'>
                <ListOfBrands variable={variable} hook={hook}/>
                <MenuDivider />
                <ListOfAnimals variable={variable} hook={hook}/>
                <MenuDivider />
                <ListOfCountries variable={variable} hook={hook}/>
                <MenuDivider />
                <SlideMark variable={variable} hook={hook}/>
                <MenuDivider />
            </MenuList>
        </Menu>
    )
}


const Index =(props)=> {
    const [variables,setV] = useState({})
    const [{data,fetching}] = useGetAllProductsQuery(
        {
            variables,
        }
    )
    useEffect(() => {
        console.log(variables)
    },[data])
    if(fetching||!data){
        return(
            <div>
                <Head>
                    <title>Добро пожаловать на сайт магазина косметики Etual</title>
                </Head>
                <Main>
                    <Center>
                        <Box py={2} width={{md:"55%",base:"100%"}}>
                            <SortButton variable={variables} hook={setV}/>
                        </Box>
                    </Center>
                    <Box>
                        <Center>
                            <Box py={10} width={"55%"}>
                                <Heading>
                                    Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Main>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>Добро пожаловать на сайт магазина косметики Etual</title>
            </Head>
            <Main>
                <Center>
                    <Box py={2} width={{md:"55%",base:"100%"}}>
                        <SortButton variable={variables} hook={setV}/>
                    </Box>
                </Center>
                <Box>
                    <Center>
                        <Box py={10} width={"55%"}>
                            <Heading>
                                Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                {data?.getProducts.records.length}
                            </Badge>
                            </Heading>
                        </Box>
                    </Center>
                    <Center>
                        <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                            {
                                data?.getProducts.records.map((product,value)=>(
                                    <Box key={value}>
                                        <Card key={value} data={product}/>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </Center>
                </Box>
            </Main>
        </div>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:false})(Index);