export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === "/events" && request.method === "GET") {
            const { results } = await env.DB.prepare("SELECT * FROM events").all();
            return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
        }
        if (url.pathname === "/addevent" && request.method === "POST") {
            const data = await request.json();
            await env.DB.prepare("INSERT INTO events (title, description, location, time) VALUES (?, ?, ?, ?)")
                .bind(data.title, data.description, data.location, data.time)
                .run();
            return new Response("Event added", { status: 201 });
        }
        return new Response("Not Found", { status: 404 });
    }
};
