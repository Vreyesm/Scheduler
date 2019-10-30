import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  success(msg: string) {
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  }

  error(msg: string) {
    Swal.fire({
      position: 'top-end',
      type: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  }
}
