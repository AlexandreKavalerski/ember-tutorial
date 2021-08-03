import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

export default class AkMapComponent extends Component {
  get token() {
    return encodeURIComponent(ENV.MAPBOX_ACESS_TOKEN);
  }
}
