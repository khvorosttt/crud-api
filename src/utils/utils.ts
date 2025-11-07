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
    console.log(data);
    if (!data.username || !data.age || !data.hobbies) {
        return false;
    }
    if (
        typeof data.username !== 'string' ||
        typeof data.age !== 'number' ||
        !Array.isArray(data.hobbies)
    ) {
        return false;
    }
    for (const hobby in data.hobbies) {
        if (typeof hobby !== 'string') {
            return false;
        }
    }
    return true;
};

export { correctURL, correctBody };
