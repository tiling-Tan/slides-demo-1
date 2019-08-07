var $buttons = $('#buttonWrapper > button')
var $slides = $('#image')
var $images = $slides.children('img')
let current = 0
makeFakeSlides()

$slides.hide().offset()
$slides.css({ transform: 'translateX(-400px)' }).show()
bindEvent()

$('#previous').on('click', function () { 
    goToSlide(current-1)
})
$('#next').on('click', function () { 
    goToSlide(current+1)
})

var timer = setInterval(function(){
    goToSlide(current+1)
}, 2000)
$(container).on('mouseenter', function () { 
    window.clearInterval(timer)
}).on('mouseleave', function () { 
    timer = setInterval(function(){
        goToSlide(current+1)
    }, 2000)
})
document.addEventListener('visibilitychange', function () { 
    if (document.hidden) {
        window.clearInterval(timer)
    } else { 
        timer = setInterval(function(){
            goToSlide(current+1)
        }, 2000)
    }
})
function bindEvent() { 

    $('#buttonWrapper').on('click', 'button', function (e) { 
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })

}

function goToSlide(index) { 
    if (index > $buttons.length-1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length-1
    }
    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides.css({
            transform: `translateX(${-(current+2)*400}px)`
        })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index+1)*400}px)` }).show()
            })
    } else if (current === 0 && index === $buttons.length-1) {
        //第一张到最后一张
        $slides.css({
            transform: `translateX(0)`
        })
        .one('transitionend', function () {
            $slides.hide().offset()
            $slides.css({ transform: `translateX(${-(current+1)*400}px)` }).show()
        })
    } else { 
        $slides.css({transform:`translateX(${-(index+1)*400}px)`})
    }
    current = index
}

function makeFakeSlides() { 
    var $firstCopy = $images.eq(0).clone(true)
    var $lastCopy = $images.eq($images.length-1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}