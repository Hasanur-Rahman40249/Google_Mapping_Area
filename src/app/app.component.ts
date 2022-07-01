import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'googlemapangular13ajapi';

  lat = 33.678;
  lng = -116.243;
  zoom = 15.5;

  loader = new Loader({
    apiKey: 'Your_Api_Key',
  });

  location = { lat: this.lat, lng: this.lng };
  map: any;
  rectangle: any;
  rectangle1: any;
  rectangle2: any;
  selectedArea = 0;
  selectedAreaEdit = 0;

  north = 33.675892857255164;
  south = 33.677185741446536;
  east = -116.23809321022034;
  west = -116.23538696289063;
  strokeColor = '#ede1e3';
  fillColor = '#FF1000';

  northEdit: any;
  southEdit: any;
  eastEdit: any;
  westEdit: any;

  ngOnInit(): void {
    this.loader.load().then(() => {
      console.log('loaded gmaps');
      const mapProperties = {
        center: this.location,
        zoom: this.zoom,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
      };
      const mapId = document.getElementById('map') as HTMLInputElement;
      this.map = new google.maps.Map(mapId, mapProperties);

      const marker = new google.maps.Marker({
        position: { lat: 33.68, lng: -116.2499 },
        map: this.map,
        label: 'A',
      });

      const markerB = new google.maps.Marker({
        position: { lat: 33.68, lng: -116.244 },
        map: this.map,
        label: 'B',
      });

      const markerC = new google.maps.Marker({
        position: { lat: 33.6765, lng: -116.2485 },
        map: this.map,
        label: 'C',
      });

      this.rectangle = new google.maps.Rectangle({
        strokeColor: '#87071a',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#43e33b',
        fillOpacity: 0.3,
        map: this.map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(33.6816, -116.24693562698364),
          new google.maps.LatLng(33.67847321559823, -116.24032186508178)
        ),
      });

      this.rectangle1 = new google.maps.Rectangle({
        strokeColor: '#f5dd05',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#5a6ce6',
        fillOpacity: 0.3,
        map: this.map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(33.67840000000005, -116.25104291534424),
          new google.maps.LatLng(33.68133216526413, -116.24871801719665)
        ),
      });

      this.rectangle2 = new google.maps.Rectangle({
        strokeColor: '#ede1e3',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF1000',
        fillOpacity: 0.3,
        map: this.map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(33.67483035840974, -116.25086052513123),
          new google.maps.LatLng(33.67802499463684, -116.245)
        ),
      });

      // google.maps.event.addListener(this.rectangle2, 'bounds_changed', function () {
      //   var abc = this.rectangle2.getBounds();
      //   console.log(abc);
      // });
    });
  }

  // bounds: {
  //   north: 33.685,
  //   south: 33.671,
  //   east: -116.234,
  //   west: -116.251,
  // },

  addNewArea() {
    this.loader.load().then(() => {
      const rectangle3 = new google.maps.Rectangle({
        strokeColor: this.strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.fillColor,
        fillOpacity: 0.3,
        map: this.map,
        editable: true,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(this.north, this.east),
          new google.maps.LatLng(this.south, this.west)
        ),
      });

      google.maps.event.addListener(rectangle3, 'bounds_changed', function () {
        var abc = rectangle3.getBounds();
        console.log(abc);
      });
    });
  }

  onChangeSelectedArea(value: any) {
    if (value == 1) {
      this.northEdit = 33.6816;
      this.southEdit = 33.67847321559823;
      this.eastEdit = -116.24693562698364;
      this.westEdit = -116.24032186508178;
      return;
    }
    if (value == 2) {
      this.northEdit = 333.67840000000005;
      this.southEdit = 33.68133216526413;
      this.eastEdit = -116.25104291534424;
      this.westEdit = -116.24871801719665;
      return;
    }
    if (value == 3) {
      this.northEdit = 33.67483035840974;
      this.southEdit = 33.67802499463684;
      this.eastEdit = -116.25086052513123;
      this.westEdit = -116.245;
      return;
    }
  }

  editCurrentArea(value: any) {
    var newRect = new google.maps.LatLngBounds(
      new google.maps.LatLng(this.northEdit, this.eastEdit),
      new google.maps.LatLng(this.southEdit, this.westEdit)
    );
    return value == 1
      ? this.rectangle.setBounds(newRect)
      : value == 2
      ? this.rectangle1.setBounds(newRect)
      : this.rectangle2.setBounds(newRect);
  }

  //conditional ? expression_when_true : expression_when_false;

  deleteCurrentArea() {
    return this.selectedArea == 1
      ? this.rectangle.setMap(null)
      : this.selectedArea == 2
      ? this.rectangle1.setMap(null)
      : this.rectangle2.setMap(null);
  }
}
