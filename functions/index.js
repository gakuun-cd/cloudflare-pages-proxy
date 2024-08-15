const addr = 'worker-us-vless.keyfromadd.workers.dev';

export async function onRequest(context) {
    const url = new URL(context.request.url);

    // 检查并处理路径
    if (url.pathname.startsWith('/')) {
        url.hostname = addr;

        // 构建新的请求对象，显式传递所有属性
        let new_request = new Request(url.toString(), {
            method: context.request.method,
            headers: context.request.headers,
            body: context.request.body,
            redirect: context.request.redirect,
        });

        try {
            // 转发请求到目标服务器
            return await fetch(new_request);
        } catch (error) {
            console.error("Error during request forwarding:", error);
            return new Response("Error during request forwarding.", { status: 502 });
        }
    }

    console.log(`[LOGGING]: Request came from ${url.hostname}`);

    // 如果路径不符合条件，返回原始请求
    return await fetch(context.request);
}
