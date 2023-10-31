import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import * as e from 'express';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { EventColor } from 'calendar-utils';
import { CalendarI } from 'src/app/shared/models/CalendarI';
import { EventsService } from 'src/app/core/events/events.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from 'src/app/shared/models/Role';
import { AuthService } from 'src/app/core/auth/auth.service';



const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent  {
  formData: any = {};

/*   newEvent:CalendarI ={
    title: '',
    start: new Date(),
    end: new Date(),
    color: '',
  } */
  role:string = Role.UNDEFINED_ROLE.toString();

  locale: string = 'pt-BR';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  activeDayIsOpen: boolean = true;
  eventsOnModal:CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  formattedStartDate: string|null= '';
  formattedEndDate: string|null= '';
  copyEvent: CalendarEvent = {
    title: '',
    start: new Date(),
    end: new Date(),
    color: {primary: '', secondary: ''},
  };
  



  constructor(
    private eventsService: EventsService,
    private router: Router,
    private auth: AuthService,
  ) {
   this.role = this.auth.getRoles()|| Role.ADMIN; 
    // Defina o locale como 'pt-BR' para exibir datas e dias da semana em português.
    registerLocaleData(localePt);
    this.getEventsService();
   }

   getEventsService(){
      this.eventsService.getEvents().subscribe((data) => {
        this.events = data;       
      });
     
   }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.eventsOnModal = events;
    
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.view === CalendarView.Day) ||
        this.view === CalendarView.Month
      ) {
        this.view = CalendarView.Month;
      } else {
        this.viewDate = date;
        this.view = CalendarView.Day;
      }
    }
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.eventsOnModal = this.eventsOnModal.filter((event) => event !== eventToDelete);
  }
  addEvent(event:CalendarEvent): void {
    this.eventsOnModal = [
      ...this.eventsOnModal,
      {
        title: event.title,
        start: startOfDay(event.start),
        end: endOfDay(event.end as Date),
        color: event.color,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];   
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  goToEventEdit(eventId: any){
    this.router.navigate(['editEvent']);
  }

  onSubmit(){
    console.log(this.formData);
  }
  edit(event:CalendarEvent){
    this.copyEvent ={
      title: event.title,
      start: new Date(formatDate(event.start, 'yyyy-MM-dd', 'pt-BR')),
      end: event.end,
      color: event.color,
    };
  }


}
