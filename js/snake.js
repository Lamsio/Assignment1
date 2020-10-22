(function(window){

    alert("規則\n食物在區域内任意地點刷新\n操作\nW/A/S/D => 上/左/下/右\n條件\n贏: 做夢\n輸: 咬自己/撞墻");
    var box = document.getElementById("box"),
        obj = box.getElementsByTagName("div");

    var moveStatus = 0;
    function snakebody_move(){
        for(let i=obj.length-1;i>0;i--){
            obj[i].style.left = obj[i-1].offsetLeft+"px";
            obj[i].style.top = obj[i-1].offsetTop+"px";
        }
    }
    document.onkeydown = function(e){
        switch(e.key){
            case"W":case "w": moveStatus = 3;break;
            case"S":case "s": moveStatus = 1;break;
            case"A":case "a": moveStatus = 2;break;
            case"D":case "d": moveStatus = 0;break;
        }
    }
    function move(){
        let obj_snake = $('#box>div:nth-child(1)');
        var obj_food = box.getElementsByTagName("span");
        let snake_width = parseInt(obj_snake.css('width').match(/^[0-9]{0,}\.{0,}[0-9]{0,}/g));

        interval = setInterval(function(e){
            if(hitSelf()){
                clearInterval(interval);alert("你輸了");
            }else{
                switch(moveStatus){
                    case 0:
                    if(obj[0].offsetLeft<(snake_width*19)){
                        snakebody_move();
                        obj[0].style.left = obj[0].offsetLeft + snake_width + "px";
                    }else{
                        end();
                    }
                    break;

                    case 1:
                    if(obj[0].offsetTop<(snake_width*19)){
                        snakebody_move();
                        obj[0].style.top = obj[0].offsetTop + snake_width + "px";
                    }else{
                        end();
                    }
                    break;

                    case 2:
                    if(obj[0].offsetLeft>0){
                        snakebody_move();
                        obj[0].style.left = obj[0].offsetLeft - snake_width + "px";
                    }else{
                        end();
                    }
                    break;

                    case 3:
                    if(obj[0].offsetTop>0){
                        snakebody_move();
                        obj[0].style.top = obj[0].offsetTop - snake_width + "px";
                    }else{
                        end();
                    }
                    break;
                }
            }

            if(obj_food[0] != undefined && obj[0].offsetLeft == obj_food[0].offsetLeft&&obj[0].offsetTop == obj_food[0].offsetTop){
                let obj = $('<div></div>');
                let obj_snake = $('#box>div:nth-child(1)')
                obj.css({
                    "left":"-10000px",
                    "top":"-10000px",
                    'width':obj_snake.css('width'),
                    'height':obj_snake.css('width')
                })
                $("#box").append(obj);
                box.removeChild(obj_food[0]);
                createFood();
            }
        },100)
    }
    
    function createFood(){
        let obj = $('<span></span>');
        let obj_snake = $('#box>div:nth-child(1)');
        let snake_width = parseInt(obj_snake.css('width').match(/^[0-9]{0,}\.{0,}[0-9]{0,}/g));

        obj.css({
            "left":Math.round(Math.random()*19)*snake_width+"px",
            "top":Math.round(Math.random()*19)*snake_width+"px",
            'width':obj_snake.css('width'),
            'height':obj_snake.css('width')
        });

        $('#box').append(obj)
    }
    
    function hitSelf(){
        for(let i = 1; i<obj.length-1;i++){
            if(obj[0].offsetLeft==obj[i+1].offsetLeft&&obj[0].offsetTop==obj[i+1].offsetTop){
                return true;
            }
        }
        return false;
    }

    function setSnake(){
        let obj = $('#box');
        let obj_snake = $('#box>div:nth-child(1)');
        let snake_width = parseInt(obj.css('width').match(/^[0-9]{0,}\.{0,}[0-9]{0,}/g));
        obj_snake.css('width',snake_width/20);
        obj_snake.css('height',obj_snake.css('width'));
    }

    function end(){
        document.onkeydown = null;
        clearInterval(interval);alert("你輸了");
    }
        setSnake();
        createFood();
        move();
})(window);

