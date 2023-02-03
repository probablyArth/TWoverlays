import app from './app.js';

//@ts-ignore
import { handler } from '../build/handler.js';

const port = process.env.PORT || 5000;

app.use(handler);

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
