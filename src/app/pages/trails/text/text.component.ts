import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  private routerParamService = inject(ActivatedRoute);
  private router = inject(Router);
  routerParam = ''
  textExmplo: string = '<h1>Titulo de exemplo</h1> <br> <br>Em um mundo cada vez mais cheio de distrações e demandas, manter o foco e a concentração pode parecer uma tarefa desafiadora. No entanto, a prática da meditação tem sido reconhecida como uma ferramenta eficaz para fortalecer a mente e aprimorar a capacidade de concentração. Neste artigo, vamos explorar como a meditação pode ser uma aliada poderosa para melhorar o seu foco no dia a dia e como você pode incorporar essa prática em sua rotina para obter benefícios duradouros. <br><br><h3>1. Cultiva a consciência plena.</h3><br><br>A meditação, especialmente as práticas de atenção plena (mindfulness), ajuda a desenvolver a consciência plena do momento presente. Isso significa estar completamente presente e consciente do que está acontecendo dentro e ao seu redor, sem se deixar levar por pensamentos ou preocupações passadas ou futuras. Essa consciência plena é fundamental para manter o foco e a atenção no que você está fazendo no momento presente. <br><br><h3>2. Treina a mente para se concentrar</h3><br><br>A prática regular da meditação é como um treinamento para a mente. Ao concentrar-se em um objeto de foco, como a respiração, um mantra ou sensações corporais, você treina sua mente para se concentrar e permanecer presente. Com o tempo, essa capacidade de concentração se traduz em uma maior habilidade de manter o foco em outras atividades durante o dia, como o trabalho, os estudos ou até mesmo as interações sociais. <br><br><h3>3. Reduz a reatividade mental: </h3><br><br>Uma mente agitada e reativa pode ser uma das principais causas da falta de foco. A meditação ajuda a acalmar a mente e a reduzir a reatividade mental, permitindo que você responda de forma mais calma e ponderada às situações ao invés de reagir impulsivamente. Isso cria um espaço mental que facilita a manutenção do foco e da clareza mental. <br><br><h3>4. Aumenta a resiliência ao estresse: </h3><br><br>O estresse crônico pode prejudicar significativamente a capacidade de concentração e foco. A meditação é uma ferramenta eficaz para reduzir o estresse e aumentar a resiliência emocional. Ao cultivar uma mente mais calma e equilibrada por meio da meditação, você estará mais apto a lidar com os desafios do dia a dia sem se deixar sobrecarregar emocionalmente, o que contribui para uma maior capacidade de concentração e foco. <br><br><h3>5. Promove o bem-estar geral: <br><br></h3>Além de melhorar o foco e a concentração, a meditação também promove o bem-estar geral, tanto físico quanto mental. A prática regular da meditação está associada a uma série de benefícios para a saúde, incluindo redução da ansiedade, melhoria do sono, aumento da autoconsciência e uma sensação geral de calma e contentamento, tudo o que contribui para uma mente mais focada e produtiva. <br><br>A meditação é uma prática poderosa que pode ajudá-lo a melhorar significativamente o seu foco no dia a dia. Ao cultivar a consciência plena, treinar a mente para se concentrar, reduzir a reatividade mental, aumentar a resiliência ao estresse e promover o bem-estar geral, a meditação oferece uma variedade de benefícios que se estendem além da simples melhoria do foco. Experimente incorporar a meditação em sua rotina diária e descubra os benefícios transformadores que ela pode trazer para sua vida. <br><br>'

  ngOnInit(): void {
    this.routerParam = this.routerParamService.snapshot.params['nomeDaTrilha'];
  }
  backToTrailList(){
    this.router.navigate([`trilhas-disponiveis/${this.routerParam}/trilha`]);
  }
 
}
