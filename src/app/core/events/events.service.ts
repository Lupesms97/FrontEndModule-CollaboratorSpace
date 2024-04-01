import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable, map, tap } from 'rxjs';
import { CalendarI } from 'src/app/shared/models/CalendarI';
import { EventColor } from 'calendar-utils';
import { format, getDay, isToday, isSameMonth, isSameDay, getDate, endOfMonth, startOfMonth, eachDayOfInterval, subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';




@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly API_URL_R = 'assets/events.json';
  private events$: Observable<CalendarEvent[]> | undefined;

  constructor(private http: HttpClient) {
    this.refreshEvents();
  }


/*   /all */
  setEventsOnObservable(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarI[]>(`${this.API_URL_R}`).pipe(
      map((items) => items.map(this.convertJsonToCalendarEvent)),
    );
  }

  public refreshEvents() {
    this.events$ = this.setEventsOnObservable();
  }

  public getEvents(): Observable<CalendarEvent[]> {
    return this.events$ as Observable<CalendarEvent[]>;
  }

  private convertJsonToCalendarEvent(item: CalendarI): CalendarEvent {
    const formatDate = (date: number | Date) => format(date, 'yyyy/MM/dd', { locale: ptBR });

    return {
      id: item.id,
      title: item.title,
      start: startOfDay(new Date( formatDate(new Date(item.start)))),
      end: startOfDay(new Date( formatDate(new Date(item.end)))),
      color: {
        primary: item.color!, // Usando uma string vazia como valor padrão
        secondary: item.color!, // Usando uma string vazia como valor padrão
      },
      // Outras propriedades do evento, se necessário
    };
  }
  public getPostbyId(id: string): Observable<CalendarEvent> {
    return this.events$!.pipe(
      map((event) => event.find(event => event.id === id)!)
    );
  }
  public createEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.API_URL_R}/event`, event).pipe(
      tap(() => this.refreshEvents())
    );
  }
  
  public updateEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.API_URL_R}/update`, event).pipe(
      tap(() => this.refreshEvents())
    );
  }
  
  public deleteEvent(eventId: string): Observable<CalendarEvent> {
    return this.http.delete<CalendarEvent>(`${this.API_URL_R}/eventDeletion?eventId=${eventId}`).pipe(
      tap(() => this.refreshEvents())
    );
  }


}
/* "id": "e0b648d5-89c8-4573-9b91-1e557b70d3d2",
 *//* "title": " Evento de dezembro 2",
 *//* "start": "2023/12/15",
 *//* "end": "2023/12/16",
 *//* "color": "red" */