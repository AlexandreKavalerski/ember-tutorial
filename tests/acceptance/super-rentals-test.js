import { assert, module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
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
});
