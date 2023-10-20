# Web Performance / Todd Gardner, TrackJS / Mitte August, 23'

- [Web Performance / Todd Gardner, TrackJS / Mitte August, 23'](#web-performance--todd-gardner-trackjs--mitte-august-23)
  - [Takeaways](#takeaways)
  - [Web Vitals](#web-vitals)
  - [Performance API -\> window.performance](#performance-api---windowperformance)
    - [performance.getEntries(), performance.getEntriesByType(), performance.getEntriesByName()](#performancegetentries-performancegetentriesbytype-performancegetentriesbyname)
    - [Performance Observer](#performance-observer)
  - [Performance Observer Code (nur zu einfachen Testzwecken)](#performance-observer-code-nur-zu-einfachen-testzwecken)
  - [2nd Version Performance Logging](#2nd-version-performance-logging)

## Takeaways

+ Google ranked Websites runter, wenn die Performance und Responsivenes niedrig (schlecht) ist
+ web.dev - Infos über Web-Vitals
+ crux-compare.netlify.app - Real World Performance von Websites -> p75 bedeutet 75% der User hatten folgende Performance. p95 zielt auf die Erfahrung ab, die fast alle User hatten, möglicherweiße interessanter
+ lcp reduzieren:
	+ Skripte ganz unten im HTML + defer
	+ Content, vor allem Images und fetches, erst dann laden wenn es nötig wird
	+ `<img src=".." srcset="..." sizes="...">` nutzen um richtige Image-Größen nutzen
	+ Image optimizer nutzen um die Images zu verkleinern
	+ http2 kann Verbindungen wiederverwenden und reduziert overhead
	+ Preloading
		+ `<link rel="preconnect" href="https://..">` -> Browser soll Connection zu Seite aufmachen denn sie wird irgendwann nötig um etwas zu lassen (zb.: Google Fonts)
		+ `<link rel="preload" href"/icons.css">` Browser soll diese Ressource laden, auch wenn sie erst später benötigt wird



## Web Vitals

+ fcp - First Contentful Paint ist die Zeit bis der User sieht, dass die Seite ladet
+ lcp -Largest Contentful Paint ist die Zeit bis der User "denkt", dass die Seite fertig geladen ist
+ fls - Full Layout Shift ist die Distanz in derer während der gesamten Lebenszeit des Dokuments Elemente verschoben werden -> Infinite scroll, asynchrones Laden, Klickevents die die Seite so umbauen als ob es eine neue Seite wäre oder Images erhöhen den fls. Tipp: Don't move things (wenn sie bereits gezeichnete wurden)

## Performance API -> window.performance

### performance.getEntries(), performance.getEntriesByType(), performance.getEntriesByName()

Geben eine Liste zurück, wie lange das onLoad Event dauerte.

### Performance Observer

Mit dem Observer kann man Optionen der oder die gesamte Liste für Events bekommen, bei denen man den genauen Zeitpunkt nicht kennt, an dem es geladen wird`:
```
new PerformanceObserver(
	(entryList) => {
		var entries = entryList.getEntries();
	}
).observe(opts);
```





## Performance Observer Code (nur zu einfachen Testzwecken)

```
(() => {

  const payload = {
    url: window.location.href,
    dcl: 0,
    load: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0
  }

  // Navigation Performance Timings
  onDocumentReady(() => {
    setTimeout(() => { // "load" isn't done until the next cycle
      let navEntry = performance.getEntriesByType("navigation")[0];
      payload.dcl = navEntry.domContentLoadedEventStart;
      payload.load = navEntry.loadEventStart;
      console.log('Navigation Performance Timing', navEntry);
    }, 0);
  });

  // First Contentful Paint
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (entry.name === "first-contentful-paint") {
        payload.fcp = entry.startTime;
        console.log(`FCP: ${payload.fcp}`);
      }
    });
  }).observe({ type: "paint", buffered: true });

  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (entry.startTime > payload.lcp) {
        payload.lcp = entry.startTime;
        console.log(`LCP: ${payload.lcp}`);
      }
    });
  }).observe({ type: "largest-contentful-paint", buffered: true });

  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        payload.cls += entry.value;
        console.log(`CLS: ${payload.cls}`);
      }
    });
  }).observe({ type: "layout-shift", buffered: true });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      payload.fid = entry.processingStart - entry.startTime;
      console.log(`FID: ${payload.fid}`);
    });
  }).observe({ type: "first-input", buffered: true });


  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'hidden') {
      let data = JSON.stringify(payload);
      navigator.sendBeacon("/api/perf", data);
      console.log("Sending performance:", data);
    }
  });

})();



// Utility functions to make example easier to understand.
function onDocumentReady(onReady) {
  if (document.readyState === "complete") { onReady(); }
  else {
    document.addEventListener('readystatechange', (event) => {
      if (document.readyState === "complete") { onReady(); }
    });
  }
}
```





## 2nd Version Performance Logging

```
(() => {

  let isLoggingEnabled = false;
  let isFileLoggingEnabled = false;
  const logData = [];

  const payload = {
    url: window.location.href,
    dcl: 0,
    load: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0
  }

  // Utility function to check if the document is fully loaded
  function onDocumentReady(onReady) {
    if (document.readyState === "complete") { onReady(); }
    else {
      document.addEventListener('readystatechange', (event) => {
        if (document.readyState === "complete") { onReady(); }
      });
    }
  }

  // Toggle logging
  function toggleLogging() {
    isLoggingEnabled = !isLoggingEnabled;
    const logButton = document.getElementById("logButton");
    logButton.textContent = `Logging ${isLoggingEnabled ? 'ON' : 'OFF'}`;
  }

  // Toggle file logging
  function toggleFileLogging() {
    isFileLoggingEnabled = !isFileLoggingEnabled;
    const fileButton = document.getElementById("fileButton");
    fileButton.textContent = `File ${isFileLoggingEnabled ? 'ON' : 'OFF'}`;
  }

  // Navigation Performance Timings
  onDocumentReady(() => {
    setTimeout(() => { // "load" isn't done until the next cycle
      try {
        let navEntry = performance.getEntriesByType("navigation")[0];
        if (navEntry) {
          payload.dcl = navEntry.domContentLoadedEventStart;
          payload.load = navEntry.loadEventStart;
        }
      } catch (error) {
        console.error("Error fetching navigation timings:", error);
      }
    }, 0);
  });

  // First Contentful Paint
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (entry.name === "first-contentful-paint") {
        payload.fcp = entry.startTime;
        console.log(`FCP: ${payload.fcp}`);
        if (isLoggingEnabled) {
          logData.push(`FCP: ${payload.fcp}`);
        }
      }
    });
  }).observe({ type: "paint", buffered: true });

  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (entry.startTime > payload.lcp) {
        payload.lcp = entry.startTime;
        console.log(`LCP: ${payload.lcp}`);
        if (isLoggingEnabled) {
          logData.push(`LCP: ${payload.lcp}`);
        }
      }
    });
  }).observe({ type: "largest-contentful-paint", buffered: true });

  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        payload.cls += entry.value;
        console.log(`CLS: ${payload.cls}`);
        if (isLoggingEnabled) {
          logData.push(`CLS: ${payload.cls}`);
        }
      }
    });
  }).observe({ type: "layout-shift", buffered: true });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries() || [];
    entries.forEach((entry) => {
      payload.fid = entry.processingStart - entry.startTime;
      console.log(`FID: ${payload.fid}`);
      if (isLoggingEnabled) {
        logData.push(`FID: ${payload.fid}`);
      }
    });
  }).observe({ type: "first-input", buffered: true });

  // Send performance data when the page is hidden
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'hidden') {
      try {
        let data = JSON.stringify(payload);
        navigator.sendBeacon("/api/perf", data);
        console.log("Sending performance data:", data);
        if (isFileLoggingEnabled) {
          logData.push(data);
        }
      } catch (error) {
        console.error("Error sending performance data:", error);
      }
    }
  });

  // Add buttons for toggling logging
  const logButton = document.createElement("button");
  logButton.id = "logButton";
  logButton.textContent = `Logging ${isLoggingEnabled ? 'ON' : 'OFF'}`;
  logButton.addEventListener("click", toggleLogging);
  document.body.appendChild(logButton);

  // Add button for toggling file logging
  const fileButton = document.createElement("button");
  fileButton.id = "fileButton";
  fileButton.textContent = `File ${isFileLoggingEnabled ? 'ON' : 'OFF'}`;
  fileButton.addEventListener("click", toggleFileLogging);
 
```

