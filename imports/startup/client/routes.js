import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

// Exposed group
exposed = FlowRouter.group({});
exposed.route('/', {
    name: 'App.home',
    action: function(){
        BlazeLayout.render("App_home", { pageContent:'instructions'});
    }
});

exposed.route('/thanks', {
    name: 'App.thanks',
    action: function(){
        BlazeLayout.render("App_home", { pageContent:'thanks'});
    }
});

exposed.route('/page1', {
    name: 'Poll_page1',
    action: function(){
        BlazeLayout.render("App_home", { pageContent:'page1'});
    }
});

exposed.route('/page2',{
    name: 'Poll_page2',
    action: function(){
        BlazeLayout.render('App_home', { pageContent:'imageInstructions'})
    }
});

// -------- SCENARIO 1 START ----------- //
exposed.route('/page3',{
    name: 'Poll_page3',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {descriptionLeft:'cen1_alt_1',  descriptionRight:'cen1_alt_2'})
    }
});
exposed.route('/page4',{
    name: 'Poll_page4',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen1_alt_1_image', descriptionLeft:'cen1_alt_1', imageRight:'cen1_alt_3_image', descriptionRight:'cen1_alt_3'})
    }
});
exposed.route('/page5',{
    name: 'Poll_page5',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen1_alt_1_image', descriptionLeft:'cen1_alt_1', imageRight:'cen1_alt_4_image', descriptionRight:'cen1_alt_4'})
    }
});
exposed.route('/page6',{
    name: 'Poll_page6',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen1_alt_2_image', descriptionLeft:'cen1_alt_2', imageRight:'cen1_alt_3_image', descriptionRight:'cen1_alt_3'})
    }
});
exposed.route('/page7',{
    name: 'Poll_page7',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen1_alt_2_image', descriptionLeft:'cen1_alt_2', imageRight:'cen1_alt_4_image', descriptionRight:'cen1_alt_4'})
    }
});
exposed.route('/page8',{
    name: 'Poll_page8',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen1_alt_3_image', descriptionLeft:'cen1_alt_3', imageRight:'cen1_alt_4_image', descriptionRight:'cen1_alt_4'})
    }
});

// -------- Disperse Instructions ----------- //
exposed.route('/page9',{
    name: 'Poll_page9',
    action: function(){
        BlazeLayout.render('App_home', { pageContent:'disperseInstructions'})
    }
});

// -------- SCENARIO 2 START ----------- //
exposed.route('/page10',{
    name: 'Poll_page10',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_1_image', descriptionLeft:'cen2_alt_1', imageRight:'cen2_alt_2_image', descriptionRight:'cen2_alt_2'})
    }
});
exposed.route('/page11',{
    name: 'Poll_page11',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_1_image', descriptionLeft:'cen2_alt_1', imageRight:'cen2_alt_3_image', descriptionRight:'cen2_alt_3'})
    }
});
exposed.route('/page12',{
    name: 'Poll_page12',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_1_image', descriptionLeft:'cen2_alt_1', imageRight:'cen2_alt_4_image', descriptionRight:'cen2_alt_4'})
    }
});
exposed.route('/page13',{
    name: 'Poll_page13',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_2_image', descriptionLeft:'cen2_alt_2', imageRight:'cen2_alt_3_image', descriptionRight:'cen2_alt_3'})
    }
});
exposed.route('/page14',{
    name: 'Poll_page14',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_2_image', descriptionLeft:'cen2_alt_2', imageRight:'cen2_alt_4_image', descriptionRight:'cen2_alt_4'})
    }
});
exposed.route('/page15',{
    name: 'Poll_page15',
    action: function(){
        BlazeLayout.render('comparissionTemplate', {imageLeft:'cen2_alt_3_image', descriptionLeft:'cen2_alt_3', imageRight:'cen2_alt_4_image', descriptionRight:'cen2_alt_4'})
    }
});

exposed.route('/test',{
    name: 'test',
    action: function(){
        BlazeLayout.render("test");
    }
});
