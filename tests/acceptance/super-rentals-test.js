import { assert, module, test } from 'qunit';
import { click, visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('[data-test-nav-bar-index-link]').hasText('SuperRentals');
    assert.dom('[data-test-title]').hasText('Welcome to super Rentals!');

    assert.dom('[data-test-about-link]').hasText('About Us');
    await click('[data-test-about-link]');

    assert.equal(currentURL(), '/about');
  });

  test('visiting /about', async function (hooks) {
    await visit('/about');

    assert.equal(currentURL(), '/about');
    assert.dom('nav').exists();
    assert.dom('[data-test-nav-bar-index-link]').hasText('SuperRentals');
    assert.dom('[data-test-title]').hasText('About Super Rentals');

    assert.dom('[data-test-contact-link]').hasText('Contact Us');
    await click('[data-test-contact-link]');

    assert.equal(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (hooks) {
    await visit('/getting-in-touch');

    assert.equal(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists();
    assert.dom('[data-test-nav-bar-index-link]').hasText('SuperRentals');
    assert.dom('[data-test-title]').hasText('Contact Us');

    assert.dom('[data-test-about-link]').hasText('About');
    await click('[data-test-about-link]');

    assert.equal(currentURL(), '/about');
  });

  test('navigating using the ak-nav-bar component', async function (hooks) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('[data-test-nav-bar-index-link]').hasText('SuperRentals');
    assert.dom('[data-test-nav-bar-about-link]').hasText('About');
    assert.dom('[data-test-nav-bar-contact-link]').hasText('Contact');

    await click('[data-test-nav-bar-index-link]');
    assert.equal(currentURL(), '/');

    await click('[data-test-nav-bar-about-link]');
    assert.equal(currentURL(), '/about');

    await click('[data-test-nav-bar-contact-link]');
    assert.equal(currentURL(), '/getting-in-touch');
  });

  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.rental').exists({ count: 3 });

    await click('.rental:first-of-type a');
    assert.equal(currentURL(), '/rentals/grand-old-mansion');
  });

  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit('/rentals/grand-old-mansion');

    assert.equal(currentURL(), '/rentals/grand-old-mansion');
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SuperRentals');
    assert.dom('h2').containsText('Grand Old Mansion');
    assert.dom('.rental.detailed').exists();
    assert.dom('.share.button').hasText('Share on Twitter');

    const button = find('.share.button');

    const tweetURL = new URL(button.href);
    assert.equal(tweetURL.host, 'twitter.com');

    assert.equal(
      tweetURL.searchParams.get('url'),
      `${window.location.origin}/rentals/grand-old-mansion`
    );
  });
});
