import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
    const folderPublicKey = ''//keyfiles
    const path =
        'url';
    const uploadFiles = async (selectedFiles: File[]) => {
        try {
            const formData = new FormData();
            selectedFiles.forEach((file: File) => {
                formData.append('file', file);
            });
            const response = await fetch('https://cloud-api.yandex.net/v1/disk/public/resources' + '/?public_key=' + folderPublicKey + '&path=' + path, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            if(error instanceof  Error) {
                console.error(error.message);
            }
        }
    };
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const onDrop = (acceptedFiles: File[]) => {
        setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true, maxFiles: 100 });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <p>Перетащите файлы сюда или кликните для выбора файлов.</p>
            )}
            <ul>
                {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            {selectedFiles.length > 0 && (
                <button onClick={() => uploadFiles}>Загрузить файлы на Яндекс.Диск</button>
            )}
        </div>
    );
};

export default FileUploader;