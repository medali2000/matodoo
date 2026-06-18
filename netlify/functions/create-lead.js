// netlify/functions/create-lead.js
//
// This function runs server-side only (Netlify Functions / AWS Lambda under the hood).
// It receives the contact form data from the browser, then calls Odoo's JSON-RPC API
// using credentials stored in Netlify environment variables (never exposed to the client).
//
// Required environment variables (set in Netlify dashboard, NOT in code):
//   ODOO_URL       e.g. "https://yourcompany.odoo.com"
//   ODOO_DB        e.g. "yourcompany" (the database name, usually same as subdomain)
//   ODOO_LOGIN     the Odoo user's login (usually an email)
//   ODOO_API_KEY   the API key generated from Odoo (Settings > Users > API Keys)

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { name, phone, email, service, message } = payload;

  // Basic server-side validation (never trust client-only validation)
  if (!name || !phone || !service) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields: name, phone, service' }),
    };
  }

  const ODOO_URL = process.env.ODOO_URL;
  const ODOO_DB = process.env.ODOO_DB;
  const ODOO_LOGIN = process.env.ODOO_LOGIN;
  const ODOO_API_KEY = process.env.ODOO_API_KEY;

  if (!ODOO_URL || !ODOO_DB || !ODOO_LOGIN || !ODOO_API_KEY) {
    console.error('Missing Odoo environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server misconfiguration' }),
    };
  }

  try {
    // Step 1: Authenticate to get the uid (Odoo JSON-RPC requires this first)
    const authResponse = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'common',
          method: 'login',
          args: [ODOO_DB, ODOO_LOGIN, ODOO_API_KEY],
        },
        id: 1,
      }),
    });

    const authData = await authResponse.json();

    if (authData.error || !authData.result) {
      console.error('Odoo auth error:', authData.error);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Odoo authentication failed' }),
      };
    }

    const uid = authData.result;

    // Step 2: Create the crm.lead record
    const description = [
      message ? `Message: ${message}` : null,
      email ? `Email: ${email}` : null,
      'Source: matodoo Landing Page (React)',
    ]
      .filter(Boolean)
      .join('\n');

    const createResponse = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'object',
          method: 'execute_kw',
          args: [
            ODOO_DB,
            uid,
            ODOO_API_KEY,
            'crm.lead',
            'create',
            [
              {
                name: `${name} — ${service}`,
                contact_name: name,
                phone: phone,
                email_from: email || false,
                description: description,
                // Tag the source so you can track conversions in Odoo CRM
                // (requires a matching tag to exist, otherwise omit this line)
                // tag_ids: [[6, 0, []]],
              },
            ],
          ],
        },
        id: 2,
      }),
    });

    const createData = await createResponse.json();

    if (createData.error) {
      console.error('Odoo create error:', createData.error);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Failed to create lead in Odoo' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, leadId: createData.result }),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected server error' }),
    };
  }
};
