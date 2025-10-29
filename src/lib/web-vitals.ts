import type { Metric } from 'web-vitals';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Web Vitals tracking and reporting utility
 * 
 * This module tracks Core Web Vitals including:
 * - CLS (Cumulative Layout Shift)
 * - LCP (Largest Contentful Paint)
 * - INP (Interaction to Next Paint) - Replaces FID
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */

interface WebVitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Sends metric to console and can be extended to send to analytics
 */
function sendToAnalytics(metric: Metric) {
  const body: WebVitalsReport = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  // Log to console for development
  const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
  console.log(`${emoji} ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  });

  // Special handling for CLS to provide detailed feedback
  if (metric.name === 'CLS') {
    if (metric.rating === 'poor') {
      console.warn(
        `⚠️ High CLS detected (${metric.value.toFixed(3)})! This may cause poor user experience.`,
        '\nPossible causes:',
        '\n- Images without dimensions',
        '\n- Dynamic content insertion',
        '\n- Web fonts causing FOIT/FOUT',
        '\n- Ads or embeds',
      );
    } else if (metric.rating === 'needs-improvement') {
      console.log(
        `⚠️ CLS needs improvement (${metric.value.toFixed(3)})`,
        '\nConsider optimizing image sizes and dynamic content loading.',
      );
    } else {
      console.log(`✅ Excellent CLS score (${metric.value.toFixed(3)})!`);
    }
  }

  // Special handling for LCP to provide detailed feedback
  if (metric.name === 'LCP') {
    const lcpTime = metric.value;
    if (metric.rating === 'poor') {
      console.warn(
        `❌ Poor LCP (${lcpTime.toFixed(0)}ms)! Target: < 2500ms`,
        '\nPossible causes:',
        '\n- Slow server response time',
        '\n- Large images without optimization',
        '\n- Render-blocking JavaScript/CSS',
        '\n- Client-side rendering delay',
        '\n- Unoptimized web fonts',
      );
    } else if (metric.rating === 'needs-improvement') {
      console.warn(
        `⚠️ LCP needs improvement (${lcpTime.toFixed(0)}ms). Target: < 2500ms, Good: < 1200ms`,
        '\nConsider:',
        '\n- Optimizing/compressing images',
        '\n- Using CDN for static assets',
        '\n- Implementing lazy loading',
        '\n- Reducing JavaScript bundle size',
        '\n- Preloading critical resources',
      );
    } else {
      console.log(`✅ Excellent LCP score (${lcpTime.toFixed(0)}ms)!`);
    }
  }

  // Special handling for INP to provide detailed feedback
  if (metric.name === 'INP') {
    const inpTime = metric.value;
    if (metric.rating === 'poor') {
      console.warn(
        `❌ Poor INP (${inpTime.toFixed(0)}ms)! Target: < 200ms`,
        '\nPossible causes:',
        '\n- Long JavaScript tasks blocking the main thread',
        '\n- Heavy event handlers',
        '\n- Large DOM updates',
      );
    } else if (metric.rating === 'needs-improvement') {
      console.warn(
        `⚠️ INP needs improvement (${inpTime.toFixed(0)}ms). Target: < 200ms`,
        '\nConsider optimizing JavaScript execution and event handlers.',
      );
    } else {
      console.log(`✅ Excellent INP score (${inpTime.toFixed(0)}ms)!`);
    }
  }

  // TODO: Send to your analytics service
  // Example: Google Analytics 4
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_category: 'Web Vitals',
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }

  // Example: Custom analytics endpoint
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon('/api/analytics', JSON.stringify(body));
  // }
}

/**
 * Report LCP element details for debugging
 * This provides detailed information about the largest contentful paint element
 */
export function reportLCPAttribution() {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;

    if (lastEntry) {
      console.log('🎯 LCP Element detected:', {
        renderTime: lastEntry.renderTime?.toFixed(0) + 'ms' || 'N/A',
        loadTime: lastEntry.loadTime?.toFixed(0) + 'ms' || 'N/A',
        size: lastEntry.size,
        element: lastEntry.element,
        url: lastEntry.url || 'N/A',
        elementInfo: lastEntry.element ? {
          tagName: lastEntry.element.tagName,
          id: lastEntry.element.id || '(no id)',
          className: lastEntry.element.className || '(no class)',
          src: (lastEntry.element as HTMLImageElement).src || 'N/A',
          currentSrc: (lastEntry.element as HTMLImageElement).currentSrc || 'N/A',
        } : 'Element no longer available',
      });

      // Highlight LCP element
      if (lastEntry.element instanceof HTMLElement) {
        const element = lastEntry.element;
        const originalOutline = element.style.outline;
        element.style.outline = '3px solid blue';
        console.log('🎯 LCP element highlighted in blue for 3 seconds');
        setTimeout(() => {
          element.style.outline = originalOutline;
        }, 3000);
      }
    }
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });

  return () => observer.disconnect();
}

/**
 * Initialize Web Vitals tracking
 * Call this function once when your app loads
 */
export function initWebVitals() {
  // Track all Core Web Vitals
  onCLS(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  console.log('📊 Web Vitals tracking initialized');
}

/**
 * Report CLS attribution for debugging
 * This provides detailed information about what caused layout shifts
 */
export function reportCLSAttribution() {
  if (typeof window === 'undefined') return;

  let clsValue = 0;
  const entries: LayoutShift[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as LayoutShift[]) {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        entries.push(entry);

        console.log('📐 Layout Shift detected:', {
          value: entry.value.toFixed(3),
          cumulativeValue: clsValue.toFixed(3),
          time: entry.startTime.toFixed(0) + 'ms',
          sources: entry.sources?.map((source) => ({
            node: source.node,
            previousRect: source.previousRect,
            currentRect: source.currentRect,
          })),
        });

        // Highlight the element that shifted (development only)
        if (entry.sources && entry.sources.length > 0) {
          entry.sources.forEach((source) => {
            if (source.node) {
              const node = source.node;
              
              // Handle both Element and Text nodes
              let element: HTMLElement | null = null;
              if (node.nodeType === Node.ELEMENT_NODE) {
                element = node as HTMLElement;
              } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
                // If it's a text node, use its parent element
                element = node.parentElement;
              }
              
              if (element) {
                const parent = element.parentElement;
                const computedStyle = window.getComputedStyle(element);
                
                console.log('Element that shifted:', {
                  nodeType: node.nodeType === Node.TEXT_NODE ? 'Text Node' : 'Element',
                  tagName: element.tagName,
                  id: element.id || '(no id)',
                  className: element.className || '(no class)',
                  textContent: node.textContent?.substring(0, 50) || '(no text)',
                  parent: parent ? {
                    tagName: parent.tagName,
                    id: parent.id || '(no id)',
                    className: parent.className || '(no class)',
                  } : null,
                  dimensions: {
                    width: computedStyle.width,
                    height: computedStyle.height,
                  },
                  position: computedStyle.position,
                  shiftAmount: `${(source.currentRect.top - source.previousRect.top).toFixed(1)}px vertical, ${(source.currentRect.left - source.previousRect.left).toFixed(1)}px horizontal`,
                });
                
                // Temporarily highlight the element in the page
                const originalOutline = element.style.outline;
                const originalBackground = element.style.backgroundColor;
                element.style.outline = '3px solid red';
                element.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                setTimeout(() => {
                  element.style.outline = originalOutline;
                  element.style.backgroundColor = originalBackground;
                }, 2000);
              }
            }
          });
        }
      }
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  return () => observer.disconnect();
}

// TypeScript interface for Layout Shift entries
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  sources?: Array<{
    node?: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
}
