
/*запрет клавиатурных функций. ctrl+a, ctrl+u, ctrl+c и отказ правой кнопки мыши*/
function noselect() {return false;}
/*document.onmousedown = noselect; */
document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect; 
document.oncopy = noselect; 



function addHandler(event, handler){
 if (document.attachEvent) {
 document.attachEvent('on' + event, handler);
 }
 else if (document.addEventListener) {
 document.addEventListener(event, handler, false);
 }
 }
function killSelection(){
 if (window.getSelection) {
 window.getSelection().removeAllRanges();
 }
 else if (document.selection && document.selection.clear) {
 document.selection.clear();
 }
 }
function noSelectionEvent(event) {
 var event = event || window.event;
 var key = event.keyCode || event.which;
if (event.ctrlKey && (key == 65 || key == 85)) {
 killSelection();
if (event.preventDefault) { event.preventDefault(); }
 else { event.returnValue = false; }
 return false;
 }

if (event.ctrlKey && event.shiftKey && key == 73) {
 killSelection();
if (event.preventDefault) { event.preventDefault(); }
 else { event.returnValue = false; }
 return false;
 }

 }
 addHandler('keydown', noSelectionEvent);
 addHandler('keyup', noSelectionEvent);


/*запрет клавиатурных функций. ctrl+a, ctrl+u, ctrl+c и отказ правой кнопки мыши*/
