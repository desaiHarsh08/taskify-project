// // const { default: fetch } = require("node-fetch");

// // const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNhaWhhcnNoMTgzQGdtYWlsLmNvbSIsImlhdCI6MTcyNDMyMjExMSwiZXhwIjoxNzI0NDA4NTExfQ.-2dPHtIJeMEdjxdJiygJMqcd9xXjjVXW1cwnQP5ZMnDYTjt_W-GXZz_P_iszdWuZ7wIkhqmLq0tz4gRxVUqRWw";

// // async function createFunction(fn) {
// //     const response = await fetch(`http://localhost:5003/api/functions`, {
// //         method: "POST",
// //         headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${token}`
// //         }
// //     })

// //     const data = await response.json();
// //     console.log(data);
// // }

// // const functionDto = {
// //     functionPrototypeId: 6,
// //     taskId: 60,
// //     department: "QUOTATION",
// //     createdByUserId: 3,
// //     fields: [
// //         {
// //             fieldPrototypeId: 8,
// //             createdByUserId: 3,
// //             columns: [
// //                 {
// //                     columnPrototypeId: 11,
// //                     createdByUserId: 3,
// //                     textValue: "my requirement details"
// //                 },
// //                 {
// //                     columnPrototypeId: 12,
// //                     createdByUserId: 3,
// //                 }
// //             ]
// //         }
// //     ]
// // }


// // const fileDto = {
// //     file: "./new-inquiry.json",
// //     columnPrototypeId: 12,
// //     fieldPrototypeId: 8,
// //     functionPrototypeId: 6,
// //     taskPrototypeId: 1,
// //     taskId: 60
// // }

// // // Create Form data

// // // Send the request












// import fetch from "node-fetch"; // Ensure node-fetch is installed: npm install node-fetch
// import FormData from 'form-data'; // Import FormData
// import fs from 'fs'; // Import fs to read files

// const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNhaWhhcnNoMTgzQGdtYWlsLmNvbSIsImlhdCI6MTcyNDMyMjExMSwiZXhwIjoxNzI0NDA4NTExfQ.-2dPHtIJeMEdjxdJiygJMqcd9xXjjVXW1cwnQP5ZMnDYTjt_W-GXZz_P_iszdWuZ7wIkhqmLq0tz4gRxVUqRWw";

// async function createFunction(fn, fileDto) {
//     // Create FormData object
//     const formData = new FormData();

//     // Append functionDto as a JSON string
//     formData.append('functionDto', fn);

//     // // Append fileDto fields
//     // formData.append('fileDto.columnPrototypeId', fileDto.columnPrototypeId);
//     // formData.append('fileDto.fieldPrototypeId', fileDto.fieldPrototypeId);
//     // formData.append('fileDto.functionPrototypeId', fileDto.functionPrototypeId);
//     // formData.append('fileDto.taskPrototypeId', fileDto.taskPrototypeId);
//     // formData.append('fileDto.taskId', fileDto.taskId);

//     // // Append the file itself (ensure the file path is correct)
//     // formData.append('fileDto.file', fs.createReadStream(fileDto.file));

//     fileDto.file = fs.createReadStream(fileDto.file);

//     const fileDtoListWrapper = [];
//     fileDtoListWrapper.push(fileDto);

//     formData.append('fileDtoListWrapper', fileDtoListWrapper);

//     try {
//         const response = await fetch(`http://localhost:5003/api/functions`, {
//             method: "POST",
//             headers: {
//                 'Authorization': token, // Authorization header with token
//             },
//             body: formData // Use the FormData object as the body
//         });

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // FunctionDto and FileDto objects
// const functionDto = {
//     functionPrototypeId: 6,
//     taskId: 60,
//     department: "QUOTATION",
//     createdByUserId: 3,
//     fields: [
//         {
//             fieldPrototypeId: 8,
//             createdByUserId: 3,
//             columns: [
//                 {
//                     columnPrototypeId: 11,
//                     createdByUserId: 3,
//                     textValue: "my requirement details"
//                 },
//                 {
//                     columnPrototypeId: 12,
//                     createdByUserId: 3,
//                 }
//             ]
//         }
//     ]
// }

// const fileDto = {
//     file: "./new-inquiry.json", // Ensure this path is correct
//     columnPrototypeId: 12,
//     fieldPrototypeId: 8,
//     functionPrototypeId: 6,
//     taskPrototypeId: 1,
//     taskId: 60
// }



// // Call the function
// createFunction(functionDto, fileDto);






















import fetch from "node-fetch"; // Ensure node-fetch is installed: npm install node-fetch
import FormData from 'form-data'; // Import FormData
import fs from 'fs'; // Import fs to read files

const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNhaWhhcnNoMTgzQGdtYWlsLmNvbSIsImlhdCI6MTcyNDMyMjExMSwiZXhwIjoxNzI0NDA4NTExfQ.-2dPHtIJeMEdjxdJiygJMqcd9xXjjVXW1cwnQP5ZMnDYTjt_W-GXZz_P_iszdWuZ7wIkhqmLq0tz4gRxVUqRWw";

async function createFunction(fn, fileDto) {
    // Create FormData object
    // const formData = new FormData();

    // // Append functionDto as a JSON string
    // formData.append('functionDto', JSON.stringify(fn));  // Append as JSON string

    // // Add each FileDto to the formData
    // const fileDtos = [fileDto];
    // fileDtos.forEach((fileDto, index) => {
    //     formData.append(`fileDtoListWrapper[${index}].columnPrototypeId`, fileDto.columnPrototypeId);
    //     formData.append(`fileDtoListWrapper[${index}].fieldPrototypeId`, fileDto.fieldPrototypeId);
    //     formData.append(`fileDtoListWrapper[${index}].functionPrototypeId`, fileDto.functionPrototypeId);
    //     formData.append(`fileDtoListWrapper[${index}].taskPrototypeId`, fileDto.taskPrototypeId);
    //     formData.append(`fileDtoListWrapper[${index}].taskId`, fileDto.taskId);
    //     formData.append(`fileDtoListWrapper[${index}].file`, fs.createReadStream(fileDto.file));
    // });

    try {
        const response = await fetch(`http://localhost:5003/api/functions`, {
            method: "POST",
            headers: {
                'Authorization': token, // Authorization header with token
                'Content-type': "application/json"
            },
            body: JSON.stringify(fn) 
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// FunctionDto and FileDto objects
const functionDto = {
    id: null,
    functionPrototypeId: 6,
    taskId: 60,
    department: "QUOTATION",
    createdByUserId: 3,
    createdDate: new Date(),
    dueDate: new Date(),
    closedByUserId: null,
    closedDate: null,
    isClosed: false,
    fields: [
        {
            id: null,
            fieldPrototypeId: 8,
            createdByUserId: 3,
            createdDate: new Date(),
            closedByUserId: null,
            closedDate: null,
            isClosed: false,
            columns: [
                {
                    id: null,
                    columnPrototypeId: 11,
                    createdByUserId: 3,
                    fieldId: null,
                    numberValue: null,
                    textValue: "my requirement details",
                    booleanValue: null,
                    fileDirectoryPaths: null
                },
                {
                    id: null,
                    columnPrototypeId: 12,
                    createdByUserId: 3,
                    fieldId: null,
                    numberValue: null,
                    textValue: null,
                    booleanValue: null,
                    fileDirectoryPaths: null
                }
            ],
            lastEdited: new Date()
        }
    ]
}

const fileDto = {
    file: "./new-inquiry.json", // Ensure this path is correct
    columnPrototypeId: 12,
    fieldPrototypeId: 8,
    functionPrototypeId: 6,
    taskPrototypeId: 1,
    taskId: 60
}

// Call the function
createFunction(functionDto, fileDto);



