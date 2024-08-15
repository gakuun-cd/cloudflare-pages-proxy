export async function onRequest(request) {

    const url = new URL(request.url);

    // 指定你要代理的目标服务器
    url.hostname = "blog.acorn.eu.org";

    // 可以根据需要修改请求头或添加其他逻辑
    // request.headers.set('X-Forwarded-For', 'your-custom-header');

    // 转发请求到目标服务器并返回响应
    return await fetch(url.toString(), request);
  }

