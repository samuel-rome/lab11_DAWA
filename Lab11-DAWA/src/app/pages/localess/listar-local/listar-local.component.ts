import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Local } from 'src/app/models/local';
import { LocalService } from 'src/app/services/local.service';
import Swal from 'sweetalert2';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },

  title: string,
  info: string
  departamento: string;
  distrito: string;
  cantidad: number;
};

@Component({
  selector: 'app-listar-local',
  templateUrl: './listar-local.component.html',
  styleUrls: ['./listar-local.component.css']
})

export class ListarLocalComponent {

  markers: MarkerProperties[] = [];
  constructor(private localService: LocalService) { }


  ngOnInit() {
    // iniciamos la funcion de obtenerLocal() que obtiene los datos de la BD y lo guarda en un array
    this.obtenerLocal()
    console.log(this.markers);
  }

  handleMapInitialized(map: google.maps.Map) {
    this.localService.getLocales().subscribe(data => {
      data.forEach(locales => {
        new google.maps.Marker({
          position: { lat: locales.latitud, lng: locales.longitud },
          label: { color: 'black', text: locales.departamento, fontSize: '20px', fontWeight: 'bold' },
          map,
        })
      })
    })
  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };

  onChange() {
    this.mapOptions = { ...this.mapOptions };
  }

  verLocal(index: number) {
    console.log('Posición : ', index);

    this.mapOptions.center = this.markers[index].position
    this.onChange()

  }

  obtenerLocal() {
    this.localService.getLocales().subscribe(data => {

      data.forEach(locales => {

        const newMarker: MarkerProperties = {
          position: { lat: locales.latitud, lng: locales.longitud },
          label: { color: 'red', text: locales.departamento, fontSize: '20px', fontWeight: 'bold' },
          title: locales.title,
          info: locales.info,
          departamento: locales.departamento,
          distrito: locales.distrito,
          cantidad: locales.cantidad
        };
        this.markers.push(newMarker);
      });
    })
  }

  eliminarLocal(id: any) {
    this.localService.deleteLocal(id).subscribe(data => {
      Swal.fire({
        title: 'Eliminacion de Local',
        text: "¿Desea eliminar el local?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
    })
  }
}
