import { GetStaticProps } from "next"
import { useEffect } from "react"
import Link from 'next/link'

import api from '../service/api'

interface Categories {
    strCategory: string
}

interface CategoriesProps{
    categories: Categories[]
}

export const getStaticProps: GetStaticProps<CategoriesProps> = async () => {
    const response = await api.get('/list.php?c=list')
    const categories = await response.data.meals

    return {
        props:{
            categories,
        },
    }
}

export default function categories({categories}: CategoriesProps) {

    // useEffect(() => {
    //     api.get('/list.php?c=list').then((response) => {
    //         console.log(response.data.meals)
    //     })
    // }, [])


    return (
        <>
            <h1>Categories</h1>

            <section>
                <ul>
                    {categories.map((categorie, i) => {
                                
                                <li key={i}>{categorie.strCategory}</li>
                            }
                        )
                    }
                </ul>
            </section>
        </>
    )
}