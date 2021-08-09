import Component from '@glimmer/component';

export default class AkRentalsFilterComponent extends Component {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      console.log(rentals);
      console.log(`Query = {${query}}`);
      rentals = rentals.filter((rental) =>
        rental.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(rentals);
    }

    return rentals;
  }
}
