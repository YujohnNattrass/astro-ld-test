import { init } from '@netlify/launchdarkly-server-sdk';

const rewrite = async (request, context) => {
    const ldClientSideID = Netlify.env.get(`LD_CLIENT_SIDE_ID`);
    const client = init(ldClientSideID);
    await client.waitForInitialization();

    const val = await client.variation('yj-test', { kind: 'user', key: 'yj-is-testing' }, false);
    console.log(`this is the value: ${val}`);
    const path = val ? '/launchdarkly/test1' : '/launchdarkly/test2';
    return new URL(path, request.url);
};

export const config = {
    path: '/launchdarkly'
};

export default rewrite;
