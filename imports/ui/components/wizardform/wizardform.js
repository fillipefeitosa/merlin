import { Session } from 'meteor/session';
import { Polls } from '/imports/api/polls/polls.js';
import './wizardform.html';

Template.page1.helpers({
    rendered: function(){

    },
    'click': function () {
        // click on a player to select it
        Session.set("selectedPlayer", 'macaco');
    }
});


Template.page1.events({
    'change #profile_job'(event) {
        const target = event.target;
        const value = target.value;
        Session.set("profile_job", value);
    },
    'change #profile_education'(event){
        const target = event.target;
        const value = target.value;
        Session.set("profile_education", value);
    },
    'change #profile_sex'(event){
        const target = event.target;
        const value = target.value;
        Session.set("profile_sex", value);
    },
    'change #cus_range'(event){
        const target = event.target;
        const value = target.value;
        if (value<50) {
            $('#medidor').text('Eu prefiro a alternativa 1');
        } else {
            $('#medidor').text('Eu prefiro a alternativa 2')
        }
        Session.set("test_range", value);
    },
    'click #next'(event){
        sessionVariablesNames = ['profile_job','profile_education','profile_sex'];
        sessionVariables = [];
        // Get all variables from this page stored in session
        for (var i=0; i<sessionVariablesNames.length; i++){
            sessionVar = Session.get(sessionVariablesNames[i]);
            if(sessionVar) sessionVariables.push(sessionVar);
        }
        // Check if there are any missing values
        if (sessionVariables.length<sessionVariablesNames.length) {
            window.alert('Por favor, preencha todos os campos de perfil.')
            event.preventDefault();

        } else {
            // Default Behavior
            console.log('Comportamento Default. Should Go to next pages');
        }
    }

});


//  ------- PAGE 3 Events --------

Template.comparissionTemplate.onRendered(function(){
    $(function() {
        let $document = $(document);
        let selector = '[data-rangeslider]';
        let $element = $(selector);
        // For ie8 support
        let textContent = ('textContent' in document) ? 'textContent' : 'innerText';
        // Example functionality to demonstrate a value feedback
        function valueOutput(element) {
            let value = element.value;
            let output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
            output[textContent] = value;
        }
        $document.on('input', 'input[type="range"], ' + selector, function(e) {
            valueOutput(e.target);
        });
        // Example functionality to demonstrate disabled functionality
        $document.on('click', '#js-example-disabled button[data-behaviour="toggle"]', function(e) {
            let $inputRange = $(selector, e.target.parentNode);
            if ($inputRange[0].disabled) {
                $inputRange.prop('disabled', false);
            } else {
                $inputRange.prop('disabled', true);
            }
            $inputRange.rangeslider('update');
        });
        // Example functionality to demonstrate programmatic value changes
        $document.on('click', '#js-example-change-value button', function(e) {
            let $inputRange = $(selector, e.target.parentNode);
            let value = $('input[type="number"]', e.target.parentNode)[0].value;
            $inputRange.val(value).change();
        });
        // Example functionality to demonstrate programmatic attribute changes
        $document.on('click', '#js-example-change-attributes button', function(e) {
            let $inputRange = $(selector, e.target.parentNode);
            let attributes = {
                min: $('input[name="min"]', e.target.parentNode)[0].value,
                max: $('input[name="max"]', e.target.parentNode)[0].value,
                step: $('input[name="step"]', e.target.parentNode)[0].value
            };
            $inputRange.attr(attributes);
            $inputRange.rangeslider('update', true);
        });
        // Example functionality to demonstrate destroy functionality
        $document
        .on('click', '#js-example-destroy button[data-behaviour="destroy"]', function(e) {
            $(selector, e.target.parentNode).rangeslider('destroy');
        })
        .on('click', '#js-example-destroy button[data-behaviour="initialize"]', function(e) {
            $(selector, e.target.parentNode).rangeslider({
                polyfill: false
            });
        });
        // Example functionality to test initialisation on hidden elements
        $document
        .on('click', '#js-example-hidden button[data-behaviour="toggle"]', function(e) {
            let $container = $(e.target.previousElementSibling);
            $container.toggle();
        });
        // Basic rangeslider initialization
        $element.rangeslider({
            // Deactivate the feature detection
            polyfill: false,
            // Callback function
            onInit() {
                valueOutput(this.$element[0]);
            },
            // Callback function
            onSlide(position, value) {
                console.log('onSlide');
                console.log('position: ' + position, 'value: ' + value);
            },
            // Callback function
            onSlideEnd(position, value) {
                console.log('onSlideEnd');
                console.log('position: ' + position, 'value: ' + value);
            }
        });
    });

});

Template.comparissionTemplate.events({
    'change #cus_range'(event){
        const target = event.target;
        const value = target.value;
        let routeName = FlowRouter.getRouteName()
        $('#medidor_img').removeClass();
        if (value == 50) {
            $('#medidor').text('Eu acho que as duas alternativas tem o mesmo valor');
            $('#medidor_img').addClass("fas fa-equals text-info fa-lg");
        } else if(value<50){
            $('#medidor').text('Eu prefiro a alternativa de baixo');
            $('#medidor_img').addClass("fas fa-arrow-circle-down text-info fa-lg");
        } else {
            $('#medidor').text('Eu prefiro a alternativa de cima');
            $('#medidor_img').addClass("fas fa-arrow-circle-up text-info fa-lg");
        }
        Session.set(routeName, value);
    },
    'click #next'(event){
        event.preventDefault();
        let url = FlowRouter.current();
        let nextPageNumber = parseInt(url['path'].match(/\d+/))+1;
        if (nextPageNumber==16) {
            var nextPage = '/thanks';
            const poll = Session.get('Poll.page3');
            Meteor.call("polls.insert", poll, function(error, result){
                if(error){
                    console.log("error", error);
                }
                if(result){
                    console.log('inquerito salvo com sucesso');
                }
            });
        } else {
            var nextPage = '/page'+nextPageNumber.toString();
        }
        console.log(nextPageNumber);
        $('#cus_range').val(50);
        $('#medidor').text('Arraste o slider para esquerda ou para a direita.');
        return FlowRouter.go(nextPage);
    }
});
