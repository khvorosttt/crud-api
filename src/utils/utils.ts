import 'dotenv/config';

const correctURL = (url: string) => {
    const urlSplit = url.split('/').slice(1);
    if (
        url.startsWith(process.env.BASE_ENDPOINT as string) &&
        (urlSplit.length === 2 || urlSplit.length === 3)
    ) {
        return true;
    } else {
        return false;
    }
};

export { correctURL };
