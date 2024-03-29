Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({

    initialize: function() {
        $('#header').html( new HeaderView().render().el );
    },

	routes: {
		"reservations/": "listAllReservations",
		"reservations/new"	: "newReservation",
		"reservations/:id"	: "reservationDetails",
		"flights/": "listAllFlights",
		"flights/new": "newFlight",
		"flights/:id": "flightDetails"
	},

	list: function() {
        this.listAllReservations();
  	},

	reservationDetails: function(id) {
        this.listAllReservations(function() {
			var reservation = app.reservationList.get(id);
		    app.showView('#content', new ReservationView({model: reservation}) );
        });
  	},

	newReservation: function() {
        this.listAllReservations(function() {
    		app.showView('#content', new ReservationView({model: new Reservation()}) );
        });
	},
	
	flightDetails: function(id) {
        this.listAllFlights(function() {
			var flight = app.flightList.get(id);
        	var fg = new FlightView({model: flight, airlines: app.airlineList});
		    app.showView('#content', fg);
		    fg.showAirlines();
		    $('#airline').val(flight.attributes.airline.id);   
		});
        //show all airlines
  	},

	newFlight: function() {
		this.listAllFlights(function() {
			var fg = new FlightView({model: new Flight(), airlines: app.airlineList});
			app.showView('#content', fg);			
			fg.showAirlines();
		});
		//show all airlines
	},

    showView: function(selector, view) {
        if (this.currentView)
            this.currentView.close();
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },
    
    listAllFlights: function(callback) {
        if (this.flightList) {
            if (callback) callback();
        } else {
            this.flightList = new FlightCollection();
       		this.flightList.fetch({success: function() {
               $('#sidebar').html( new EntityListView({model: 
            	   app.flightList, type:"flight"}).render().el );
               if (callback) callback();
            }});   		
       		this.airlineList = new AirlineCollection();
       		this.airlineList.fetch();

       		this.setText('Flight');
        }
    },

    listAllReservations: function(callback) {
        if (this.reservationList) {
            if (callback) callback();
        } else {
            this.reservationList = new ReservationCollection();
       		this.reservationList.fetch({success: function() {
               $('#sidebar').html( new EntityListView({model: 
            	   app.reservationList,type:"reservation"}).render().el );
               if (callback) callback();
            }});
       		this.setText('Reservation');
        }
    },
    
    setText: function(type) {
    	$('.new').text('New ' + type);
    	$('#see_all').text(type+'s');
    }
});

tpl.loadTemplates(['header', 'reservation-details', 'reservation-list-item',
	'flight-details', 'flight-list-item'], function() {
    app = new AppRouter();
    Backbone.history.start();
});