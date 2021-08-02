// Change CSS Prop of Header When Scroll Down

const heroHeader = document.querySelector('.hero-header');

const scrollHeader = (e)=>{
    if(e.currentTarget.scrollY > 50){
        heroHeader.style.background = "#d6d5d5";
    }
    else{
        heroHeader.style.background = "transparent";   
    }
}

window.addEventListener('scroll',e=>{
    scrollHeader(e);
});



// Hero Section TimeLine
const animalImages = document.querySelectorAll("main > img");

const heroTimeLine = () =>{
    const heroTL = gsap.timeline({duration:.5,ease:"power1.in",onComplete:opacityImages});
    heroTL.from(".cat1-pic",{x:"-10%",y:"-15%",width:"100%",height:"100%",clearProps:"all"})
    .from(".dog2-pic",{x:"-55%",y:"-15%",width:"100%",height:"100%",clearProps:"all"},"+=.5")
    .from(".cat2-pic",{x:"5%",y:"-55%",width:"100%",height:"100%",clearProps:"all"},"+=.5")
    .from(".dog1-pic",{x:"50%",y:"-60%",width:"100%",height:"100%",clearProps:"all"},"+=.5")
    .from(".hero-header",{duration:1,y:-100,ease:"bounce.out",clearProps:"all"},"-=.5")
    .from(".hero-headline-bx",{x:-200,opacity:0,clearProps:"all"},"-=.5")
    
    return heroTL;
}

const opacityImages = () =>{
    animalImages.forEach(img =>{
        gsap.to(img,{duration:.5,opacity:0.4,ease:"power1.in"});
    })
}

// Play Any TimeLine
function PlayTimeLine(element,timeline){
    this.element = element;
    this.timeline = timeline;

    if(this.element.clientWidth < 1024) this.timeline().totalProgress(1).kill();
    else this.timeline().play();        
}

const body = document.body;
// const playTimeLine = new PlayTimeLine(body,heroTimeLine);


// Mobile NavBar TimeLine
const openNavBtn = document.querySelector('.open-navbar');
const closeNavBtn = document.querySelector('.close-navbar');
const navBarTween1 = gsap.to(".hero-mobile-nav",{duration:.5,x:"100%",ease:"power1.in",paused:true});

openNavBtn.addEventListener('click', e=>{
    navBarTween1.play();
})

closeNavBtn.addEventListener('click', e=>{
    navBarTween1.reverse();
})

// Product Slider TimeLine

const productPrevBtn = document.querySelector('.product-prev-btn');
const productNextBtn = document.querySelector('.product-next-btn');
const productSlides = document.querySelectorAll('.product-slide');

class NavigateProducts{
    constructor(slide){
        this.slide = slide;
        this.count = 0;
        this.x = 0
        this.productTL = "";
    }

    update(){
        this.productTL = gsap.to(this.slide,{duration:0.5,x:0 + this.x,ease:"power1.in",paused:true});
    }

    prev(e1){
        this.prevBtn = e1.target;
        if(this.count <= 0){
            this.count = 0;
            this.prevBtn.style.opacity = 0.5;
        }
        else{    
            this.x += 304;
            this.update();
            this.productTL.play();
            this.count--;
            this.nextBtn.style.opacity = 1;
        }
    }

    next(e2){
        this.nextBtn = e2.target;
        if(this.count >= this.slide.length-1){
            this.count = this.slide.length-1;
            this.nextBtn.style.opacity = 0.5;
        }
        else{    
            this.x += -304;
            this.update();
            this.productTL.play();
            this.count++;
            if(this.prevBtn !== undefined) this.prevBtn.style.opacity = 1;
        }
    }
}

const navigateProducts = new NavigateProducts(productSlides);

productPrevBtn.addEventListener('click', e=>{
    navigateProducts.prev(e);
})
productNextBtn.addEventListener('click', e=>{
    navigateProducts.next(e);
})



