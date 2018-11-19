import { Component, OnInit, ViewChild} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
  providers :[AccountService,ItemService]

})
export class InitComponent implements OnInit {

  constructor(private accountService: AccountService,private itemService: ItemService) { }

  ngOnInit() {
    this.getAccounts();   
    this.getItems();   

  }
  @ViewChild("baseChart") chart: BaseChartDirective;
  @ViewChild("baseChart2") chart2: BaseChartDirective;




  
  
    /**OBTENCION DE DATOS */
  public getAccounts(){//OBTENGO LA LISTA DE CUENTAS
      this.accountService.getAccounts().subscribe(res =>{
        let accounts=this.accountService.accountArray = res as Account[];
        console.log(accounts);
        console.log(accounts[0].positive_balance);
        this.getDataDonaSaldo(accounts);
      })
    }

  public getItems(){//OBTENGO LA LISTA DE USUARIOS
      this.itemService.getItems().subscribe(res =>{
        let items=this.itemService.itemArray = res as Item[];
        console.log(items);
        console.log(items[0].spent_balance);
        this.getDataDonaItem(items);
      })
    }



    

  //--------------------------GRAFICO DE LINEAS--------------------------------------------------------------------
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartLabels:Array<any> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  public lineChartOptions:any = {
    responsive: true
  };
  
  public getDataLine(){

  }

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomizeLine():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 

  //-----------FIN---------GRAFICO DE LINEAS--------------------------------------------------------------------

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  
  
  
  //--------------------------GRAFICO DE BARRAS--------------------------------------------------------------------
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
 


 
  public randomizeBar():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

    //-----------FIN------------GRAFICO DE BARRAS--------------------------------------------------------------------






  //--------------------------GRAFICO DE DONAS--------------------------------------------------------------------
  // Doughnut

  //SALDO EN CUENTAS
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartOptions:any = {
    responsive: true
  };
  public getDataDonaSaldo(accounts){
    for( let i=0; i<accounts.length; i++){ //SALDO POSITIVO
      this.doughnutChartData[i]=accounts[i].positive_balance;
    }

    for( let i=0; i<accounts.length; i++){ //NOMBRES CUENTA 
        this.doughnutChartLabels[i]=accounts[i].description;
      }  
      setTimeout(() => {  //REFRESCA EL GRAFICO
        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.doughnutChartLabels;
          this.chart.chart.update();
        }
        });
  }

    //ITEMS MAS COMPRADOS
    public doughnutChartTypeItem:string = 'doughnut';
    public doughnutChartLabelsItem:string[] = ['1','2','3'];
    public doughnutChartDataItem:number[] = [5,10,15];
    public doughnutChartOptionsItem:any = {
      responsive: true
    };
    public getDataDonaItem(items){
      for(let i=0; i<items.length; i ++){
        if(i==5) break;
        if(items[i].item_number!=2){
          this.doughnutChartDataItem[i]=items[i].spent_balance;
          this.doughnutChartLabelsItem[i]=items[i].description;
        }else{
          this.doughnutChartDataItem[i]=null;
          this.doughnutChartLabelsItem[i]=' ';

        }
      }
      setTimeout(() => {  //REFRESCA EL GRAFICO
        if (this.chart2 && this.chart2.chart && this.chart2.chart.config) {
          this.chart2.chart.config.data.labels = this.doughnutChartLabelsItem;
          this.chart2.chart.update();
        }
        });

    }




  //---------------FIN--------GRAFICO DE DONAS--------------------------------------------------------------------
  



}
