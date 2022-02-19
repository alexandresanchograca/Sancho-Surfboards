console.clear();

/* Enconding Settings used to convert .mov video to mp4*/
// ffmpeg -i {CENSORED-PATH-FOR-GITHUB-<3} -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4

const video = document.querySelector("#video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;

      });
  }
}, 1000);


//check delta/offset between elements each time we scroll
$(document).scroll(function() {
    checkOffset();
});

//Function to align the bottom of the video with the top of the element below
function checkOffset() {
    if($('#video-background').offset().top + $('#video-background').height() >= $('#info0').offset().top - 10){
        $('#video-background').css('position', 'absolute');

        let pos = $('#video-background').height();

        //document.getElementById("output").innerHTML = `${$(document).scrollTop()}`; // Value of scroll Y in px

        $('#video-background').css('margin-top', pos);
    }
    if($(document).scrollTop() + window.innerHeight < $('#info0').offset().top){
        $('#video-background').css('position', 'fixed');
        $('#video-background').css('margin-top', '120px');
    }
}

//Design a Radar Chart
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Big-Waves', 'Manouverabilty', 'Steep Waves', 'Mushy Waves', 'Velocity', 'Small-Waves', 'Paddling'],
        datasets: [{
            label: 'Objectives of a Sancho Surfboard',
            data: [20, 50, 40, 90, 72, 82, 90],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
      elements: {
        line:{
          borderWidth: 3
        }
      }
    }
});