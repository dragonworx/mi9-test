# Ali Chamas MI9 Test 2015

Hi, This is the MI9 test submission of Ali Chamas for Sep 2015.

### Application Summary

This is a simple express.js application which provides a single service endpoint `/` on port 80.

- This service will accept a `POST` request with JSON body containing a list of shows.
- From the list of shows in the request payload, the service returns the ones with DRM enabled `(drm: true)` and at least one episode (`episodeCount > 0`).
    - The service uses the [jsel](https://github.com/dragonworx/jsel) npm library *(also written by this author)* to use a simple xpath expression `//payload/*[@drm and @episodeCount > 0]` to select the required data.
- The service then returns the response containing the (re-mapped) required objects.

### Browser Testing

Simply visit *<scheme:host:port>*`/test` in the browser to invoke a lightweight (no extra heavy testing frameworks needed) harness page which will `POST` to the `/` service and show success or errors.

##### Testing JSON Parse Errors

If you would like to test sending invalid JSON, just add the `error=true` querystring parameter, for example *<scheme:host:port>*`/test?error=true`. This will return the required error JSON with a `500` status.