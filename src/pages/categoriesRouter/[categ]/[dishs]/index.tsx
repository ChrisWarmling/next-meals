import { GetStaticProps, GetStaticPaths, GetStaticPathsContext } from 'next';
import { useRouter } from 'next/router';

import api from '../../../../service/api'


interface Meals {
    strMeal: string
    idMeal: number
}

interface MealsProps {
    meals: Meals[]
}

// export const getStaticPaths: GetStaticPaths = async (ctx: any) => {
//     // const ctx = context!.defaultLocale
//     console.log(ctx);


//     const response = await api.get('/filter.php?c=Beef')

//     let meals: string[] = []

//     for (let meal of response.data.meals) {
//         meals.push(meal.idMeal.toString())
//     }


//     const paths = meals.map((meal) => ({
//         params: { 
//             categ: 'Beef',
//             dishs: meal 
//         }
//     }))

//     return {
//         fallback: false,
//         paths
//     }
// }

export const getStaticProps: GetStaticProps<MealsProps> = async (context) => {
    const dish = context.params?.dishs

    const response = await api.get(`/lookup.php?i=${dish}`)
    const meals = response.data.meals

    // console.log(meals)

    return {
        props: {
            meals,
        }
    }
}

export default function dish({strMeal, idMeal}: Meals) {


    return (
        <>
            {/* <h1>{router.query.categ}</h1> */}
            <h1 key={idMeal}>{strMeal}</h1>
        </>
    )
}