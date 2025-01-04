import { processTemplate } from '@/shared/utils'
import React from 'react'

const StringRenderer = ({str, data}: any) => {
  return (
    <>
        { processTemplate(str, data) }
    </>
  )
}

export default StringRenderer