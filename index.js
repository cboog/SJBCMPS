export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/events" && request.method === "GET") {
            const keys = await env.EVENTS.list();
            const events = [];
            for (const key of keys.keys) {
                const event = await env.EVENTS.get(key.name);
                if (event) {
                    events.push(JSON.parse(event));
                }
            }
            return new Response(JSON.stringify(events), { headers: { "Content-Type": "application/json" } });
        }

        if (url.pathname === "/addevent" && request.method === "POST") {
            const data = await request.json();
            const { location, eventName, eventHour, eventMinute, eventPeriod } = data;
            const eventKey = `${Date.now()}-${location}`; // Unique key
            const event = {
                location,
                eventName,
                eventHour,
                eventMinute,
                eventPeriod,
                key: eventKey,
            };
            await env.EVENTS.put(eventKey, JSON.stringify(event));
            return new Response("Event added", { status: 201 });
        }

        return new Response("Not Found", { status: 404 });
    }
};
