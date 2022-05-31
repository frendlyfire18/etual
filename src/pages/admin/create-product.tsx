import React from 'react';
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../../utils/CreateURQLClient";
import Main from "../../layouts/Main";
import {Center,Box,Button} from "@chakra-ui/react"
import InputField from "../../component/Inputs/InputFIeld";
import {Form, Formik} from "formik";
import {router} from "next/client";
import InputSelectField from "../../component/Inputs/InputSelectField";
import FixedInputSelectField from "../../component/Inputs/FixedInputSelectField";
import InputTextAreaField from "../../component/Inputs/InputTextAresField";
import {useRouter} from "next/router";
import {useCreateProductMutation} from "../../generated/graphql";
import Head from "next/head";

function CreateProduct(props) {
    const [,setProduct] = useCreateProductMutation();
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>Создать товар</title>
            </Head>
            <Main>
                <Box>
                    <Center>
                        <Formik
                            initialValues={
                                {
                                    name:'',
                                    description:'',
                                    price:'',
                                    sku:'',
                                    value:0,
                                    image:'',
                                    madeCountry:'',
                                    weight:'',
                                    purpose:'',
                                    forWho:'',
                                    dateOfEnd:'',
                                    numberOfItemsInBox:0,
                                    categoryId:'',
                                    brand:'',
                                    brandDesc:''
                                }}
                            onSubmit={async (values, actions) => {
                                await setProduct(values);
                                router.push("/admin")
                            }}
                        >
                            {(props) => (
                                <Form
                                >
                                    <InputField
                                        placeholder={"Название товара"}
                                        label={"Название товара"}
                                        name={"name"}
                                        type={"name"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputTextAreaField
                                        placeholder={"Описание товара"}
                                        label={"Описание товара"}
                                        name={"description"}
                                        type={"text"}
                                    />
                                    <InputField
                                        placeholder={"Изображение товара"}
                                        label={"Изображение това"}
                                        name={"image"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Текст тега"}
                                        label={"Текст тега"}
                                        name={"sku"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Цена товара"}
                                        label={"Цена товар"}
                                        name={"price"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Количество товара"}
                                        label={"Количество товар"}
                                        name={"value"}
                                        type={"number"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Для кого"}
                                        label={"Для кого"}
                                        name={"forWho"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputSelectField
                                        placeholder={"Выберете категорию"}
                                        label={"Выберете категорию"}
                                        name={"categoryId"}
                                    />
                                    <FixedInputSelectField
                                        placeholder={"Выберете страну"}
                                        label={"Выберете страну"}
                                        name={"madeCountry"}
                                    />
                                    <InputField
                                        placeholder={"Вес товара"}
                                        label={"Вес товара"}
                                        name={"weight"}
                                        type={"name"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Для кого этот товар"}
                                        label={"Для кого этот товар"}
                                        name={"purpose"}
                                        type={"name"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Срок годности"}
                                        label={"Срок годности"}
                                        name={"dateOfEnd"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Количество товара в коробке"}
                                        label={"Количество товара в коробке"}
                                        name={"numberOfItemsInBox"}
                                        type={"number"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputField
                                        placeholder={"Название бренда"}
                                        label={"Введите название бренда"}
                                        name={"brand"}
                                        type={"text"}
                                        width={{base:"350px",md:"1050px"} as never}
                                    />
                                    <InputTextAreaField
                                        placeholder={"Описание бренда"}
                                        label={"Описание бренда"}
                                        name={"brandDesc"}
                                        type={"text"}
                                    />
                                    <Button
                                        mt={4}
                                        mb={10}
                                        width={"100%"}
                                        bg='black'
                                        color={"white"}
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                    >
                                        Добавить товар
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Center>
                </Box>
            </Main>
        </div>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:true})(CreateProduct)