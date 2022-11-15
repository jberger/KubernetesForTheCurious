import mojo from '@mojojs/core';
import Path from '@mojojs/path';

const app = mojo();

app.get('/', async ctx => {
  await ctx.sendFile(ctx.home.child('index.html'));
});

app.start();
