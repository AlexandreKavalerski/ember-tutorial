import { assert, module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2').hasText('Welcome to super Rentals!');

    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');

    assert.equal(currentURL(), '/about');
  });

  test('visiting /about', async (hooks) => {
    await visit('/about');

    assert.equal(currentURL(), '/about');
    assert.dom('[data-test-title]').hasText('About Super Rentals');

    assert.dom('[data-test-contact-link]').hasText('Contact Us');
    await click('[data-test-contact-link]');

    assert.equal(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async (hooks) => {
    await visit('/getting-in-touch');

    assert.equal(currentURL(), '/getting-in-touch');
    assert.dom('[data-test-title]').hasText('Contact Us');

    assert.dom('[data-test-about-link]').hasText('About');
    await click('[data-test-about-link]');

    assert.equal(currentURL(), '/about');
  });
});
