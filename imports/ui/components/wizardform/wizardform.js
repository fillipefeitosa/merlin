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


//  ------- comparissionTemplate Events -------- //

Template.comparissionTemplate.onCreated(function () {
    Meteor.subscribe('polls.all');
});


Template.comparissionTemplate.onRendered(function(){
    $(document).on('input', '#cus_range', function() {
        $('#slider_value').html( $(this).val() );
        $('#medidor_img').removeClass();
        if ($(this).val() >= 48 && $(this).val() <=52) {
            $('#medidor').text('Não tenho preferência');
            $('#medidor_img').addClass("fas fa-equals text-info fa-lg");
            $('#cus_range').val(50);
        } else if($(this).val()<48){
            $('#medidor').text('Prefiro ligeiramente a de baixo');
            $('#medidor_img').addClass("fas fa-arrow-circle-down text-info fa-lg");
            if($(this).val()<=30){$('#medidor').text('Prefiro a alternativa de baixo')};
            if($(this).val()<=10){$('#medidor').text('Prefiro MUITO a alternativa de baixo')};
        } else if ($(this).val()>52){
            $('#medidor').text('Prefiro ligeiramente a de cima');
            $('#medidor_img').addClass("fas fa-arrow-circle-up text-info fa-lg");
            if($(this).val()>=70){$('#medidor').text('Prefiro a alternativa de cima')};
            if($(this).val()>=90){$('#medidor').text('Prefiro MUITO a alternativa de cima')};
        }

    });

});

Template.comparissionTemplate.events({

    'change #cus_range'(event){
        const target = event.target;
        const value = parseInt(target.value);
        let routeName = FlowRouter.getRouteName()
        Session.set(routeName, value);
    },
    'click #medidor_center'(event){
        // Change UI and sessionVariable to store 50 as equal value
        const target = event.target;
        $('#medidor_img').removeClass();
        $('#cus_range').val(50);
        $('#medidor').text('Não tenho preferência');
        $('#medidor_img').addClass("fas fa-equals text-info fa-lg");
        // save 50 (equals) in sessionVar
        let routeName = FlowRouter.getRouteName();
        Session.set(routeName, 50);
    },
    'click #next'(event){
        event.preventDefault();
        let url = FlowRouter.current();
        let nextPageNumber = parseInt(url['path'].match(/\d+/))+1;
        // 16 is the last page.
        if (nextPageNumber==16) {
            var nextPage = '/thanks';
            const poll = Session.keys;
            Meteor.call("polls.insert", poll, function(error, result){
                if(error){
                    console.log("error", error);
                }
                if(result){
                    console.log('inquerito salvo com sucesso');
                }
            });
        } else {
            // Use merlin/ when self hosting
            var nextPage = '/page'+nextPageNumber.toString();
        }
        $('#cus_range').val(50);
        $('#medidor').text('Arraste o slider para esquerda ou para a direita.');
        $('#medidor_img').removeClass();
        $('#medidor_img').addClass("fas fa-arrows-alt-v fa-lg");
        return FlowRouter.go(nextPage);
    }
});
