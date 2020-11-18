(function(window){

    alert("Rule:\nFoods will be randomly spawned in the area\nGet as much food as you can\n\nHow to Control\nW/A/S/D");
    var box = document.getElementById("box"),
        obj = box.getElementsByTagName("div");
    
    var moveStatus = 0;
    $('#score').val(0);
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
                end();
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
                $("#score").text(parseInt($("#score").text())+1)
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
        $('#box>span').remove();
        $('#restart').removeAttr('disabled');
        clearInterval(interval);alert("Game over!");
        $('#restart').css('display','block')
    }

    function restart(){
        $('#restart').on('click',function(){
            $(this).attr('disabled','disabled');
            $('#box>div:gt(0)').remove();
            $('#box>div:eq(0)').css('left','0px').css('top','0px');
            document.onkeydown = function(e){
                switch(e.key){
                    case"W":case "w": moveStatus = 3;break;
                    case"S":case "s": moveStatus = 1;break;
                    case"A":case "a": moveStatus = 2;break;
                    case"D":case "d": moveStatus = 0;break;
                }
            };
            $('#score').text(0);
            moveStatus = 0;
            createFood();
            move();
        });
        
    }

    function mobile_control(){
        $('#up').on('click',function(){
            moveStatus = 3;
        });
        $('#left').on('click',function(){
            moveStatus = 2;
        });
        $('#right').on('click',function(){
            moveStatus = 0;
        });
        $('#down').on('click',function(){
            moveStatus = 1;
        });
    }   
        mobile_control();
        restart();
        setSnake();
        createFood();
        move();
})(window);

