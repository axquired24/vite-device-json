import React, { useState, useEffect, useRef } from 'react';  
import Sortable from 'sortablejs';  
import SpecGroup from './SpecGroup';  
import TelkomselGroup from './TelkomselGroup';  
import InstallmentGroup from './InstallmentGroup';  
  
const DeviceForm = () => {  
    const [deviceId, setDeviceId] = useState('');
    const [name, setName] = useState('');  
    const [unitPrice, setUnitPrice] = useState('');  
    const [drawerIcon, setDrawerIcon] = useState('');  
    const [deviceImage, setDeviceImage] = useState(''); 
    const [gformUrl, setGformUrl] = useState('');
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

        // Prevent scrolling when input number is focused
        document.addEventListener("wheel", function(event){
            if(document.activeElement.type === "number"){
                document.activeElement.blur();
            }
        });
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
                        setDeviceId(device.id);  
                        setName(device.name);  
                        setUnitPrice(device.unitPrice);  
                        setDrawerIcon(device.drawerIcon);  
                        setDeviceImage(device.deviceImage);
                        setGformUrl(device?.gformUrl || '');
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
            id: deviceId,  
            name: name,  
            specs: autoOrderNum(specs),
            telkomselBundle: autoOrderNum(telkomselBundle),  
            unitPrice: unitPrice,
            installment: installment,
            drawerIcon: drawerIcon,  
            deviceImage: deviceImage,
            gformUrl: gformUrl
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

    const copyToClipboard = (jsonData) => {
        const el = document.createElement('textarea');
        el.value = JSON.stringify(jsonData, null, 2);
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Copied to clipboard');
    }

    const previewMobile = (
        <div className='px-2 mt-6'>
            <div className="flex justify-end">
                <button className='btn-add' onClick={() => copyToClipboard(jsonData.data[0])}>Copy</button>
            </div>
            {jsonData && (  
                <div className="json-output p-4 bg-gray-200 rounded overflow-auto">  
                    <pre>{JSON.stringify(jsonData.data[0], null, 2)}</pre>  
                </div>  
            )}
        </div>
    )
  
    const builderForm = (  
        <div className="w-full bg-white p-6 rounded-lg shadow-md">  
            <h1 className="text-2xl font-bold mb-6">Form Input Perangkat</h1>  
  
            <form onSubmit={handleSubmit}>  
                <div className="grid grid-cols-2 w-full gap-4">
                    <div className="grid-cols-1">
                        <h2 className="text-xl font-bold mb-4">Device Info</h2>
                        <div className="mb-4 mt-6">  
                            <label htmlFor="jsonFile" className="block text-gray-700 font-bold mb-2">Impor JSON:</label>  
                            <input type="file" id="jsonFile" name="jsonFile" accept=".json" onChange={handleImportJson} className="form-control" />  
                        </div> 

                        <div className="mb-4">  
                            <label htmlFor="deviceId" className="block text-gray-700 font-bold mb-2">Device ID:</label>  
                            <input type="text" id="deviceId" name="deviceId" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} className="form-control" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nama Perangkat:</label>  
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="unitPrice" className="block text-gray-700 font-bold mb-2">Harga:</label>  
                            <input type="text" id="unitPrice" name="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="form-control" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="drawerIcon" className="block text-gray-700 font-bold mb-2">Icon:</label>  
                            <input type="text" id="drawerIcon" name="drawerIcon" value={drawerIcon} onChange={(e) => setDrawerIcon(e.target.value)} className="form-control" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="deviceImage" className="block text-gray-700 font-bold mb-2">Gambar Full:</label>  
                            <input type="text" id="deviceImage" name="deviceImage" value={deviceImage} onChange={(e) => setDeviceImage(e.target.value)} className="form-control" required />  
                        </div>  
                        <div className="mb-4">  
                            <label htmlFor="gformUrl" className="block text-gray-700 font-bold mb-2">GForm URL:</label>  
                            <input type="url" id="gformUrl" name="gformUrl" value={gformUrl} onChange={(e) => setGformUrl(e.target.value)} className="form-control" required />  
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
                        <button type="button" className="add-installment btn-add" onClick={addInstallment}>Tambah Cicilan</button>  
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
                        <button type="button" className="add-spec btn-add" onClick={addSpec}>Tambah Spesifikasi</button>  
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
                        <button type="button" className="add-telkomsel btn-add" onClick={addTelkomsel}>Tambah Bundel</button>  
                    </div>
                </div>
                {/* end grid */} 
  
                <div className="mb-4 mt-6">
                    <button type="submit" className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Simpan</button>  
                </div>
            </form>  
        </div>  
    );  

    return (
        <div className="grid grid-cols-12 px-4">
            <div className="col-span-9 overflow-auto h-[100vh]">
                {builderForm}
            </div>
            <div className="col-span-3">
                {previewMobile}
            </div>
        </div>
    )
};  
  
export default DeviceForm;  
