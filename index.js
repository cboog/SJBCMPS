export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Get events from the database
        if (url.pathname === "/events" && request.method === "GET") {
            const { results } = await env.DB.prepare("SELECT * FROM events").all(); // Fetch all events
            return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
        }

        // Add new event to the database
        if (url.pathname === "/addevent" && request.method === "POST") {
            const data = await request.json();
            const { title, description, location, time } = data;

            // Insert event into database (storing title, description, location, and time)
            await env.DB.prepare("INSERT INTO events (title, description, location, time) VALUES (?, ?, ?, ?)")
                .bind(title, description, location, time)
                .run();

            return new Response("Event added", { status: 201 });
        }

        // Return a 404 response if no matching route
        return new Response("Not Found", { status: 404 });
    }
};
