import React from 'react'
import PageRenderer from './PageRenderer'

const PageCrafterSSR = ({ page, componentMap = {} }: any) => {
  return (
    <PageRenderer data={page.data} schema={page.schema} componentMap={componentMap} />
  )
}

export default PageCrafterSSR