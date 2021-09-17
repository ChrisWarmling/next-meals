import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link'

import api from '../../../service/api'


interface Meals {
    strMeal: string
    idMeal: number
}

interface MealsProps {
    meals: Meals[]
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await api.get('/list.php?c=list')

    let categories: string[] = []

    for (let meal of response.data.meals) {
        categories.push(meal.strCategory)
    }

    const paths = categories.map((categorie) => ({
        params: { categ: categorie }
    }))

    return {
        fallback: false,
        paths
    }
}

export const getStaticProps: GetStaticProps<MealsProps> = async (context) => {
    const categorie = context.params?.categ

    const response = await api.get(`/filter.php?c=${categorie}`)
    const meals = response.data.meals

    return {
        props: {
            meals,
        }
    }
}

export default function Product({ meals }: MealsProps) {

    const router = useRouter();

    return (
        <>
            <h1>{router.query.categ}</h1>
            <section>
                <ul>
                    {meals.map(meal => (
                        <li key={meal.idMeal} >
                            <Link href='/categoriesRouter/[categ]/[dish]' as={`/categoriesRouter/${router.query.categ}/${meal.idMeal}`} passHref>
                                <a >{meal.strMeal}</a>
                            </Link>
                        </li>
                    )
                    )
                    }
                </ul>
            </section>
        </>
    )

}