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

const correctBody = (body: unknown) => {
    if (typeof body !== 'object' || body === null) {
        return false;
    }
    const data = body as {
        username?: unknown;
        age?: unknown;
        hobbies?: unknown;
    };
    if (!data.username || !data.age || !data.hobbies || Object.keys(body as object).length > 3) {
        return false;
    }
    if (
        typeof data.username !== 'string' ||
        typeof data.age !== 'number' ||
        !Array.isArray(data.hobbies)
    ) {
        return false;
    }
    for (const hobby of data.hobbies) {
        if (typeof hobby !== 'string') {
            return false;
        }
    }
    return true;
};

export { correctURL, correctBody };
