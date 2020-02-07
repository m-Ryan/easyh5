import { Sketch } from '@/sketch';

import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-body';

const app = new koa();
const router = new koaRouter();

app.use(koaBody({ multipart: true }));

router.post('/sketch-json', async(ctx) => {
  if (!ctx.request.files) {
    return ctx.body = '文件格式不对';
  }
  const file = ctx.request.files.file as any as File;
  const sketch = await new Sketch(file);
  const json = await sketch.parseData();
  return ctx.body = json[0];
});
app.use(router.routes());

app.listen(6566, ()=> {
  console.log('success');
})
