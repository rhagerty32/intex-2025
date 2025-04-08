export const fetchData = async ({ url }: { url: string }) => {
    console.log(`Fetching data from ${url}`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    };

    return response.json();
};

export const postData = async ({ url, body }: { url: string, body: Object }) => {
    console.log(`Posting data to ${url}`);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    };

    return response.json();
};

export const deleteData = async ({ url }: { url: string }) => {
    console.log(`Deleting data from ${url}`);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    };

    return response.json();
};