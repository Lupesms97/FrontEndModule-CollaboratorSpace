import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import * as e from 'express';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { EventColor } from 'calendar-utils';
import { CalendarI } from 'src/app/shared/models/CalendarI';
import { EventsService } from 'src/app/core/events/events.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent  {

/*   newEvent:CalendarI ={
    title: '',
    start: new Date(),
    end: new Date(),
    color: '',
  } */

  locale: string = 'pt-BR';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  activeDayIsOpen: boolean = true;
  eventsOnModal:CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  eventss: CalendarEvent[] = [];

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {

    // Defina o locale como 'pt-BR' para exibir datas e dias da semana em português.
    registerLocaleData(localePt);
    this.getEventsService();
   }

   getEventsService(){
      this.eventsService.getEvents().subscribe((data) => {
        this.eventss = data;       
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
        title: 'Novo evento',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
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
  
  goToEditEvent(eventID:any){
    this.router.navigate(['datapicker', eventID]);
  }
}
