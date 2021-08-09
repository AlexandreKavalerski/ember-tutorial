import Component from '@glimmer/component';

export default class AkRentalsFilterComponent extends Component {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      rentals = rentals.filter((rental) => this.checkQuery(rental, query));
    }

    return rentals;
  }

  checkQuery(rental, query) {
    query = query.toLowerCase();

    return (
      rental.title.toLowerCase().includes(query) ||
      rental.city.toLowerCase().includes(query) ||
      rental.category.toLowerCase().includes(query)
    );
  }
}
