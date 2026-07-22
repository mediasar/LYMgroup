/* ==========================================LOADER========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    loader.style.transition = ".6s";

});

/* ==========================================MOBILE MENU========================================== */

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

});

/* ==========================================CLOSE MENU========================================== */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/* ==========================================STICKY NAVBAR========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});

/* ==========================================SCROLL PROGRESS========================================== */

const progress = document.querySelector(".progress-bar");

window.addEventListener("scroll",()=>{

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progressHeight =
        (window.pageYOffset / totalHeight) * 100;

    progress.style.width = progressHeight + "%";

});

/* ==========================================BACK TO TOP========================================== */

const backTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        backTop.classList.add("show");

    }else{

        backTop.classList.remove("show");

    }

});

backTop.onclick = ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ==========================================SMOOTH ANCHOR========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================REVEAL ANIMATION========================================== */

const reveals=document.querySelectorAll(

".section,.project-card,.service-card,.info-card,.testimonial-card,.stat-card"

);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

reveals.forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

/* ==========================================COUNTER========================================== */

const counters=document.querySelectorAll(".stat-card h2");

const speed=150;

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const counter=entry.target;

const update=()=>{

const target=+counter.innerText.replace(/\D/g,'');

const current=+counter.dataset.count||0;

const increment=Math.ceil(target/speed);

if(current<target){

counter.dataset.count=current+increment;

counter.innerText=(current+increment)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

counterObserver.unobserve(counter);

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* ==========================================ACTIVE NAV========================================== */

const sections=document.querySelectorAll("section");

const nav=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

nav.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================================PARALLAX HERO========================================== */

const heroImage=document.querySelector(".hero-image");

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

heroImage.style.transform=

`translate(${x}px,${y}px)`;

});

/* ==========================================CURSOR========================================== */

const cursor=document.querySelector(".cursor");

window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.style.width="55px";

cursor.style.height="55px";

});

el.addEventListener("mouseleave",()=>{

cursor.style.width="22px";

cursor.style.height="22px";

});

});

/* ==========================================BUTTON RIPPLE========================================== */

document.querySelectorAll(".btn-primary").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

circle.classList.add("ripple");

const rect=this.getBoundingClientRect();

circle.style.left=e.clientX-rect.left+"px";

circle.style.top=e.clientY-rect.top+"px";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

/* ==========================================CONSOLE========================================== */

console.log(

"%cPortofolio Ready",

"color:#C8A46B;font-size:20px;font-weight:bold;"

);