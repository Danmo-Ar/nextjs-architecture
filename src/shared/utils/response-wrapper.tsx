export const ResponseSend = ({
    data,
    status = 200
}: {
    data: any;
    status?: number;
}) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
