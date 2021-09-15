import Link from 'next/link'

interface LinkProps{
    link: string | ''
    list: string
}

export default function List(props: LinkProps) {
    return (
        <li>
            <Link href={props.link}>
                <a>{props.list}</a>
            </Link>
        </li>
    )
}