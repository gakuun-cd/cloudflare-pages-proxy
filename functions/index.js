/**
 * 反向代理 代理http  websocket
 * @param {} context 
 * @returns 
 */

const addr = 'worker-us-vless.keyfromadd.workers.dev'

export async function onRequest(context,e) {
    const url = new URL(context.request.url);


    // 指定你要代理的目标服务器

    if(url.pathname.startsWith('/')){
      url.hostname = addr;
      let new_request = new Request(url,context.request)
      return await fetch(new_request);
    }
    
    console.log(`[LOGGING FROM /hello]: Request came from ${url.hostname}`);

    // 转发请求到目标服务器并返回响应
    return await fetch(url.toString(), context.request);
  }