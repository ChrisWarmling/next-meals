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
    const categories = response.data.meals

    return {
        props:{
            categories,
        },
    }
}

export default function categories({categories}: CategoriesProps) {
    console.log(categories)
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
                    {categories.map((categorie, i) => (
                                
                                <li key={i}>
                                    <Link href={`/categorie/${categorie.strCategory}`}>
                                        <a>{categorie.strCategory}</a>
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