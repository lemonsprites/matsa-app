import { useArtikel } from '@/lib/context/artikel-context'
import React from 'react'

const Loader = ({id}: {id: string | null}) => {
    const { setArtikelId } = useArtikel()
    setArtikelId(id)
    return (
        <></>
    )
}

export default Loader