import { processTemplate } from '@/shared/utils';
import React from 'react'
import PageRenderer from './PageRenderer';
import dynamic from 'next/dynamic';

const PageCrafterCSR = dynamic(() => import('@/components/PageCrafter'));

const WidgetRenderer = ({widget, data, componentMap = {}}: any) => {
    const props: any = {};
    if (widget.props) {
        Object.keys(widget.props).forEach((key: string) => {
            const value = widget.props[key];
            props[key] = value;
            if (typeof value === 'string') {
                props[key] = processTemplate(value, data);
            }
        });
    }

    if (widget.type === 'clientComponent') {
        widget.props = props;
        return <PageCrafterCSR widget={widget} data={data} />
    }

    return React.createElement(
        componentMap[widget.type] ?? widget.type,
        props,
        widget.children?.length ? <PageRenderer data={data} schema={widget.children} componentMap={componentMap} /> : null
    );
}

export default WidgetRenderer