export const ResponseSend = ({
    data,
    status = 200,
    headers
}: {
    data: any;
    status?: number;
    headers?: HeadersInit;
}) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
};
