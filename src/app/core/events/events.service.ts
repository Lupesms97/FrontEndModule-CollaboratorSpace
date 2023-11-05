import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, map, tap } from 'rxjs';
import { CalendarI } from 'src/app/shared/models/CalendarI';
import { EventColor } from 'calendar-utils';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';



@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly API_URL_R = 'http://localhost:8081/events';
  private events$: Observable<CalendarEvent[]> | undefined;

  constructor(private http: HttpClient) {
    this.refreshEvents();
  }

  setEventsOnObservable(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarI[]>(`${this.API_URL_R}/all`).pipe(
      map((items) => items.map(this.convertJsonToCalendarEvent))
    );
  }

  public refreshEvents() {
    this.events$ = this.setEventsOnObservable();
  }

  public getEvents(): Observable<CalendarEvent[]> {
    return this.events$ as Observable<CalendarEvent[]>;
  }

  private convertJsonToCalendarEvent(item: CalendarI): CalendarEvent {
    return {
      id: item.id,
      title: item.title,
      start: startOfDay(new Date(item.start)),
      end: endOfDay(new Date(item.end)),
      color: {
        primary: item.color || '', // Usando uma string vazia como valor padrão
        secondary: item.color || '', // Usando uma string vazia como valor padrão
      },
      // Outras propriedades do evento, se necessário
    };
  }
  public getPostbyId(id: string): Observable<CalendarEvent> {
    return this.events$!.pipe(
      map((event) => event.find(event => event.id === id)!)
    );
  }
  public creatEvent(event: CalendarEvent) {
    this.http.post<CalendarEvent>(`${this.API_URL_R}/event`, event).subscribe((resp)=> console.log(resp));
    this.refreshEvents();
    
  }
  public updateEvent(event: CalendarEvent) {
    this.http.put<CalendarEvent>(`${this.API_URL_R}/update`, event).subscribe((resp)=> console.log(resp));
    this.refreshEvents();
  }
  public deleteEvent(eventId: string) {
    this.http.delete<CalendarEvent>(`${this.API_URL_R}/eventDeletion?eventId=${eventId}`).subscribe((resp)=> console.log(resp));
    this.refreshEvents();
  }


}
/* "id": "e0b648d5-89c8-4573-9b91-1e557b70d3d2",
 *//* "title": " Evento de dezembro 2",
 *//* "start": "2023/12/15",
 *//* "end": "2023/12/16",
 *//* "color": "red" */