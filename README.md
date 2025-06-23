Cloudflare Worker: Region Router

This Cloudflare Worker accepts a `cid` (caller ID) query parameter, strips the country code, and returns a U.S. region (`west`, `east`, `north`, `south`) based on the area code.
