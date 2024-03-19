import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from '../helpers/imageHelper';
const mongoose = require('mongoose');


// const inventory = [
//     "Toyota Corolla",
//     "Ford F-Series",
//     "Volkswagen Golf",
//     "Chevrolet Silverado",
//     "Toyota Camry",
//     "Honda Accord",
//     "Ford Mustang",
//     "Nissan Altima",
//     "Honda CR-V",
//     "Toyota RAV4",
//     "Jeep Grand Cherokee",
//     "Subaru Outback",
//     "Mazda CX-5",
//     "BMW 3 Series",
//     "Mercedes-Benz C-Class",
//     "Audi A4",
//     "Tesla Model 3",
//     "Ford Escape",
//     "Hyundai Elantra",
//     "Honda Civic",
//     "Ford Ranger"
//   ]
  

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyC242ZxpvvWpUi7wpQVmb4ldVW3ZAMNDc0');

    const [image, setImage] = useState('');
    const [imageInineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch image insights
     */
    // async function aiImageRun(inventory) {
        async function aiImageRun(mongoose) {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            `What car is this picture? in syntax Make: , Model: ,Type: ,In Inventory (yes/no): ${mongoose} `, imageInineData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        // aiImageRun(inventory);
        aiImageRun(mongoose);

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div>

            <div>
                <div style={{ display: 'flex' }}>
                    <input type='file' onChange={(e) => handleImageChange(e)} />
                    <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
                </div>
                <img src={image} style={{ width: '30%', marginTop: 30 }} />
            </div>

            {
                loading == true && (aiResponse == '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
        </div>
    );
};

export default AiwithImage;