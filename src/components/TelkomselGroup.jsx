import React from 'react';  
  
const TelkomselGroup = ({ bundle, onChange, onRemove }) => {  
    const handleChange = (e) => {  
        const { name, value } = e.target;  
        onChange({ ...bundle, [name]: value });  
    };  
  
    return (  
        <div className="telkomsel-group flex relative flex-col mb-4 border-b border-b-gray-700 pb-4">
            <label className="text-gray-700 font-bold mb-2">Label:</label>  
            <input type="text" name="label" value={bundle.label} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
            <label className="text-gray-700 font-bold mb-2">Value:</label>  
            <input type="text" name="value" value={bundle.value} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
            
            <button type="button" 
                className="remove-telkomsel absolute -top-1 right-0 bg-red-500 text-white hover:opacity-50 text-sm font-bold py-1 px-2 rounded" 
                onClick={onRemove}>X</button>  
        </div>  
    );  
};  
  
export default TelkomselGroup;  
