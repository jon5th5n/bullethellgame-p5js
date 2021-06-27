function button(x, y, w, h, callback, shapeMode = 'RECT', backgroundTransparent = true, backgroundColor = color(255, 0, 0), outlineWidth = 1, outlineColor = color(0, 0, 0), text_ = false, font = false, textColor = color(0, 0, 0), textOutlineWidth = 1, textOutlineColor = color(0, 0, 0)) {

    //-- render -----

    if(shapeMode == 'RECT') {

        //-- check interaction -----
        let touching = ((mouseX > x - w/2) && (mouseX < x + w/2) && (mouseY > y - h/2) && (mouseY < y + h/2));
        let pressed = (touching && mouseIsPressed);

        //-- render -----
        if(!backgroundTransparent) {
            strokeWeight(outlineWidth);
            stroke(outlineColor);
            fill(backgroundColor);
            rectMode(CENTER);
            rect(x, y, w, h);
        }
        if(text_) {
            strokeWeight(textOutlineWidth);
            stroke(textOutlineColor);
            fill(textColor);
            textSize(h * 2);
            textAlign(CENTER, CENTER);
            textFont(font);
            text(text_, x, y - h*0.125);

            if(touching) {
                fill(red(textColor) + 20, green(textColor) + 20, blue(textColor) + 20);
                textSize(h*2 + h*0.025);
                text(text_, x, y - h*0.125);
            }
        }

        //-- send callback -----
        callback(pressed, touching);
    }
    else console.error('this shape mode does not exist');
}