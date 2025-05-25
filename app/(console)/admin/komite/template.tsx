import { NextPage } from 'next'

interface Props {
    children: React.ReactNode
}

const Template: NextPage<Props> = ({children}) => {
  return children
}

export default Template