'use client';
import React, { useState } from 'react'

const Input = ({value, label, id}: any) => {
    const [v, setV] = useState(value);
    return (
        <div>
            <label className="block" htmlFor={id}>{label}:</label>
            <input
                id={id}
                type="text"
                value={v}
                onInput={(e) => setV((e.target as any).value)}
                className="px-6 py-3 border-gray-700 border-2 rounded"
            />
            <div>You have entered "{v}"</div>
        </div>
    )
}

export default Input