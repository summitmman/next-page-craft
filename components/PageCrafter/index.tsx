'use client';
import React, { useState } from 'react'
import PageCrafter from './PageCrafter';
import { IPage } from './shared/interfaces';
import dynamic from 'next/dynamic';

const PageCrafterCSR = ({widget, data}: any) => {
    const dataObj = useState({});
    const [dObj, setDObj] = dataObj;

    const [page] = useState<IPage>({
        id: 'sample',
        schema: widget.children,
        data: {
            ...data,
            ...(widget.state ?? {})
        }
    });
    const syncState = (state: Record<string, any>) => {
		setDObj({
			...dObj,
			...state
		});
	};

    const componentMap = {
        'Card': dynamic(() => import('@/components/Card')),
        'Input': dynamic(() => import('@/components/Input'))
    };
    const eventMap = {
        handleNameChange: (e: any) => {
            setDObj({
                ...dObj,
                name: e.target.value
            });
        }
    };

  return (
    <PageCrafter components={componentMap} events={eventMap} dataObj={dataObj} page={page} syncState={syncState} />
  )
}

export default PageCrafterCSR