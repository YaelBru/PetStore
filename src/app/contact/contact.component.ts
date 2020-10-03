import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from './contact.service';
import { Message } from './Message';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  userMessage: Message;
  sending: boolean = false;
  submitted: boolean = false;
  submitStatus: string;

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: [null, [Validators.required, Validators.email]],
      messageContent: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      return false;
    }
    this.sending = true;
    this.contactService.onSubmitMessage(this.contactForm.value).
      subscribe(
        res => {
          this.sending = false;
          this.submitted = true;
          this.submitStatus = res.message;
        }, 
        error => {
          this.sending = false;
          this.submitted = true;
          this.submitStatus = error.error.message || 'An Error Occurred, Please Try Again Later';
        });
    this.contactForm.reset();
  }

}
