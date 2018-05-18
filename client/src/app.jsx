import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
import Footer from './components/Footer.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRestaurant: this.props.currentRestaurant || {},
      nearbyRestaurants: this.props.nearbyRestaurants || [],
      checkID: true
    }
  }

  componentDidMount() {
    this._getData();
  }

  _getData() {
    var id = window.location.href.split('/')[4];
    if (window.location.href.split('/')[4] !== undefined) {
      $.ajax({
        url: `http://52.53.171.51:3004/api/restaurants/${id}/nearby`,
        method: "GET",
        success: (data) => {
          this.setState({
            currentRestaurant: data[0],
            nearbyRestaurants: data[1],
          })
        },
        error: (err) => {
          console.log('GET Error: ', err)
        }
      })
    } else {
      this.setState({
        checkID: false
      })
    }

  }

  _goToRestaurant(id) {
    location.href = '/restaurants/' + id;
  }

  render() {
    let restaurantCards = this.state.nearbyRestaurants.map((num, index) => {
      return (
        <RestaurantCard nearbyRestaurant={this.state.nearbyRestaurants[index]} key={index.toString()} switchRestaurant={this._goToRestaurant.bind(this)} />
      )
    })

    return (
      <div className="nearby-padding">
        <div className="restaurant-header">Restaurants Near {this.state.currentRestaurant.name ? this.state.currentRestaurant.name : "none"}</div>
        <div className="restaurant-cards">
          {restaurantCards}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
