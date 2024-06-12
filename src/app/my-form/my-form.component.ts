import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray  } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  myForm: FormGroup;
  states: string[] = ['California', 'Texas', 'New York'];
  cities: { [key: string]: string[] } = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'Texas': ['Houston', 'Dallas', 'Austin'],
    'New York': ['New York City', 'Buffalo', 'Rochester']
  };
  selectedCities: string[] = [];
  hobbiesList: string[] = ['Reading', 'Traveling', 'Cooking', 'Gaming'];

  
  constructor(private fb: FormBuilder, private dataService: DataService) {

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      vegOrNonVeg: ['', Validators.required],
      hobbies: this.fb.array([], Validators.required)
    });
   
  }

  ngOnInit(): void {
    this.myForm.get('state')?.valueChanges.subscribe(state => {
      this.selectedCities = this.cities[state] || [];
      this.myForm.get('city')?.setValue('');
    });
  }

  onCheckboxChange(e: any) {
    const hobbies: FormArray = this.myForm.get('hobbies') as FormArray;

    if (e.target.checked) {
      hobbies.push(this.fb.control(e.target.value));
    } else {
      const index = hobbies.controls.findIndex(x => x.value === e.target.value);
      hobbies.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted!', this.myForm.value);

      this.dataService.addUser(this.myForm.value).subscribe(
        response => {
          console.log('User saved successfully!', response);
          this.myForm.reset();
          window.location.reload();        // reloading after submiting, need to chanage this 
         
        },
        error => {
          console.error('Error saving user!', error);
        }
      );
      
    }
  }
}
