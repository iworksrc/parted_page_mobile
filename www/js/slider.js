function createSlider(){
    var header = document.getElementById('header');
    var footer = document.getElementById('footer');

    var slider = document.getElementById('slider'),
        startX,
        startY,
        dist,
        treshold = 50,
        allowedTime = 1000,
        elapsedTime,
        startTime;
    slider.height = footer.offsetTop - slider.offsetTop;

    function handleswipe(isKosherSwipe){
        if(isKosherSwipe){
            slider.innerHTML = '<h1 color="black">yess it`s swipe</h1>';
        }else {
            slider.innerHTML = '<h1 color="red">no, not enough</h1>';
        }
    }

    slider.addEventListener('touchstart', function (event) {
        console.log('touchstart invoked');
        console.log(event);

        //slider.innerHTML =''; //TODO set this empty HTML becomes a bug (why this happens?)

        var touchobj = event.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        event.preventDefault();
    }, false);


    slider.addEventListener('touchmove', function(event){
        event.preventDefault();
        //console.log('touchmove');
        console.log(event.changedTouches[0].pageY.toString() + 'px');

        header.style.height = event.changedTouches[0].pageY.toString() + 'px';
        slider.style.top = event.changedTouches[0].pageY.toString() + 'px';
        footer.style.top =  (slider.height + event.changedTouches[0].pageY).toString() + 'px';
    }, false);


    slider.addEventListener('touchend', function (event) {
        console.log('touchend');
        var touchobj = event.changedTouches[0];
        dist = Math.abs(touchobj.pageY - startY);
        elapsedTime = new Date().getTime() - startTime;
        var isWell = (elapsedTime <= allowedTime && dist >= treshold && Math.abs(touchobj.pageX - startX) <= 100);
        handleswipe(isWell);
        event.preventDefault();
    }, false);
}

window.addEventListener('load', function () {
    new createSlider();
});
