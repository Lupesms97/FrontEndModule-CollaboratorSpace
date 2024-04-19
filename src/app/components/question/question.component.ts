import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Questions } from 'src/app/shared/models/Questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  questionsList: Questions[] = [
    {
      question: "Qual é a capital do Brasil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte"],
      correctAnswer: "Brasília",
      userAnswer: "",
      answered: false,
      correct: false
    },
    {
      question: "Quem escreveu 'Dom Quixote'?",
      options: ["Miguel de Cervantes", "William Shakespeare", "Victor Hugo", "Jorge Luis Borges"],
      correctAnswer: "Miguel de Cervantes",
      userAnswer: "",
      answered: false,
      correct: false
    },
    {
      question: "Qual é o maior animal terrestre?",
      options: ["Elefante africano", "Baleia-azul", "Tubarão-baleia", "Girafa"],
      correctAnswer: "Elefante africano",
      userAnswer: "",
      answered: false,
      correct: false
    },
    {
      question: "Quem pintou 'A Noite Estrelada'?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctAnswer: "Vincent van Gogh",
      userAnswer: "",
      answered: false,
      correct: false
    }
  ];
  currentQuestionIndex: number = 0;
  sizeList: number = this.questionsList.length;
  currentQuestion: Questions = this.questionsList[this.currentQuestionIndex];

  constructor() { }
  private routerParamService = inject(ActivatedRoute);
  private router = inject(Router);
  routerParam = ''

  ngOnInit(): void {
    this.routerParam = this.routerParamService.snapshot.params['nomeDaTrilha'];
  }
  backToTrailList(){
    this.router.navigate([`trilhas-disponiveis/${this.routerParam}/trilha`]);
  }

  updateUserAnswer(answer: string) {
    this.currentQuestion.userAnswer = answer;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionsList.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questionsList[this.currentQuestionIndex];
    }
  }

  textButton(): string{
    if(this.currentQuestionIndex == this.questionsList.length - 1){
      return "Finalizar";
    }
    return "Próxima";
  }
  forWheretoGo(){
    return this.currentQuestionIndex != this.questionsList.length - 1 
  }
}
