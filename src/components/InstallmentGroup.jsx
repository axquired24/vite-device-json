import React from 'react';  
  
const InstallmentGroup = ({ install, onChange, onRemove }) => {  
    const handleChange = (e) => {  
        const { name, value } = e.target;  
        onChange({ ...install, [name]: value });  
    };  
  
    return (  
        <div className="installment-group flex flex-col mb-4">  
            <label className="text-gray-700 font-bold mb-2">Bulan:</label>  
            <input type="number" name="month" value={install.month} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
            <label className="text-gray-700 font-bold mb-2">Pembayaran:</label>  
            <input type="text" name="payment" value={install.payment} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
            <button type="button" className="remove-installment bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline" onClick={onRemove}>Hapus Cicilan</button>  
        </div>  
    );  
};  
  
export default InstallmentGroup;  
