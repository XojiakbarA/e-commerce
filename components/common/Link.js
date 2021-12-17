import Link from "next/link"

const MyLink = ({ href, children, style }) => {
    return (
        <Link href={href}>
        <a style={style}>{children}</a>
        </Link>
    )
}

export default MyLink