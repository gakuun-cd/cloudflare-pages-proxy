const addr = 'worker-us-vless.keyfromadd.workers.dev';

export async function onRequest(context) {
    const request = context.request;
    const url = new URL(request.url);

    //return new Response(JSON.stringify(context.params.catchall))

    // 打印原始请求的 URL 和查询参数
    console.log(`Original URL: ${url.href}`);
    console.log(`Query Parameters: ${url.searchParams.toString()}`);
    console.log(`Original Pathname: ${url.pathname}`);

    // 检查并处理路径
    if (url.pathname.startsWith('/')) {
        // 修改请求的目标主机名
        url.hostname = addr;

        // 构建新的请求对象
        const newRequest = new Request(url.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.method === 'POST' || request.method === 'PUT' ? request.body : null, // 仅在 POST 或 PUT 请求中有 body
            redirect: request.redirect,
        });

        console.log(`Forwarded URL: ${newRequest.url}`);

        try {
            // 转发请求到目标服务器
            return await fetch(newRequest);
        } catch (error) {
            console.error("Error during request forwarding:", error);
            return new Response("Error during request forwarding.", { status: 502 });
        }
    }

    // 如果路径不符合条件，返回原始请求
    return await fetch(request);
}
