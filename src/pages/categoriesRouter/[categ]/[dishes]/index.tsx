import { GetStaticProps, GetStaticPaths, GetStaticPathsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import api from '../../../../service/api'


interface Meals {
    strMeal: string
    idMeal: number
}

interface MealsProps {
    meals: Meals[]
}

interface MealsIdCateg {
    categ: string
    idMeal: number
}

export const getStaticPaths: GetStaticPaths = async (ctx: any) => {
    const response = await api.get('/list.php?c=list')

    let categories: string[] = []

    for (let meal of response.data.meals) {
        categories.push(meal.strCategory)
    }

    let mealsIdList: Object[] = []
    for (let ctg of categories) {
        const resp = await api.get(`/filter.php?c=${ctg}`)

        for (let id of resp.data.meals) {
            // const list = new Object()
            // list.categ = ctg
            // list.idMeal = id.idMeal
            const list: MealsIdCateg = {
                categ: ctg,
                idMeal: id.idMeal
            }
            mealsIdList.push(list)

        }
    }

    const paths = mealsIdList.map((list: any) => ({
        params: { categ: list.categ, dishes: list.idMeal }
    }))

    return {
        fallback: false,
        paths
    }
}

export const getStaticProps: GetStaticProps<MealsProps> = async (context) => {
    const dish = context.params?.dishes

    const response = await api.get(`/lookup.php?i=${dish}`)
    const meals = response.data.meals

    return {
        props: {
            meals,
        }
    }
}

export default function Dish({ meals }: MealsProps) {

    const router = useRouter();

    //verifica se o q está retornando é um array, se for retorna somente o conteudo no index [0]
    const verif = Array.isArray(meals) ? meals[0] : meals

    return (
        <>
            <h1>{router.query.categ}</h1>
            <h1 key={verif.idMeal}>{verif.strMeal}</h1>
        </>
    )
}