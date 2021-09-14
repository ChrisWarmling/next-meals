import { useRouter } from 'next/router';

export default function Product() {
    const router = useRouter();

    return <h1>{router.query.categ}</h1>
}