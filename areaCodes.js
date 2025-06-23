export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cidParam = url.searchParams.get("cid");

    if (!cidParam) {
      return new Response('{"error":"Missing cid"}', {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }

    // LOG for debugging
    console.log("Raw CID:", cidParam);

    // Account for leading + and/or 1
    const cleaned = cidParam.trim().replace(/^(\+?1|\s1)/, '');
    console.log("Cleaned CID:", cleaned);

    if (cleaned.length < 10) {
      return new Response('{"error":"Invalid CID"}', {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }

    const area = cleaned.substring(0, 3);
    let region = "unknown";

    // Check area code for region
    const west = ["520", "480", "602", "213", "310"];
    const east = ["212", "646", "718", "703"];
    const south = ["305", "404", "214", "470"];
    const north = ["206", "312", "617", "414", "217"];

    if (west.includes(area)) region = "west";
    else if (east.includes(area)) region = "east";
    else if (south.includes(area)) region = "south";
    else if (north.includes(area)) region = "north";

    // Return region
    return new Response(`{"region":"${region}"}`, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
