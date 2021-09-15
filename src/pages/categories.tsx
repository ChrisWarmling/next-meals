import { GetStaticProps } from "next"
import Link from 'next/link'

import List from '../components/List'

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
    return (
        <>
            <h1>Categories</h1>

            <section>
                <ul>
                    {categories.map((categorie, i) => (
                        <List key={i} link={`/categories/${categorie.strCategory}`} list={categorie.strCategory} />
                                // <li key={i}>
                                //     <Link href={`/categorie/${categorie.strCategory}`}>
                                //         <a>{categorie.strCategory}</a>
                                //     </Link>
                                // </li>
                            )
                        )
                    }
                </ul>
            </section>
        </>
    )
}