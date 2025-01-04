import React from 'react'
import StringRenderer from './StringRenderer';
import WidgetRenderer from './WidgetRenderer';

const PageRenderer = ({schema, data, componentMap = {}}: any) => {
  return (
    <>
        {schema.map((item: any) => {
            if (typeof item === 'string') {
                return <StringRenderer str={item} data={data} />;
            }
            return <WidgetRenderer widget={item} data={data} componentMap={componentMap} />
        })}
    </>
  )
}

export default PageRenderer