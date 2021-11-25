import { Component, OnInit, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})


export class FoodListComponent implements OnInit, PipeTransform {
  dialog: number = 1;
  todaysList: any = [];
  totalCalorie: number = 0;
  Foodlists: any = [
    {
      foodName: "Noodles",
      image: "assets/noodles.jpg",
      calorie: 174
    },
    {
      foodName: "Briyani",
      image: "assets/briyani.png",
      calorie: 290
    },
    {
      foodName: "Banana",
      image: "assets/banana.jpg",
      calorie: 105
    },
    {
      foodName: "Salmon",
      image: "assets/salmon.jpg",
      calorie: 175
    },
    {
      foodName: "Cake",
      image: "assets/cake.png",
      calorie: 424
    }
  ]
  Foodlist: any = this.Foodlists;

  constructor() { }

  ngOnInit(): void {
  }

  search(value: string) {
    if (this.Foodlists && value) {
      let list = this.transform(this.Foodlists, value);
      if (list && list.length) {
        this.Foodlist = list;
      } else {
        this.Foodlist = this.Foodlists;
        alert("Food is Not Available!");
      }
    }
    else {
      this.Foodlist = this.Foodlists;
      alert("You Entered Food Name as Empty!!");
    }
  }


  transform(Foodlist: any, value: string) {
    let list = Foodlist.filter((element: { foodName: string; }) => {
      return element.foodName.toLowerCase().includes(value.toLowerCase());
    });
    return list;
  }

  addFood(name: string, calor: string, image: string) {
    let calorie: number = +calor;
    if (name && calorie && image) {
      this.Foodlists.push({
        foodName: name,
        image: image,
        calorie: calorie
      });
    }
    this.onClose();
  }
  onOpen() {
    this.dialog = 0;
  }
  onClose() {
    this.dialog = 1;
  }

  todayList(name: string) {
    let list: any = [];
    let found = 0;
    let index = 0;

    if (this.todaysList.length !== 0) {
      for (let i = 0; i < this.todaysList.length; i++) {
        if (this.todaysList[i].name.toLowerCase() === name.toLowerCase()) {
          found = 1;
          index = i;
          break;
        } else {
          found = 0;
        }
      }
    } else {
      found = 0;
    }
    list = this.Foodlists.filter((element: { foodName: string; }) => {
      return element.foodName.toLowerCase().includes(name.toLowerCase());
    });
    if (found === 1) {
      this.todaysList[index].no_of_times = this.todaysList[index].no_of_times + 1;
    }
    else {
      this.todaysList.push({
        name: list[0].foodName,
        no_of_times: 1
      });
    }
    this.totalCalorie = this.totalCalorie + list[0].calorie;
  }
}
