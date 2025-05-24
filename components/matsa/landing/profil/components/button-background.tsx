import Link from 'next/link'
import React from 'react'

type params = {
    navRoute: string
    imageURL: string
    text: string
}

const BackgoundButton = ({ navRoute, imageURL, text }: params) => {
    return (
        <Link href={navRoute}>
            <div
                className="relative flex items-center justify-center h-32 rounded-lg text-white font-semibold overflow-hidden shadow-md cursor-pointer "
                style={{
                    backgroundImage: `url('${imageURL}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <span className="relative z-10 text-2xl">{text}</span>
            </div>
        </Link>
    )
}

export default BackgoundButton