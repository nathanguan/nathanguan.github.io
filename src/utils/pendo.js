// Sends a Pendo Track Event without ever breaking the app.
//
// window.pendo is undefined when the snippet in public/index.html is skipped
// (?disablePendo=true), and that snippet doesn't stub `track`, so pendo.track()
// only exists once the agent has loaded. Earlier calls are pushed onto the
// snippet's `_q` queue (what the standard snippet's `track` stub does) and the
// agent replays them when it initializes.
export const trackPendoEvent = (eventName, properties) => {
  try {
    const pendo = window.pendo;

    if (!pendo) {
      return;
    }

    if (typeof pendo.track === 'function') {
      pendo.track(eventName, properties);
    } else if (Array.isArray(pendo._q)) {
      pendo._q.push(['track', eventName, properties]);
    }
  } catch (error) {
    // Tracking failures must not affect the user
  }
};

// The RestDB fetch thunks swallow their errors, which leaves the page on an
// endless spinner, so report the failure. `recordId` is only passed for a
// details page.
export const trackRecordDataLoadFailed = (err, resource, recordId) => {
  trackPendoEvent('Record Data Load Failed', {
    resource,
    record_id: recordId,
    status_code: err?.response?.status,
    error_message: err?.message ? String(err.message).slice(0, 100) : undefined,
  });
};
