const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Content-Type": "application/json"
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("", { headers });
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const env = process.env;

  const supabaseUrl = env.SUPABASE_URL;
  const secret = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secret) {
    return new Response(JSON.stringify({
      error: "Database configuration missing"
    }), { status: 500, headers });
  }

  const db = async (endpoint, options = {}) => {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${endpoint}`,
      {
        ...options,
        headers: {
          apikey: secret,
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
          ...options.headers
        }
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) throw new Error(data.message || "Database error");
    return data;
  };

  try {
    if (path.endsWith("/login") && request.method === "POST") {
      const body = await request.json();

      if (body.password !== env.ADMIN_PASSWORD) {
        return new Response(JSON.stringify({
          error: "Wrong password"
        }), { status: 401, headers });
      }

      return new Response(JSON.stringify({
        success: true
      }), { headers });
    }

    if (path.endsWith("/users") && request.method === "GET") {
      const users = await db("digital_users?select=*&order=created_at.desc");
      return new Response(JSON.stringify(users), { headers });
    }

    if (path.endsWith("/users") && request.method === "POST") {
      const body = await request.json();

      const user = {
        id: body.id || crypto.randomUUID(),
        name: body.name || "New User",
        phone: body.phone || "",
        address: body.address || "",
        age: body.age || "",
        profession: body.profession || "",
        relationship: body.relationship || "",
        photo: body.photo || "",
        color: body.color || "#D4AF37",
        socials: body.socials || {},
        is_active: true
      };

      const result = await db("digital_users", {
        method: "POST",
        body: JSON.stringify(user)
      });

      return new Response(JSON.stringify(result), { headers });
    }

    const publicMatch = path.match(/\/public\/([^/]+)$/);

    if (publicMatch && request.method === "GET") {
      const id = encodeURIComponent(publicMatch[1]);
      const users = await db(
        `digital_users?id=eq.${id}&is_active=eq.true&select=*`
      );

      return new Response(JSON.stringify(users[0] || null), {
        status: users.length ? 200 : 404,
        headers
      });
    }

    return new Response(JSON.stringify({
      error: "Not found"
    }), { status: 404, headers });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), { status: 500, headers });
  }
};
