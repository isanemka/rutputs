import 'dotenv/config';
import http from 'node:http';
import handleAvailabilityRequest from '../api/availability-handler.js';
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

  try {
    return JSON.parse(rawBody);
  } catch {
    const error = new Error('Invalid JSON body');
    error.statusCode = 400;
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  try {
    if (url.pathname === '/api/availability') {
      await handleAvailabilityRequest(
        {
          method: req.method,
        },
        createResponseAdapter(res)
      );

      return;
    }

    if (url.pathname !== '/api/kontakt' && url.pathname !== '/api/submit-form') {
      sendJson(res, 404, { ok: false, error: 'Not found' });
      return;
    }

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
    if (error instanceof Error && error.statusCode === 400) {
      sendJson(res, 400, { ok: false, error: 'Ogiltig JSON' });
      return;
    }

    console.error('Local API server error:', error);

    if (!res.writableEnded) {
      sendJson(res, 500, { ok: false, error: 'Internal server error' });
    }
  }
});

server.listen(port, () => {
  console.log(`Local API server listening on http://localhost:${port}`);
});
