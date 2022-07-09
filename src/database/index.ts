import { createConnection } from 'typeorm';

createConnection('default')
  .then(() => {
    console.log('✔️ [CONNECTED]: Default database connected successfully.');
  })
  .catch((err) => console.log(`❌ [ERROR]: Database error: ${err}`));
