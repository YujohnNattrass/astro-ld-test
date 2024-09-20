import { init } from 'yj-test-ld-blob';
const rewrite = async (request, context) => {
    const clientSideId = Netlify.env.get('CLIENT_SIDE_ID');
    console.log(`CLIENT_SIDE_ID: ${clientSideId}`);
    const client = init(clientSideId);
    const context = {
        kind: 'random-user',
        key: 'random-user-key',
        name: 'Joe'
    };
    const val = await client.variation('test-blob', context, false);
    const path = val ? '/launchdarkly/test1' : '/launchdarkly/test2';
    return new URL(path, request.url);
};

export const config = {
    path: '/launchdarkly'
};

export default rewrite;
