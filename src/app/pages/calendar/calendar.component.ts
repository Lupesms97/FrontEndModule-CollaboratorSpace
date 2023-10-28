import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as e from 'express';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  {

  constructor() { }
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
}
