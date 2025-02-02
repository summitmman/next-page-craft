'use client';
import { useEffect } from "react";
import PageRenderer from "./components/PageRenderer";
import { UseStateObj, IPage } from "./shared/interfaces";

export interface IPageCrafterProps {
    dataObj: UseStateObj<Record<string, any>>,
    events: Record<string, Function>,
    page: IPage;
    syncState: (data: Record<string, any>) => void;
    components: Record<string, any>;
}

const PageCrafter = ({ dataObj, events, page, syncState, components }: IPageCrafterProps) => {
    const data = {
        ...(page.data ?? {}),
        ...dataObj[0]
    };
    const handleData = () => {
        syncState(data);
    };
    useEffect(() => {
        handleData();
    }, []);
    useEffect(() => {
        handleData();
    }, [page.data ?? {}]);
    
    return (
        <PageRenderer data={data} events={events} schema={page.schema} components={components} />
    );
}

export default PageCrafter;