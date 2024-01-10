import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ManageRestaurantService } from '../shared/manage-restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  locationForm!: FormGroup;

  error: any;

  registrationResult: any;
  registrationError: any;

  constructor(public service: ManageRestaurantService, private router: Router) { }

  ngOnInit() {
    this.locationForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl('', Validators.required),
      newAddress: new FormGroup({
        street: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
      }),
      gpsLat: new FormControl('', Validators.required),
      gpsLong: new FormControl('', Validators.required),
      webHookUrl: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^http[s]?:\/\/(www\.){0,1}[a-zA-Z0-9\.\-\_]+\.+[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
      ]),
      titleImage: new FormControl('', Validators.required),
      openingHours: new FormArray([]) // stays empty
    });
  
    this.getLocation();
  }
  

  // In your component
  getLocation(): void {
    this.service.getLocationObservable().subscribe(
      (position) => {
        this.locationForm.patchValue({
          gpsLat: position.coords.latitude,
          gpsLong: position.coords.longitude
        });
        //console.log(this.locationForm.value);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      return;
    }

    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let base64String: string = reader.result as string;
      //console.log(base64String);
      // Remove data URL scheme using regex
      let base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
      this.locationForm.patchValue({ titleImage: base64Data });
    };
    reader.readAsDataURL(file);
    this.locationForm.get('titleImage')?.markAsTouched();
  }

  onSubmit(): void {
      if (this.locationForm.invalid) {
          this.locationForm.markAllAsTouched();
          return;
      }

      this.service.registerRestaurant(this.locationForm.value).subscribe(
        (response: any) => {
          this.registrationResult = "Successfully registered!";

          // Delay the redirection by a specific time (e.g., 2000 milliseconds)
          setTimeout(() => {
            this.router.navigate(['/']); // replace '/success-route' with your desired route
          }, 2000); // 2000 milliseconds delay
        },
        (error: any) => {
          console.log(error);
          this.registrationError = error;
        }
      );
  }

}
