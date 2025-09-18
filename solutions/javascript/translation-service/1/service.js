/// <reference path="./global.d.ts" />
// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.

export class TranslationService {
  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text) {
    return this.api.fetch(text).then((result) => result.translation);
  }

  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
  batch(texts) {
    if (texts.length === 0) {
      return Promise.reject(new BatchIsEmpty());
    } else {
      return Promise.all(texts.map((text) => this.free(text)));
    }
  }

  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  request(text) {
    return this.api
      .fetch(text)
      .then(() => {
        return;
      })
      .catch((err) => {
        if (err.constructor.name === "NotAvailable") {
          return new Promise((resolve, reject) => {
            let attempts = 0;
            const tryOnce = () => {
              attempts += 1;
              try {
                this.api.request(text, (cbErr) => {
                  if (!cbErr) {
                    resolve();
                  } else {
                    if (attempts >= 3) {
                      reject(cbErr);
                    } else {
                      tryOnce();
                    }
                  }
                });
              } catch (e) {
                if (attempts >= 3) {
                  reject(e);
                } else {
                  tryOnce();
                }
              }
            };
            tryOnce();
          });
        }
        if (err.constructor === "Untranslatable") {
          throw err;
        }
        throw err;
      });
  }

  /**
   * Retrieves the translation for the given text
   *
   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
  premium(text, minimumQuality) {
    const checkQuality = ({ translation, quality }) => {
      if (quality >= minimumQuality) return translation;
      throw new QualityThresholdNotMet(text);
    };

    return this.api
      .fetch(text)
      .then(checkQuality)
      .catch((err) => {
        if (err.constructor.name === "NotAvailable") {
          // Demander la traduction, puis refetch et recheck la qualité
          return this.request(text)
            .then(() => this.api.fetch(text))
            .then(checkQuality);
        }
        // Untranslatable ou autre → on relaye l’erreur
        throw err;
      });
  }
}

/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
export class QualityThresholdNotMet extends Error {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(
      `
The translation of ${text} does not meet the requested quality threshold.
    `.trim(),
    );

    this.text = text;
  }
}

/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `
Requested a batch translation, but there are no texts in the batch.
    `.trim(),
    );
  }
}
