;
(function ($) {
    $(function () {
        var Event = Backbone.Tastypie.Model.extend({
            urlRoot: '/api/v1/event/'
        });

        var EventCollection = Backbone.Tastypie.Collection.extend({
            urlRoot: '/api/v1/event',
            model: Event
        });

        var TemplateView = Backbone.View.extend({
            initialize: function(options) {
                Backbone.View.prototype.initialize.call(this, options);
                if (_.isFunction(this.onRender)) {
                    this.on('render', this.onRender, this);
                }
            },
            render: function() {
                var template = Handlebars.templates[this.template];
                this.$el.html(template(this.getContext()));
                this.trigger('render');
                return this;
            },
            getContext: function() {
                var json;
                if (this.model) {
                    json = this.model.toJSON();
                    json.meta = this.model.meta;
                }
                if (this.collection) {
                    json = {list: this.collection.toJSON()};
                    json.meta = this.collection.meta;
                }
                return json;
            }
        });


        var MonthView = TemplateView.extend({
            template: 'month.hbs',
            events: {
                'click .next': 'nextDay',
                'click .prev': 'prevDay'
            },
            initialize: function() {
                TemplateView.prototype.initialize.call(this);
                this.collection.on('sync', this.render, this);
            },
            nextDay: function() {
                debugger;
            }
        });

        var Router = Backbone.Router.extend({

            routes: {
                '': 'month',
                ':date': 'month'
            },

            month: function (date) {
                var start, end;
                if (moment(date).isValid()) {
                    start = moment(date).date(0);
                    end = moment(date).add('days', 1);
                } else {
                    start = moment().date(0)
                    end = moment().add('month', 1);
                }
                var view = new MonthView({
                    collection: new EventCollection(),
                    el: $(".content")
                });
                view.render();
                view.collection.filters = {
                    'date__gt': start.format(),
                    'date__lt': end.format()
                };
                view.collection.fetch();
            }
        });

        var router = new Router();
        Backbone.history.start({pushState: true});
    });
})(jQuery);
