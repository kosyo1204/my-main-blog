/**
 * analytics.js
 *
 * Purpose: Provide GA4 configuration to templates
 *
 * This file reads the GA4_MEASUREMENT_ID from environment variables
 * and makes it available to Nunjucks templates.
 *
 * Usage in templates:
 *   {% if analytics.ga4MeasurementId %}
 *     {{ analytics.ga4MeasurementId }}
 *   {% endif %}
 *
 * Environment Variables:
 *   GA4_MEASUREMENT_ID: Your Google Analytics 4 measurement ID (e.g., G-XXXXXXXXXX)
 */

module.exports = {
  /**
   * GA4 Measurement ID
   * Read from environment variable GA4_MEASUREMENT_ID
   *
   * If not set, GA4 tracking will be disabled
   */
  ga4MeasurementId: process.env.GA4_MEASUREMENT_ID || null,

  /**
   * Derived: Whether GA4 should be enabled
   */
  isGa4Enabled:
    !!process.env.GA4_MEASUREMENT_ID && process.env.GA4_MEASUREMENT_ID !== "",
};
