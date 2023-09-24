import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-couple-info',
  templateUrl: './couple-info.component.html',
  styleUrls: ['./couple-info.component.css']
})
export class CoupleInfoComponent implements OnInit {
  
  ngOnInit(): void {
    this.setAnimations();
  }


  setAnimations(){
    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");

    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove("appear");
          return;
        } else {
          entry.target.classList.add("appear");
        }
      });
    },
      appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    });

  }
}
