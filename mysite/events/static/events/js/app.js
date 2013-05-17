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
                if (!template){
                    console.error('Template not found', this.template);
                    return;
                }
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


        var NewsListView = TemplateView.extend({
            template: 'news_list.hbs',
            initialize: function() {
                TemplateView.prototype.initialize.call(this);
                this.collection.on('sync', this.render, this);
            }
        });

        var PagerView = TemplateView.extend({
            template: 'pager.hbs',
            events: {
                'click li.next a': 'next',
                'click li.previous a': 'prev'
            },
            initialize: function() {
                TemplateView.prototype.initialize.call(this);
                this.model.on('change', this.render, this);

                this.listView = new NewsListView({
                    collection: new EventCollection()
                });
            },
            onRender: function() {
                this.listView.setElement(this.$el.find('.news'));
                this.listView.collection.fetch({data: {
                    'date__gt': this.model.get('start'),
                    'date__lt': this.model.get('end')
                }});
            },
            next: function() {
                var end = this.model.get('end'),
                    start = this.model.get('start'),
                    range = moment.duration(moment(end) - moment(start)).asDays();

                this.model.set({
                    start: moment(start).add('days', range).format(),
                    end: moment(end).add('days', range).format()
                });
            },
            prev: function() {
                var end = this.model.get('end'),
                    start = this.model.get('start'),
                    range = moment.duration(moment(end) - moment(start)).asDays();

                this.model.set({
                    start: moment(start).subtract('days', range).format(),
                    end: moment(end).subtract('days', range).format()
                });
            },
            getContext: function() {
                var json = TemplateView.prototype.getContext.call(this);
                json.startDisplay = moment(json.start).format('LL');
                json.endDisplay = moment(json.end).format('LL');
                return json;
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
                    start = moment().date(0);
                    end = moment().add('month', 1);
                }

                var view = new PagerView({
                    model: new Backbone.Model({
                        start: start.format(),
                        end: end.format()
                    }),
                    el: $(".content")
                });
                view.render();
            }
        });

        var router = new Router();
        Backbone.history.start({pushState: true});
    });
})(jQuery);
