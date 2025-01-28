import React from 'react';  
  
const InstallmentGroup = ({ install, onChange, onRemove }) => {  
    const handleChange = (e) => {  
        const { name, value } = e.target;  
        onChange({ ...install, [name]: value });  
    };  
  
    return (  
        <div className="installment-group relative flex flex-col mb-4">  
            <label className="text-gray-700 font-bold mb-2">Bulan:</label>  
            <input type="number" name="month" value={install.month} onChange={handleChange} className="form-control" required />  
            <label className="text-gray-700 font-bold mb-2">Pembayaran:</label>  
            <input type="text" name="payment" value={install.payment} onChange={handleChange} className="form-control" required />  
            <button type="button" 
                className="remove-telkomsel absolute -top-1 right-0 bg-red-500 text-white hover:opacity-50 text-sm font-bold py-1 px-2 rounded" 
                onClick={onRemove}>X</button>   
        </div>  
    );  
};  
  
export default InstallmentGroup;  
