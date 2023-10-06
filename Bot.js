const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json';

let sessionData;

// إذا كان لدينا ملف جلسة، استخدمه
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionData });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('Authenticated');
  // حفظ معلومات الجلسة في ملف JSON
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
});

client.on('message', (msg) => {
  console.log('Received message:', msg.body);

  // مثال على الرد على رسالة معينة
  if (msg.body === 'Hello') {
    client.sendMessage(msg.from, 'Hi there!');
  }
});

client.initialize();
