import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import * as e from 'express';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { EventColor } from 'calendar-utils';
import { CalendarI } from 'src/app/shared/models/CalendarI';

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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent  {

  newEvent:CalendarI ={
    title: '',
    start: new Date(),
    end: new Date(),
    color: '',
  }

  locale: string = 'pt-BR';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  constructor() {

    // Defina o locale como 'pt-BR' para exibir datas e dias da semana em português.
    registerLocaleData(localePt);
    
   }
  eventos:CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  eventss: CalendarEvent[] = [
    {
      title: 'Event 1',
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
    },
    {
      title: 'Event 2',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    },
    {
      title: 'Event 3',
      start: addDays(endOfDay(new Date()), 1),
      end: addDays(endOfDay(new Date()), 2),
      color: colors['red'],
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.eventos = [];
    console.log(date);
    console.log(events);
    events.forEach(eventt=>{this.eventos.push(eventt)})
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.view === CalendarView.Day) ||
        this.view === CalendarView.Day
      ) {
        this.view = CalendarView.Month;
      } else {
        this.viewDate = date;
        this.view = CalendarView.Day;
      }
    }
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.eventos = this.eventos.filter((event) => event !== eventToDelete);
  }
  addEvent(): void {
    this.eventos = [
      ...this.eventos,
      {
        title: this.newEvent.title,
        start: startOfDay(this.newEvent.start),
        end: endOfDay(this.newEvent.end),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];   
  }
}
