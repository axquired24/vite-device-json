import React, { useState, useEffect, useRef } from 'react';  
import Sortable from 'sortablejs';  
import SpecGroup from './SpecGroup';  
import TelkomselGroup from './TelkomselGroup';  
import InstallmentGroup from './InstallmentGroup';  
  
const DeviceForm = () => {  
    const [name, setName] = useState('');  
    const [unitPrice, setUnitPrice] = useState('');  
    const [drawerIcon, setDrawerIcon] = useState('');  
    const [deviceImage, setDeviceImage] = useState('');  
    const [specs, setSpecs] = useState([{ orderNum: 1, label: '', value: '' }]);  
    const [telkomselBundle, setTelkomselBundle] = useState([{ orderNum: 1, label: '', value: '' }]);  
    const [installment, setInstallment] = useState([{ month: 1, payment: '' }]);  
    const [jsonData, setJsonData] = useState(null);  
  
    const specsContainerRef = useRef(null);  
    const telkomselContainerRef = useRef(null);  
    const installmentContainerRef = useRef(null);  
  
    useEffect(() => {  
        if (specsContainerRef.current) {  
            new Sortable(specsContainerRef.current, {  
                animation: 150,  
                handle: '.spec-group'  
            });  
        }  
        if (telkomselContainerRef.current) {  
            new Sortable(telkomselContainerRef.current, {  
                animation: 150,  
                handle: '.telkomsel-group'  
            });  
        }  
        if (installmentContainerRef.current) {  
            new Sortable(installmentContainerRef.current, {  
                animation: 150,  
                handle: '.installment-group'  
            });  
        }  
    }, []);  
  
    const addSpec = () => {  
        setSpecs([...specs, { orderNum: specs.length + 1, label: '', value: '' }]);  
    };  
  
    const removeSpec = (index) => {  
        const newSpecs = specs.filter((_, i) => i !== index);  
        setSpecs(newSpecs);  
    };  
  
    const addTelkomsel = () => {  
        setTelkomselBundle([...telkomselBundle, { orderNum: telkomselBundle.length + 1, label: '', value: '' }]);  
    };  
  
    const removeTelkomsel = (index) => {  
        const newTelkomselBundle = telkomselBundle.filter((_, i) => i !== index);  
        setTelkomselBundle(newTelkomselBundle);  
    };  
  
    const addInstallment = () => {  
        setInstallment([...installment, { month: installment.length + 1, payment: '' }]);  
    };  
  
    const removeInstallment = (index) => {  
        const newInstallment = installment.filter((_, i) => i !== index);  
        setInstallment(newInstallment);  
    };  
  
    const handleImportJson = (event) => {  
        const file = event.target.files[0];  
        if (file) {  
            const reader = new FileReader();  
            reader.onload = (e) => {  
                try {  
                    const data = JSON.parse(e.target.result);  
                    if (data.data && data.data.length > 0) {  
                        const device = data.data[0];  
                        setName(device.name);  
                        setUnitPrice(device.unitPrice);  
                        setDrawerIcon(device.drawerIcon);  
                        setDeviceImage(device.deviceImage);  
                        setSpecs(device.specs);  
                        setTelkomselBundle(device.telkomselBundle);  
                        setInstallment(device.installment);  
                    }  
                } catch (error) {  
                    alert('Invalid JSON file');  
                }  
            };  
            reader.readAsText(file);  
        }  
    };  

    const autoOrderNum = (arr) => {
        return arr.map((item, index) => ({ ...item, orderNum: index + 1 }));
    }
  
    const handleSubmit = (event) => {  
        event.preventDefault();  
  
        const device = {  
            id: Date.now(),  
            name: name,  
            specs: autoOrderNum(specs),
            telkomselBundle: autoOrderNum(telkomselBundle),  
            unitPrice: unitPrice,
            installment: installment,
            drawerIcon: drawerIcon,  
            deviceImage: deviceImage  
        };  
  
        const jsonData = {  
            code: 200,  
            updatedAt: Math.floor(Date.now() / 1000),  
            data: [device],  
            message: "ok",  
            responseTime: new Date().toISOString().replace(/[-:.]/g, "").slice(0, 14)  
        };  
  
        setJsonData(jsonData);  
    };  
  
    return (  
        <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-md">  
            <h1 className="text-2xl font-bold mb-6">Form Input Perangkat</h1>  
  
            <form onSubmit={handleSubmit}>  
                <div className="grid grid-cols-2 w-full gap-4">
                    <div className="grid-cols-1">
                        <h2 className="text-xl font-bold mb-4">Device Info</h2>
                        <div className="mb-4 mt-6">  
                            <label htmlFor="jsonFile" className="block text-gray-700 font-bold mb-2">Impor JSON:</label>  
                            <input type="file" id="jsonFile" name="jsonFile" accept=".json" onChange={handleImportJson} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />  
                        </div> 

                        <div className="mb-4">  
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nama Perangkat:</label>  
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="unitPrice" className="block text-gray-700 font-bold mb-2">Harga Satuan:</label>  
                            <input type="text" id="unitPrice" name="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="drawerIcon" className="block text-gray-700 font-bold mb-2">Icon:</label>  
                            <input type="text" id="drawerIcon" name="drawerIcon" value={drawerIcon} onChange={(e) => setDrawerIcon(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="deviceImage" className="block text-gray-700 font-bold mb-2">Gambar Full:</label>  
                            <input type="text" id="deviceImage" name="deviceImage" value={deviceImage} onChange={(e) => setDeviceImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />  
                        </div>  
                    </div>

                    <div className="grid-cols-1">
                        <h2 className="text-xl font-bold mb-4 mt-6">Cicilan</h2>  
                        <div ref={installmentContainerRef} className="border p-4 rounded mb-4">  
                            {installment.map((install, index) => (  
                                <InstallmentGroup key={index} install={install} onChange={(newInstall) => {  
                                    const newInstallment = [...installment];  
                                    newInstallment[index] = newInstall;  
                                    setInstallment(newInstallment);  
                                }} onRemove={() => removeInstallment(index)} />  
                            ))}  
                        </div>  
                        <button type="button" className="add-installment bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addInstallment}>Tambah Cicilan</button>  
                    </div>

                    <div className="grid-cols-1">
                        <h2 className="text-xl font-bold mb-4 mt-6">Spesifikasi</h2>  
                        <div ref={specsContainerRef} className="border p-4 rounded mb-4">  
                            {specs.map((spec, index) => (  
                                <SpecGroup key={index} spec={spec} onChange={(newSpec) => {  
                                    const newSpecs = [...specs];  
                                    newSpecs[index] = newSpec;  
                                    setSpecs(newSpecs);  
                                }} onRemove={() => removeSpec(index)} />  
                            ))}  
                        </div>  
                        <button type="button" className="add-spec bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addSpec}>Tambah Spesifikasi</button>  
                    </div>

                    <div className="grid-cols-1">
                        <h2 className="text-xl font-bold mb-4 mt-6">Bundel Telkomsel</h2>  
                        <div ref={telkomselContainerRef} className="border p-4 rounded mb-4">  
                            {telkomselBundle.map((bundle, index) => (  
                                <TelkomselGroup key={index} bundle={bundle} onChange={(newBundle) => {  
                                    const newTelkomselBundle = [...telkomselBundle];  
                                    newTelkomselBundle[index] = newBundle;  
                                    setTelkomselBundle(newTelkomselBundle);  
                                }} onRemove={() => removeTelkomsel(index)} />  
                            ))}  
                        </div>  
                        <button type="button" className="add-telkomsel bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addTelkomsel}>Tambah Bundel</button>  
                    </div>
                </div>
                {/* end grid */} 
  
                <div className="mb-4 mt-6">
                    <button type="submit" className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Simpan</button>  
                </div>
            </form>  
  
            {jsonData && (  
                <div className="json-output mt-6 p-4 bg-gray-200 rounded">  
                    <pre>{JSON.stringify(jsonData.data[0], null, 2)}</pre>  
                </div>  
            )}  
        </div>  
    );  
};  
  
export default DeviceForm;  
