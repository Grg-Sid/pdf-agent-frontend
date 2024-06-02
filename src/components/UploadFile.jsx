import { useState } from 'react';
import axios from 'axios';

import './UploadFile.css';

const UploadFIle = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState({started: false, percentage: 0});
    const [msg, setMsg] = useState('');


    const onFileChange = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setMsg('');
    }

    const onFileUpload = async () => {
        if(!selectedFile) {
            setMsg('Please select a file first');
            return;
        }
        const formData = new FormData()
        formData.append('file', selectedFile);
        
        try {
            setMsg('Uploading file...');
            const res = await axios.post('http://httpbin.org/post', formData, {
                onUploadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted);
                    setProgress({started: true, percentage: percentCompleted});
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg('File uploaded successfully');
            console.log(res.data);
        } catch (error) {
            setMsg('File upload failed');
            console.log(error);
        }
    };
    
    return (
        <>
            <div className='uploadFile'>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>Upload!</button>
                {progress.started && <p>Progress: {progress.percentage}%</p>}
                {msg && <p>{msg}</p>}
            </div>
        </>
    );
};

export default UploadFIle;