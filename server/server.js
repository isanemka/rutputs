import 'dotenv/config';
import http from 'node:http';
import handleKontaktRequest from '../api/kontakt-handler.js';

const port = Number(process.env.API_PORT || 3001);

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function createResponseAdapter(res) {
  return {
    status(code) {
      return {
        json(body) {
          sendJson(res, code, body);
        },
      };
    },
    json(body) {
      sendJson(res, res.statusCode || 200, body);
    },
  };
}

async function readJsonBody(req) {
  let rawBody = '';

  for await (const chunk of req) {
    rawBody += chunk;
  }

  if (!rawBody) {
    return undefined;
  }

  return JSON.parse(rawBody);
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname !== '/api/kontakt' && url.pathname !== '/api/submit-form') {
    sendJson(res, 404, { ok: false, error: 'Not found' });
    return;
  }

  try {
    const body = req.method === 'POST' ? await readJsonBody(req) : undefined;
    await handleKontaktRequest(
      {
        method: req.method,
        body,
        headers: {
          referer: req.headers.referer,
        },
      },
      createResponseAdapter(res)
    );
  } catch (error) {
    console.error('Local API server error:', error);

    if (!res.writableEnded) {
      sendJson(res, 500, { ok: false, error: 'Internal server error' });
    }
  }
});

server.listen(port, () => {
  console.log(`Local API server listening on http://localhost:${port}`);
});
