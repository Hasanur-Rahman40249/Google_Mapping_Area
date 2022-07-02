import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angularProject_googleMap';

  lat = 22.358219;
  lng = 91.831169;
  zoom = 15.5;

  loader = new Loader({
    apiKey: 'AIzaSyC31_HpZ45BAxkX9aDGLXBysq9TgCQdtwg',
  });

  location = { lat: this.lat, lng: this.lng };
  map: any;
  rectangle: any;
  rectangle1: any;
  rectangle2: any;
  selectedArea = 0;
  selectedAreaEdit = 0;

  north = 22.35788536288357;
  south = 22.35800815135763;
  east =  91.83123319758797;
  west =  91.83140544180298;
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
        position: { lat: 22.358215, lng: 91.831162 },
        map: this.map,
        label: 'A',
      });

      const markerB = new google.maps.Marker({
        position: { lat: 22.357917, lng: 91.830969 },
        map: this.map,
        label: 'B',
      });

      const markerC = new google.maps.Marker({
        position: { lat: 22.357915, lng: 91.831562 },
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
        // editable: true,
        // draggable:true,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(22.35816194686944, 91.83098660978699),
          new google.maps.LatLng(22.35833310619102, 91.83135809573555)
        ),
      });

      // google.maps.event.addListener(rectangle, 'bounds_changed', function () {
      //   var abc = rectangle.getBounds();
      //   console.log(abc);
      // });

    this. rectangle1 = new google.maps.Rectangle({
        strokeColor: '#f5dd05',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#5a6ce6',
        fillOpacity: 0.3,
        map: this.map,
        // editable: true,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(22.357899635968582, 91.83089523925209),
          new google.maps.LatLng(22.35799265754026, 91.83106153621101)
        ),
      });

      // google.maps.event.addListener(rectangle1, 'bounds_changed', function () {
      //   var abc = rectangle1.getBounds();
      //   console.log(abc);
      // });

   this.rectangle2 = new google.maps.Rectangle({
        strokeColor: '#ede1e3',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF1000',
        fillOpacity: 0.3,
        map: this.map,
        // editable: true,
        // draggable:true,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(22.35788536288357, 91.83143319758797),
          new google.maps.LatLng(22.35800815135763, 91.83170544180298)
        ),
      });

      // google.maps.event.addListener(rectangle2, 'bounds_changed', function () {
      //   var abc = rectangle2.getBounds();
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
      this.northEdit = 22.35816194686944;
      this.southEdit = 22.35833310619102;
      this.eastEdit = 91.83098660978699;
      this.westEdit = 91.83170544180298;
      return;
    }
    if (value == 2) {
      this.northEdit = 22.357899635968582;
      this.southEdit = 22.35799265754026;
      this.eastEdit = 91.83089523925209;
      this.westEdit = 91.83106153621101;
      return;
    }
    if (value == 3) {
      this.northEdit = 22.35788536288357;
      this.southEdit = 22.35800815135763;
      this.eastEdit = 91.83143319758797;
      this.westEdit = 91.83170544180298;
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
