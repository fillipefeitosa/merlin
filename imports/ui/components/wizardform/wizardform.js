import { Session } from 'meteor/session';
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
        sessionVariablesNames = ['profile_job','profile_education','profile_sex','test_range'];
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


Template.comparissionTemplate.events({
    'change #cus_range'(event){
        const target = event.target;
        const value = target.value;
        let routeName = FlowRouter.getRouteName()
        if (value<50) {
            $('#medidor').text('Eu prefiro a alternativa 1');
        } else {
            $('#medidor').text('Eu prefiro a alternativa 2');
        }
        Session.set(routeName, value);
    },
    'click #next'(event){
        event.preventDefault();
        let url = FlowRouter.current();
        let nextPageNumber = parseInt(url['path'].match(/\d+/))+1;
        let nextPage = '/page'+nextPageNumber.toString();
        $('#cus_range').val(50);
        $('#medidor').text('Arraste o slider para esquerda ou para a direita.');
        return FlowRouter.go(nextPage);
    }
});
