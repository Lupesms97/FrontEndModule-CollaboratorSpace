import { Component} from '@angular/core';
import {  CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { isSameMonth, isSameDay, addDays} from 'date-fns';
import {  registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { EventsService } from 'src/app/core/events/events.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/Role';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NotificationService } from 'src/app/core/notificationService/notification.service';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent {
  formData: any = {};
  authorizathion: string = Role.UNDEFINED_ROLE.toString();
  locale: string = 'pt-BR';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  activeDayIsOpen: boolean = true;
  eventsOnModal: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  formattedStartDate: string | null = '';
  formattedEndDate: string | null = '';
  eventIdForDeletion: string = '';
  eventTitleForDeletion: string = '';
  copyEvent: CalendarEvent = {
    title: '',
    start: new Date(),
    end: new Date(),
    color: { primary: '', secondary: '' },
  };




  constructor(
    private eventsService: EventsService,
    private router: Router,
    private auth: AuthService,
    private notification: NotificationService
  ) {
    this.authorizathion = this.auth.getRoles();
    // Defina o locale como 'pt-BR' para exibir datas e dias da semana em português.
    registerLocaleData(localePt);
    this.getEventsService();
  }

  getEventsService() {
    this.eventsService.getEvents().subscribe((data) => {
      this.addOneDay(data);
      this.events = data;
    });

  }
  addOneDay(events: CalendarEvent[]) {
    events.forEach((event) => {
      event.start = addDays(event.start as Date, 1);
      event.end = addDays(event.end as Date, 1);
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

  /*   addEvent(event:CalendarEvent): void {
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
    } */

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openModalAtualization(event: CalendarEvent) {
    this.copyEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.start,
      color: event.color,
    };
  }
  confirmAtualization() {
    this.eventsService.updateEvent(this.copyEvent)
    .subscribe(
      (data) => {
        console.log(data);
        this.notification.showToast(TypeToast.Success, 'Evento', 'Evento atualizado com sucesso!');
      },
      (error) => {
        console.log(error);
        this.notification.showToast(TypeToast.Error, 'Evento', 'Erro ao atualizar evento!');
      }
    );
  }
  openModalDelete(eventId: string | number | undefined, eventTitle: string) {
    this.eventIdForDeletion = eventId as string;
    this.eventTitleForDeletion = eventTitle;
  }
  confirmDelete() {
    this.eventsService.deleteEvent(this.eventIdForDeletion)
    .subscribe(
      (data) => {
        console.log(data);
        this.notification.showToast(TypeToast.Error, 'Evento', 'Erro ao deletar evento!');
      },
      (error) => {
        console.log(error);
        this.notification.showToast(TypeToast.Success, 'Evento', 'Evento deletado com sucesso!');
      }
    );





    this.eventsOnModal = this.eventsOnModal.filter((event) => event.id !== this.eventIdForDeletion);
    this.events = this.events.filter((event) => event.id !== this.eventIdForDeletion);
    this.eventIdForDeletion = '';
    this.eventTitleForDeletion = '';
  }
  sendNewEvent() {
    this.eventsService.createEvent(this.formData)
    .subscribe(
      (data) => {
        console.log(data);
        this.events.push(data);
        this.notification.showToast(TypeToast.Success, 'Evento', 'Evento criado com sucesso!');
      },
      (error) =>{
        this.notification.showToast(TypeToast.Error, 'Evento', 'Erro ao criar evento!');
        console.log(error);
      }
    );




    console.log(this.formData);
    this.formData = {};
  }

}
