import newInquiryData from './new-inquiry.json' assert { type: 'json' };
import serviceData from './service-task.json' assert { type: 'json' };
import combinedTask from './combined-task.json' assert { type: 'json' };
import fetch from 'node-fetch';

const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNhaWhhcnNoMTgzQGdtYWlsLmNvbSIsImlhdCI6MTcyNTUzMDIxMiwiZXhwIjoxNzI1NjE2NjEyfQ.9qkNC8JcmT8LxbePtDuO_yScLFitSp973kzhRtKgnHtJaUVJ5_VrTm21PUo211mS4x5EXpOQDCUy8wMYJrX7dw";

const createColumnPrototype = async (columnPrototype) => {
    console.log(columnPrototype);
    try {
        const response = await fetch('http://localhost:5003/api/column-prototypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(columnPrototype),
        });

        if (response.ok) {
            console.log('Added column!');
        }
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log('Error:', error);
    }
};

const createFieldPrototype = async (fieldPrototype) => {
    try {
        const response = await fetch('http://localhost:5003/api/field-prototypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fieldPrototype),
        });

        if (response.ok) {
            console.log('Added field!');
        }

        console.log(await response.json());
    } catch (error) {
        console.log('Error:', error);
    }
};

const createFunctionPrototype = async (functionPrototype) => {
    try {
        const response = await fetch('http://localhost:5003/api/function-prototypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(functionPrototype),
        });

        if (response.ok) {
            console.log('Added function!');
        }

        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
};

const createTaskPrototype = async (taskPrototype) => {
    try {
        const response = await fetch('http://13.235.168.107:5005/api/task-prototypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(taskPrototype),
        });

        if (response.ok) {
            console.log('Added task!');
        }

        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
};

(async () => {
    // const dataArr = newInquiryData;
    const dataArr = serviceData;
    // const dataArr = combinedTask;
    console.log(dataArr.functionPrototypes.length);

    // Create task
    await createTaskPrototype(dataArr);

    console.log('\n\nDone...!');
})();
