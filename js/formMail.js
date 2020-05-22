jQuery(document).ready(function($){
    // change the price here
    let newFullKitPrice = 11760;
    let newMiddleKitPrice = 4280;
    let newBaseKitPrice = 2120;
    let oldFullKitPrice = 14700;
    let oldMiddleKitPrice = 5300;
    let oldBaseKitPrice = 2650;
    let btnTexts = ['заказать полный набор', 'заказать средний набор', 'заказать базовый набор', 'заказать наборы', 'выберите набор']

    document.getElementById('oldFull').textContent = '₴' + (oldFullKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    document.getElementById('oldMiddle').textContent = '₴' + (oldMiddleKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    document.getElementById('oldBase').textContent = '₴' + (oldBaseKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    document.getElementById('newFull').textContent = '₴' + (newFullKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    document.getElementById('newMiddle').textContent = '₴' + (newMiddleKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    document.getElementById('newBase').textContent = '₴' + (newBaseKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    let packs = ['checkMeddle'];
    let switchCheckBox = true;
    let newSum = newMiddleKitPrice;
    let oldSum = oldMiddleKitPrice;
    let btnText = btnTexts[1];
    let textSum = '₴'+ (newMiddleKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
    let collectionCheckbox = document.getElementsByClassName("checkPack")
    Array.prototype.forEach.call(collectionCheckbox, function(el) {
        el.checked = el.value === 'checkMeddle';
    });

    $('.checkPack').click(function (message) {
        let box = $(this);
        let item = box.attr('value')
        if(box.is(':checked')) {
            switchCheckBox = true
            packs.push(item)
            if(item === 'checkFull') {
                newSum = newSum + newFullKitPrice
                oldSum = oldSum + oldFullKitPrice
            } else if(item === 'checkMeddle') {
                newSum = newSum + newMiddleKitPrice
                oldSum = oldSum + oldMiddleKitPrice
            } else {
                newSum = newSum + newBaseKitPrice
                oldSum = oldSum + oldBaseKitPrice
            }

        } else {

            for( let i = 0; i < packs.length; i++){
                if ( packs[i] === item)
                { packs.splice(i, 1); }}
            switchCheckBox = false
            if(item === 'checkFull') {
                newSum = newSum - newFullKitPrice
                oldSum = oldSum - oldFullKitPrice
            } else if(item === 'checkMeddle') {
                newSum = newSum - newMiddleKitPrice
                oldSum = oldSum - oldMiddleKitPrice
            } else {
                newSum = newSum - newBaseKitPrice
                oldSum = oldSum - oldBaseKitPrice
            }
        }
        if(packs.length > 0) {
            if(packs.length > 1) {
                btnText = btnTexts[3]
            } else {
                if(packs[0] === 'checkFull') {
                    btnText = btnTexts[0]
                } else if(packs[0] === 'checkMeddle') {
                    btnText = btnTexts[1]
                } else {
                    btnText = btnTexts[2]
                }
            }
        } else {
            btnText = btnTexts[4]
        }
        let newPriceStr = '₴' + (newSum+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
        let oldPriceStr = '₴' + (oldSum+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
        let collectionNewPrice = document.getElementsByClassName("new-cost-digit")
        let collectionOldPrice = document.getElementsByClassName("old-cost-digit")
        textSum = newPriceStr

        let collectionBtnText = document.getElementsByClassName("button-m")
        if(collectionNewPrice.length > 0) {
            Array.prototype.forEach.call(collectionNewPrice, function(el) {
                el.textContent = newPriceStr
            });
            Array.prototype.forEach.call(collectionOldPrice, function(el) {
                el.textContent = oldPriceStr
            });
            Array.prototype.forEach.call(collectionCheckbox, function(el) {
                if(el.value === item && el.checked !== switchCheckBox) {
                    el.checked = switchCheckBox
                }
            });
        }
        Array.prototype.forEach.call(collectionBtnText, function(el) {
            el.innerText = btnText
        });
    })
    $('.form').submit(function (event) {
        let form = $(this);
        let resultKit = form.find('.errorMessage--kit');
        let resultName = form.find('.errorMessage--name');
        let resultPhone = form.find('.errorMessage--phone');
        let name = form.find('.form_field--name').val().trim();
        let phone = form.find('.form_field--phone').val().trim();
        let label = form.find('.form_field--label').val().trim();
        let nameRegEx = /^([а-яё\s]+|[a-z\s]+)$/iu;
        let phoneNoRegEx = /^((8|\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        form.find('.field').css({border: '1px solid #6fb05c'});

        if(packs.length < 1) {
            $('.errorMessage--kit').text('Пожалуйста выберите набор');
            event.preventDefault();
        }else if(textSum === '') {
            textSum = '₴'+ (newMiddleKitPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '*';
        }else if (name === '') {
            $('.errorMessage--kit').text('');
            $('.errorMessage--name').text('Введите Ваше имя!');
            form.find('.form_field--name').css({border: '1px solid #ff0000'});
            event.preventDefault();
        } else if (name.match(nameRegEx) === null) {
            $('.errorMessage--kit').text('');
            $('.errorMessage--name').text('Имя должно состоять из только букв!');
            form.find('.form_field--name').css({border: '1px solid #ff0000'});
            event.preventDefault();
        } else if (phone === '') {
            $('.errorMessage--kit').text('');
            $('.errorMessage--name').text('');
            form.find('.form_field--name').css({border: '1px solid #6fb05c'});
            $('.errorMessage--phone').text('Введите Ваш номер телефона!');
            form.find('.form_field--phone').css({border: '1px solid #ff0000'});
            event.preventDefault();
        } else if (phone.match(phoneNoRegEx) === null) {
            $('.errorMessage--kit').text('');
            $('.errorMessage--name').text('');
            form.find('.form_field--name').css({border: '1px solid #6fb05c'});
            $('.errorMessage--phone').text(`Телефонный номер должен состоять из 10 цифр!`);
            form.find('.form_field--phone').css({border: '1px solid #ff0000'});
            event.preventDefault();
        } else {
            $('.errorMessage--kit').text('');
            $('.errorMessage--name').text('');
            $('.errorMessage--phone').text('');
            form.find('.form_field--name').css({border: '1px solid #6fb05c'});
            form.find('.form_field--phone').css({border: '1px solid #6fb05c'});
            resultKit.html('')
            resultName.html('')
            resultPhone.html('')
            // console.log(textSum)

            $.ajax({
                url: 'ajax/mail.php',
                type: 'POST',
                cache: false,
                data: {'name': name, 'phone': phone, 'label': label, 'packs': packs, 'sum': textSum},
                dataType: 'html',
                beforeSend: function () {
                    $('.sendMail')
                        .prop('disabled', true)
                        .css({
                            background: '#ccc',
                            'border-bottom': '#ccc',
                            cursor: 'wait'
                        })
                        .text('Отправка...')

                    Array.prototype.forEach.call(document.getElementsByClassName("checkPack"), function (el) {
                        el.disabled = true
                    })
                },
                success: function (data) {
                    if (!data.split('&')[3]){
                        resultKit.html(data.split('&')[0])
                        resultName.html(data.split('&')[1])
                        resultPhone.html(data.split('&')[2])

                        Array.prototype.forEach.call(document.getElementsByClassName("checkPack"), function (el) {
                            el.disabled = false
                        })

                        $('.sendMail').prop('disabled', false).prop('cursor', 'pointer')
                            .css({
                                background: 'linear-gradient(to bottom, rgba(250,255,0,1) 0%,rgba(255,238,2,1) 100%)',
                                'border-bottom': '4px solid #ad9d00',
                                cursor: 'pointer'})
                            .text(btnText)
                    } else {
                        $('.form').trigger("reset")
                        Array.prototype.forEach.call(document.getElementsByClassName("checkPack"), function (el) {
                            el.disabled = false
                        })
                        $('.sendMail').prop('disabled', false).prop('cursor', 'pointer')
                            .css({
                                background: 'linear-gradient(to bottom, rgba(250,255,0,1) 0%,rgba(255,238,2,1) 100%)',
                                'border-bottom': '4px solid #ad9d00',
                                cursor: 'pointer'})
                            .text(btnTexts[1])
                        let modal = '#modal'
                        document.querySelector(modal).classList.add('open');
                        document.addEventListener('click', function(e) {
                            if (e.target.dataset.close === 'modal') {
                                e.preventDefault();
                                document.querySelector(modal).classList.remove('open');
                            }
                        })
                        setTimeout(function () {
                            document.querySelector(modal).classList.remove('open')
                            $('.sendMail').text(btnTexts[1])
                        }, 7000);
                    }
                },
                error: function(data) {
                    alert(data.split('&')[3]);
                    $('.sendMail').prop('disabled', false).prop('cursor', 'pointer')
                        .css({
                            background: 'linear-gradient(to bottom, rgba(250,255,0,1) 0%,rgba(255,238,2,1) 100%)',
                            'border-bottom': '4px solid #ad9d00',
                            cursor: 'pointer'})
                        .text(btnText)
                    Array.prototype.forEach.call(document.getElementsByClassName("checkPack"), function (el) {
                        el.disabled = false
                    })
                }
            })
        }
        event.preventDefault();
    })
    /*
        jQuery Masked Input Plugin
        Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
        Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
        Version: 1.4.1
    */
    !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

    $(".form_field--phone").mask("+38 (999) 999-99-99");
})